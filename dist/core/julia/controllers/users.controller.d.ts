import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AbstractUsers } from '../interfaces/abstract-users.interface';
import { User as PrismaUser } from '@prisma/client';
export interface UsersControllerInterface extends AbstractUsers {
    createUser(createUserDto: CreateUserDto): Promise<any>;
    getAllUsers(): Promise<PrismaUser[]>;
    getUser(id: string): Promise<PrismaUser>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<PrismaUser>;
    deleteUser(id: string): Promise<void>;
}
export declare class UsersController implements UsersControllerInterface {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<import("../../wrappers/response-wrapper.model").ResponseWrapper<{
        id: string;
        name: string;
        email: string;
        pronoun: string;
        classYear: number;
    }>>;
    getAllUsers(): Promise<{
        id: string;
        name: string;
        email: string;
        pronoun: string;
        classYear: number;
    }[]>;
    getUser(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        pronoun: string;
        classYear: number;
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        pronoun: string;
        classYear: number;
    }>;
    deleteUser(id: string): Promise<void>;
}
