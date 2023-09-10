import { User as PrismaUser, RogueUser as PrismaRogueUser } from "@prisma/client";
import { EntityService } from "../service/entity.service";
import { UserType } from "../entities/user.entity";
import { CreateUserInput } from "../dto/create-user.input";
import { CreateRogueUserInput } from "../dto/create-rogueuser.input";
export declare class EntityResolver {
    private readonly entityService;
    constructor(entityService: EntityService);
    createUserMutation(createUserInput: CreateUserInput): Promise<PrismaUser>;
    createRogueUserMutation(createRogueUserInput: CreateRogueUserInput): Promise<PrismaRogueUser>;
    getUserConfig(id: string): Promise<UserType>;
}
