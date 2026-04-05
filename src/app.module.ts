import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TournamentService } from './tournament/tournament.service';
import { TournamentController } from './tournament/tournament.controller';
import { TournamentGateway } from './tournament/tournament.gateway';
import { TournamentModule } from './tournament/tournament.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "tournament.sqlite",
      entities: [User],
      synchronize: true
    }),
    TournamentModule,
    AuthModule
    
    
  ],
  controllers: [AppController],
  providers: [AppService],


})
export class AppModule {}
