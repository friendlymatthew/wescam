import { Entity, Unique, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNumber, IsString } from 'class-validator';
export enum UserType {
  REGISTERED = 'REGISTERED',
  ROGUE = 'ROGUE',
}

// TODO: CONVERT TO NSQL
@Entity()
@Unique(['email'])
export class User {
  @IsString()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Column()
  name: string;

  @Column()
  type: UserType;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsString()
  @Column()
  pronoun: string;

  @IsNumber()
  @Column()
  classYear: number;
}
