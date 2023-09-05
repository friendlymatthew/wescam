import { PrismaService } from 'src/database/prisma/prisma.service';
import { RogueUser as PrismaRogueUser } from '@prisma/client';
import { ResponseWrapper } from '../../wrappers/response-wrapper.model';
import { CreateRogueUserDto } from '../dto/create-rogue-user.dto';
import { AbstractRogueUsers } from '../interfaces/abstract-rogue-users.interface';
export interface RogueUsersInterface extends AbstractRogueUsers {
    createRogueUser(createRogueUserDto: CreateRogueUserDto): Promise<PrismaRogueUser>;
    isRogueUser(email: string): Promise<ResponseWrapper<string | null>>;
    removeRogueUser(email: string): Promise<void>;
}
export declare class RogueUsersService implements RogueUsersInterface {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createRogueUser(createRogueUserDto: CreateRogueUserDto): Promise<PrismaRogueUser>;
    isRogueUser(email: string): Promise<ResponseWrapper<string>>;
    removeRogueUser(email: string): Promise<void>;
}
