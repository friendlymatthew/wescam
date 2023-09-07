import { Message } from "../entities/message.entities";
import { Producer } from "pulsar-client";
export interface PicafeServiceInterface {
    createMessage(message: Message): Promise<void>;
}
export declare class PicafeService implements PicafeServiceInterface {
    private readonly miguelProducer;
    private readonly logger;
    constructor(miguelProducer: Producer);
    createMessage(message: Message): Promise<void>;
    private sendMessageToProducer;
    private handleMessageFailure;
}
