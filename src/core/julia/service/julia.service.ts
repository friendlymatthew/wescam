import { Injectable, NotFoundException } from "@nestjs/common";
import {
	Prisma,
	RogueUser as PrismaRogueUser,
	User as PrismaUser,
	Room as PrismaRoom,
	RoomType,
	MatchStatus,
} from "@prisma/client";
import { PrismaService } from "src/database/prisma/prisma.service";
import { EntityType } from "./types/julia-service.types";
import { CreateUserInput } from "../dto/create-user.input";
import { UpdateUserInput } from "../dto/update-user.input";
import { CreateRogueUserInput } from "../dto/create-rogueuser.input";
import { link } from "fs";
import { CreateRoomInput } from "../dto/create-room.input";

type ModelName = "user" | "rogueUser" | "room";

type CheckResponse = {
	isEntity: boolean;
	id?: string;
};

export interface JuliaServiceInterface {
	createUser(input: CreateUserInput): Promise<PrismaUser>;
	createRogueUser(input: CreateRogueUserInput): Promise<PrismaRogueUser>;
	createOrUpdateRoom(input: CreateRoomInput): Promise<PrismaRoom>;
	getRoomsByUserId(userId: string): Promise<PrismaRoom[]>;
}

@Injectable()
export class JuliaService implements JuliaServiceInterface {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(input: CreateUserInput): Promise<PrismaUser> {
		const { name, email, pronouns, classYear } = input;

		// check if rogueUser
		const rogueCheckRes = await this.isRogueUser(email);

		const userData = {
			id: rogueCheckRes.id,
			name,
			email,
			pronouns,
			classYear,
		};

		const user = await this.prisma.user.create({
			data: userData,
		});

		if (rogueCheckRes.isEntity && rogueCheckRes.id) {
			await this.deleteRogueUser(rogueCheckRes.id);
		}

		return user;
	}

	async createRogueUser(input: CreateRogueUserInput): Promise<PrismaRogueUser> {
		const { email } = input;

		const rogueUser = await this.prisma.rogueUser.create({
			data: {
				email,
			},
		});

		return rogueUser;
	}

	async createOrUpdateRoom(input: CreateRoomInput): Promise<PrismaRoom> {
		const { creatorId, crushId, creatorDisplayName, crushDisplayName } = input;

		const userCrushCheckRes = await this.isUser(crushId);
		if (userCrushCheckRes.isEntity && userCrushCheckRes.id) {
			// check if user has a room with the crush
			const existingRoom = await this.findExistingRoom(creatorId, crushId);
			if (existingRoom) {
				return this.prisma.room.update({
					where: { id: existingRoom.id },
					data: { matchStatus: MatchStatus.MATCH },
				});
			}

			// we create new live room
			return this.prisma.room.create({
				data: {
					creatorId,
					crushId,
					creatorDisplayName,
					crushDisplayName,
					roomType: RoomType.LIVE,
					matchStatus: MatchStatus.GUESS,
				},
			});
		} else {
			// if user is rogue
			const rogueCrushCheckRes = await this.isRogueUser(crushId);
			if (rogueCrushCheckRes.isEntity) {
				return this.prisma.room.create({
					data: {
						creatorId,
						crushId,
						creatorDisplayName,
						crushDisplayName,
						roomType: RoomType.DORMANT,
						matchStatus: MatchStatus.GUESS,
					},
				});
			}

			// we need to create rogue user
			const rogueUser = await this.createRogueUser({
				email: crushId,
			});

			return this.prisma.room.create({
				data: {
					creatorId,
					crushId: rogueUser.id,
					creatorDisplayName,
					crushDisplayName,
					roomType: RoomType.DORMANT,
					matchStatus: MatchStatus.GUESS,
				},
			});
		}
	}

	async getUserConfig(input: string): Promise<PrismaUser | null> {
		return this.prisma.user.findFirst({
			where: {
				id: input,
			},
		});
	}
	async getRoomsByUserId(userId: string): Promise<PrismaRoom[]> {
		return this.prisma.room.findMany({
			where: {
				AND: [
					{
						OR: [
							{
								creatorId: userId,
							},
							{
								crushId: userId,
							},
						],
					},
					{
						roomType: RoomType.LIVE,
					},
				],
			},
		});
	}

	private async findExistingRoom(
		creatorId: string,
		crushId: string
	): Promise<PrismaRoom | null> {
		return this.prisma.room.findFirst({
			where: {
				creatorId: {
					in: [creatorId, crushId],
				},
				crushId: {
					in: [creatorId, crushId],
				},
				roomType: RoomType.LIVE,
			},
		});
	}

	private async deleteRogueUser(rogueId: string): Promise<void> {
		await this.prisma.rogueUser.delete({
			where: {
				id: rogueId,
			},
		});
	}

	// identity functions
	private async isUser(id: string): Promise<CheckResponse> {
		const user = await this.prisma.user.findUnique({
			where: {
				id,
			},
		});

		return {
			isEntity: !!user,
			id: user?.id,
		};
	}

	private async isRogueUser(email: string): Promise<CheckResponse> {
		const rogueUser = await this.prisma.rogueUser.findUnique({
			where: {
				email,
			},
		});

		return {
			isEntity: !!rogueUser,
			id: rogueUser?.id,
		};
	}
}
