import { Injectable, NotFoundException } from "@nestjs/common";
import {
	ContentType,
	CrushType,
	CupidStatus,
	Prisma,
	PrismaClient,
	Room as PrismaRoom,
	RoomType,
} from "@prisma/client";
import { CreateRoomDto } from "../dto/create-room.dto";
import { RogueUsersService } from "src/core/julia/services/rogue-users.service";

export interface PicafeServiceInterface {
	/* 
    upon request,   
      validates crush 
      cupid logic
      opens room
      updates both users
      returns rooms 
  */

	createRoom(createRoomDto: CreateRoomDto): Promise<PrismaRoom>;

	getActiveRoomsById(userId: string): Promise<PrismaRoom[]>;

	getRogueRoomsById(userId: string): Promise<PrismaRoom[]>;

	getRoomById(roomId: string): Promise<PrismaRoom>;

	getRoomByIdWithMessages(roomId: string): Promise<PrismaRoom>;

	sendMessage(
		roomId: string,
		senderId: string,
		message: string
	): Promise<PrismaRoom>;

	deleteRoomById(roomId: string): Promise<void>;
}

@Injectable()
export class PicafeService implements PicafeServiceInterface {
	constructor(
		private readonly prisma: PrismaClient,
		private readonly rogueUsersService: RogueUsersService
	) {}

	async createRoom(createRoomDto: CreateRoomDto): Promise<PrismaRoom> {
		const { creatorId, crushId, creatorDisplayName, crushDisplayName } =
			createRoomDto;

		let newRoom: Prisma.RoomCreateInput;
		let createdRoom: PrismaRoom;

		const rogueResponse = await this.rogueUsersService.isRogueUser(crushId);

		if (rogueResponse.success) {
			newRoom = {
				creator: {
					connect: { id: creatorId }, // Use connect to associate by ID
				},
				crushId,
				crushType: CrushType.ROGUE,
				creatorDisplayName,
				crushDisplayName,
				type: RoomType.ROGUE,
				cupidStatus: CupidStatus.GUESS,
			};

			createdRoom = await this.prisma.room.create({
				data: newRoom,
			});
		} else {
			// we need to see if a room with both participants already exist
			const existingRoom = await this.prisma.room.findFirst({
				where: {
					creatorId: crushId,
					crushId: creatorId,
				},
			});

			if (existingRoom) {
				createdRoom = await this.prisma.room.update({
					where: { id: existingRoom.id },
					data: {
						cupidStatus: CupidStatus.MATCH,
						creatorDisplayName: creatorDisplayName,
						crushDisplayName: crushDisplayName,
					},
				});
			} else {
				newRoom = {
					creator: {
						connect: { id: creatorId },
					},
					crushId,
					crushType: CrushType.ACTIVE,
					creatorDisplayName,
					crushDisplayName,
					type: RoomType.ACTIVE,
					cupidStatus: CupidStatus.GUESS,
				};

				createdRoom = await this.prisma.room.create({
					data: newRoom,
				});
			}
		}

		return createdRoom;
	}

	async getActiveRoomsById(userId: string): Promise<PrismaRoom[]> {
		return await this.prisma.room.findMany({
			where: {
				creatorId: userId,
				type: RoomType.ACTIVE,
			},
		});
	}

	async getRogueRoomsById(userId: string): Promise<PrismaRoom[]> {
		return await this.prisma.room.findMany({
			where: {
				creatorId: userId,
				type: RoomType.ROGUE,
			},
		});
	}

	async getRoomById(roomId: string): Promise<PrismaRoom> {
		const room = await this.prisma.room.findUnique({
			where: {
				id: roomId,
			},
		});

		if (!room) {
			throw new NotFoundException(`Room with id ${roomId} not found`);
		}
		return room;
	}

	async getRoomByIdWithMessages(roomId: string): Promise<PrismaRoom> {
		const room = await this.prisma.room.findUnique({
			where: {
				id: roomId,
			},
			include: {
				messages: true,
			},
		});

		if (!room) {
			throw new NotFoundException(`Room with id ${roomId} not found`);
		}

		return room;
	}

	async deleteRoomById(roomId: string): Promise<void> {
		await this.prisma.room.delete({
			where: {
				id: roomId,
			},
		});
	}

	async sendMessage(
		roomId: string,
		senderId: string,
		message: string
	): Promise<PrismaRoom> {
		await this.prisma.message.create({
			data: {
				roomId,
				senderId,
				content: message,
				contentType: ContentType.TEXT, // You can update this based on your requirements
			},
		});

		return this.getRoomByIdWithMessages(roomId);
	}
}
