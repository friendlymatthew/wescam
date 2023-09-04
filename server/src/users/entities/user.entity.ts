import { Entity, Unique, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  pronoun: string;

  @Column()
  classYear: number;
}
