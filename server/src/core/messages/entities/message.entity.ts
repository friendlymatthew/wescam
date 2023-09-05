import { Entity, Unique, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum MessageType {
  GIF = 'gif', // TODO: giphy api integration
  TEXT = 'text',
  AUDIO = 'audio', // this is gonna be a bit more work -- gonna have to spin up crud audio service
}

@Entity()
@Unique(['id'])
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  senderId: string;

  @Column('uuid')
  roomId: string;

  @Column()
  messageType: MessageType;

  @Column()
  content: string;

  @Column('datetime')
  timestamp: Date;
}
