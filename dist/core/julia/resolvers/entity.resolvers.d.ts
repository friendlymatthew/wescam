import { User as PrismaUser, RogueUser as PrismaRogueUser } from "@prisma/client";
import { EntityService } from "../service/entity.service";
import { CreateUserInput } from "../dto/create-user.input";
import { CreateRogueUserInput } from "../dto/create-rogueuser.input";
export declare class EntityResolver {
    private readonly entityService;
    constructor(entityService: EntityService);
    createUser(createUserInput: CreateUserInput): Promise<PrismaUser>;
    createRogueUser(createRogueUserInput: CreateRogueUserInput): Promise<PrismaRogueUser>;
}
