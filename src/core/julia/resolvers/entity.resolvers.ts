import { Args, Mutation } from "@nestjs/graphql";
import { HolidayInnService } from "../service/holidayinn.service";
import {
	PrismaClient,
	User as PrismaUser,
	RogueUser as PrismaRogueUser,
	RoomType,
} from "@prisma/client";
import { EntityService } from "../service/entity.service";
import { UserType } from "../entities/user.entity";
import { CreateUserInput } from "../dto/create-user.input";
import { RogueUserType } from "../entities/rogue-user.entity";
import { CreateRogueUserInput } from "../dto/create-rogueuser.input";

export class EntityResolver {
	constructor(private readonly entityService: EntityService) {}

	@Mutation(() => UserType)
	async createUser(
		@Args("createUserInput") createUserInput: CreateUserInput
	): Promise<PrismaUser> {
		const user = await this.entityService.createUser(createUserInput);

		return user;
	}

	@Mutation(() => RogueUserType)
	async createRogueUser(
		@Args("createRogueUserInput") createRogueUserInput: CreateRogueUserInput
	): Promise<PrismaRogueUser> {
		const rogueUser =
			await this.entityService.createRogueUser(createRogueUserInput);
		return rogueUser;
	}
}
