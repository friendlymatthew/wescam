import { JuliaService } from "./julia.service";
import { CreateUserInput } from "../dto/create-user.input";
import { User as PrismaUser, RogueUser as PrismaRogueUser } from "@prisma/client";
import { CreateRogueUserInput } from "../dto/create-rogueuser.input";
export declare class EntityService {
    private readonly juliaService;
    constructor(juliaService: JuliaService);
    createUser(input: CreateUserInput): Promise<PrismaUser>;
    createRogueUser(input: CreateRogueUserInput): Promise<PrismaRogueUser>;
    getUserConfig(input: string): Promise<PrismaUser | null>;
}
