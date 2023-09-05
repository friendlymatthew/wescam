import { PicafeService } from './picafe.service';
import { CreatePicafeDto } from './dto/create-picafe.dto';
import { UpdatePicafeDto } from './dto/update-picafe.dto';
import { Socket } from 'socket.io';
export declare class PicafeGateway {
    private readonly picafeService;
    constructor(picafeService: PicafeService);
    private clients;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    create(createPicafeDto: CreatePicafeDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(updatePicafeDto: UpdatePicafeDto): string;
    remove(id: number): string;
}
