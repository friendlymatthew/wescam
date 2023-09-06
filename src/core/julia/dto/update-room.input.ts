import { Field, InputType } from "@nestjs/graphql";
import { MatchStatus, RoomType } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateRoomInput {
	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	creatorId?: string;

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	crushId?: string;

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	creatorDisplayName?: string;

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	crushDisplayName?: string;
}
