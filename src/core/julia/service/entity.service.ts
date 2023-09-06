import { Injectable } from "@nestjs/common";
import { JuliaService } from "./julia.service";
import { CreateUserInput } from "../dto/create-user.input";
import {
	User as PrismaUser,
	RogueUser as PrismaRogueUser,
} from "@prisma/client";
import { CreateRogueUserInput } from "../dto/create-rogueuser.input";

@Injectable()
export class EntityService {
	constructor(private readonly juliaService: JuliaService) {}

	async createUser(input: CreateUserInput): Promise<PrismaUser> {
		return this.juliaService.createUser(input);
	}

	async createRogueUser(input: CreateRogueUserInput): Promise<PrismaRogueUser> {
		return this.juliaService.createRogueUser(input);
	}
}
