import { PicafeService } from "../service/picafe.service";
import { Message } from "../entities/message.entities";
import { Socket } from "socket.io";
export declare class PicafeGateway {
    private readonly picafeService;
    constructor(picafeService: PicafeService);
    createMessage(message: Message, socket: Socket): Promise<void>;
    getMessagesByRoom(roomIdString: string): Promise<Message[]>;
}
