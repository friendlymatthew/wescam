import { InputType, Field } from "@nestjs/graphql";
import { MatchStatus, RoomType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateRoomInput {
	@Field(() => String, { description: "creator id" })
	@IsString()
	@IsNotEmpty()
	creatorId: string;

	@Field(() => String, { description: "crush id" })
	@IsString()
	@IsNotEmpty()
	crushId: string;

	@Field(() => String, { description: "creator display name" })
	@IsString()
	@IsNotEmpty()
	creatorDisplayName: string;

	@Field(() => String, { description: "crush display name" })
	@IsString()
	@IsNotEmpty()
	crushDisplayName: string;
	
}
