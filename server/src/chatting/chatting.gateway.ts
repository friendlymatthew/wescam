import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ChattingService } from './chatting.service';
import { CreateChattingDto } from './dto/create-chatting.dto';
import { UpdateChattingDto } from './dto/update-chatting.dto';

@WebSocketGateway()
export class ChattingGateway {
  constructor(private readonly chattingService: ChattingService) {}

  @SubscribeMessage('createChatting')
  create(@MessageBody() createChattingDto: CreateChattingDto) {
    return this.chattingService.create(createChattingDto);
  }

  @SubscribeMessage('findAllChatting')
  findAll() {
    return this.chattingService.findAll();
  }

  @SubscribeMessage('findOneChatting')
  findOne(@MessageBody() id: number) {
    return this.chattingService.findOne(id);
  }

  @SubscribeMessage('updateChatting')
  update(@MessageBody() updateChattingDto: UpdateChattingDto) {
    return this.chattingService.update(updateChattingDto.id, updateChattingDto);
  }

  @SubscribeMessage('removeChatting')
  remove(@MessageBody() id: number) {
    return this.chattingService.remove(id);
  }
}
