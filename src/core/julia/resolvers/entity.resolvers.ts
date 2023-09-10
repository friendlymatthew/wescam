import { Args, Mutation, Resolver } from "@nestjs/graphql";
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
import { Query } from "@nestjs/graphql";

@Resolver(() => UserType)
export class EntityResolver {
	constructor(private readonly entityService: EntityService) {}

	@Mutation(() => UserType)
	async createUserMutation(
		@Args("createUserInput") createUserInput: CreateUserInput
	): Promise<PrismaUser> {
		try {
			const user = await this.entityService.createUser(createUserInput);
			return user;
		} catch (error) {
			console.log(error);
			throw new Error("Failed to create user");
		}
	}

	@Mutation(() => RogueUserType)
	async createRogueUserMutation(
		@Args("createRogueUserInput") createRogueUserInput: CreateRogueUserInput
	): Promise<PrismaRogueUser> {
		const rogueUser =
			await this.entityService.createRogueUser(createRogueUserInput);
		return rogueUser;
	}

	@Query(() => UserType, { nullable: true })
	async getUserConfig(
		@Args("id", { type: () => String }) id: string
	): Promise<UserType> {
		try {
			const user = await this.entityService.getUserConfig(id);
			if (user) {
				return user;
			} else {
				throw new Error("Failed to get user");
			}
		} catch (error) {
			console.log(error);
			throw new Error("Failed to get user");
		}
	}
}
