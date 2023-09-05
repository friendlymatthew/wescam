import { PrismaService } from 'src/database/prisma/prisma.service';
import { User as PrismaUser } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ResponseWrapper } from 'src/core/wrappers/response-wrapper.model';
import { RogueUsersService } from '../rogue-users/rogue-users.service';
import { AbstractUsers } from '../interfaces/abstract-users.interface';
export interface UsersServiceInterface extends AbstractUsers {
    createUser(createUserDto: CreateUserDto): Promise<ResponseWrapper<PrismaUser>>;
    getAllUsers(): Promise<PrismaUser[]>;
    getUser(id: string): Promise<PrismaUser>;
    deleteUser(id: string): Promise<void>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<PrismaUser>;
}
export declare class UsersService implements UsersServiceInterface {
    private readonly prisma;
    private readonly rogueUsersService;
    constructor(prisma: PrismaService, rogueUsersService: RogueUsersService);
    createUser(createUserDto: CreateUserDto): Promise<ResponseWrapper<PrismaUser>>;
    getUser(id: string): Promise<PrismaUser>;
    getAllUsers(): Promise<PrismaUser[]>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<PrismaUser>;
    deleteUser(id: string): Promise<void>;
}
