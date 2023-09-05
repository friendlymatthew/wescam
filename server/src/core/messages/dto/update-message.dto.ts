import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  id?: string;
  senderId?: string;
  roomId?: string;
  messageType?: string;
  content?: string;
  timestamp?: Date;
}
