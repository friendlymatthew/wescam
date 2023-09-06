import { Injectable } from "@nestjs/common";
import { JuliaService } from "./julia.service";
import { CreateRoomInput } from "../dto/create-room.input";
import { PrismaClient, Room as PrismaRoom } from "@prisma/client";
import { RoomEntityType } from "../entities/room.entity";

@Injectable()
export class HolidayInnService {
	constructor(private readonly juliaService: JuliaService) {}

	async createOrUpdateRoom(input: CreateRoomInput): Promise<RoomEntityType> {
		const prismaRoom = await this.juliaService.createOrUpdateRoom(input);
		return this.convertToRoomEntityType(prismaRoom);
	}

	async getRoomsByUserId(id: string): Promise<RoomEntityType[]> {
		const prismaRooms = await this.juliaService.getRoomsByUserId(id);
		return prismaRooms.map(this.convertToRoomEntityType);
	}

	private convertToRoomEntityType(prismaRoom: PrismaRoom): RoomEntityType {
		return {
			id: prismaRoom.id,
			creatorId: prismaRoom.creatorId,
			crushId: prismaRoom.crushId,
			creatorDisplayName: prismaRoom.creatorDisplayName,
			crushDisplayName: prismaRoom.crushDisplayName,
			roomType: prismaRoom.roomType,
			matchStatus: prismaRoom.matchStatus,
			createdAt: prismaRoom.createdAt.toISOString(),
			updatedAt: prismaRoom.updatedAt.toISOString(),
		};
	}
}
