import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterResponse } from './interface/register-response.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async register(username: string, password: string, securityCode: string) : Promise<RegisterResponse> {

        const code = "OP39LS";

        if (securityCode !== code) {
            throw new UnauthorizedException('Invalid security code');
        }

        const exist = await this.userRepository.findOne({ where: { username } });

        if (exist) {
            throw new UnauthorizedException('Username already exists');
        }

        const rounds = 10;
        const hash = await bcrypt.hash(password, rounds);
        const user = this.userRepository.create({ username, passwordHash: hash });
        const savedUser = await this.userRepository.save(user);

        return { userId: savedUser.id, username: savedUser.username };
    }

    async login(username: string, password: string) {
        const user = await this.userRepository.findOne({ where: { username } });

        const dummy = "$2b$10$CwTycUXWue0Thq9StjUM0uJ8Yc5Pqz9Z1sHnJfQeR4r/2uJtO"; // bcrypt hash for "password"

        const isPasswordValid = await bcrypt.compare(password, user ? user.passwordHash : dummy);

        if (!isPasswordValid || !user) {
            throw new UnauthorizedException('Invalid username or password');
        }

        const token = this.jwtService.sign({ userId: user.id, username: user.username });

        return { token };

    }

}
