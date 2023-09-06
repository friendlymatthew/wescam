import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { HolidayInnService } from "../service/holidayinn.service";
import { PrismaClient, Room as PrismaRoom, RoomType } from "@prisma/client";
import { CreateRoomInput } from "../dto/create-room.input";
import { RoomEntityType } from "../entities/room.entity";

@Resolver(() => RoomEntityType)
export class HolidayInnResolver {
	constructor(private readonly holidayInnService: HolidayInnService) {}

	@Mutation(() => RoomEntityType)
	async createOrUpdateRoom(
		@Args("createRoomInput") createRoomInput: CreateRoomInput
	): Promise<RoomEntityType> {
		const room =
			await this.holidayInnService.createOrUpdateRoom(createRoomInput);

		return room;
	}

	@Query(() => [RoomEntityType])
	async getRoomById(@Args("id") id: string): Promise<RoomEntityType[]> {
		return await this.holidayInnService.getRoomsByUserId(id);
	}
}
