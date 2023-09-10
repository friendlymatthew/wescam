import { RogueUser as PrismaRogueUser, User as PrismaUser, Room as PrismaRoom } from "@prisma/client";
import { PrismaService } from "src/database/prisma/prisma.service";
import { CreateUserInput } from "../dto/create-user.input";
import { CreateRogueUserInput } from "../dto/create-rogueuser.input";
import { CreateRoomInput } from "../dto/create-room.input";
export interface JuliaServiceInterface {
    createUser(input: CreateUserInput): Promise<PrismaUser>;
    createRogueUser(input: CreateRogueUserInput): Promise<PrismaRogueUser>;
    createOrUpdateRoom(input: CreateRoomInput): Promise<PrismaRoom>;
    getRoomsByUserId(userId: string): Promise<PrismaRoom[]>;
}
export declare class JuliaService implements JuliaServiceInterface {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser(input: CreateUserInput): Promise<PrismaUser>;
    createRogueUser(input: CreateRogueUserInput): Promise<PrismaRogueUser>;
    createOrUpdateRoom(input: CreateRoomInput): Promise<PrismaRoom>;
    getUserConfig(input: string): Promise<PrismaUser | null>;
    getRoomsByUserId(userId: string): Promise<PrismaRoom[]>;
    private findExistingRoom;
    private deleteRogueUser;
    private isUser;
    private isRogueUser;
}
