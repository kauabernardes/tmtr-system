
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false, length: 32, comment: 'The username for the user' })
  username: string;

  @Column({ nullable: false, comment: 'The hashed password for the user' })
  passwordHash: string;
}