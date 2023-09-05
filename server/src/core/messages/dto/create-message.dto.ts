export class CreateMessageDto {
  id: string;
  senderId: string;
  roomId: string;
  messageType: string;
  content: string;
  timestamp: Date;
}
