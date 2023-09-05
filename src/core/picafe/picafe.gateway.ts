import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { PicafeService } from './picafe.service';
import { CreatePicafeDto } from './dto/create-picafe.dto';
import { UpdatePicafeDto } from './dto/update-picafe.dto';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class PicafeGateway {
  constructor(private readonly picafeService: PicafeService) {}

  private clients: Map<string, Socket> = new Map();

  handleConnection(client: Socket, ...args: any[]) {
    this.clients.set(client.id, client);
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
  }

  @SubscribeMessage('createPicafe')
  create(@MessageBody() createPicafeDto: CreatePicafeDto) {
    return this.picafeService.create(createPicafeDto);
  }

  @SubscribeMessage('findAllPicafe')
  findAll() {
    return this.picafeService.findAll();
  }

  @SubscribeMessage('findOnePicafe')
  findOne(@MessageBody() id: number) {
    return this.picafeService.findOne(id);
  }

  @SubscribeMessage('updatePicafe')
  update(@MessageBody() updatePicafeDto: UpdatePicafeDto) {
    return this.picafeService.update(updatePicafeDto.id, updatePicafeDto);
  }

  @SubscribeMessage('removePicafe')
  remove(@MessageBody() id: number) {
    return this.picafeService.remove(id);
  }
}
