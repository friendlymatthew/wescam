import { Entity, Unique, Column, PrimaryGeneratedColumn } from 'typeorm';
export enum UserType {
  REGISTERED = 'REGISTERED',
  ROGUE = 'ROGUE',
}

// TODO: CONVERT TO NSQL
@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: UserType;

  @Column({ unique: true })
  email: string;

  @Column()
  pronoun: string;

  @Column()
  classYear: number;
}
