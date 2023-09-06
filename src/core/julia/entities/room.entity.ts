import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { MatchStatus, RoomType } from "@prisma/client";

@ObjectType()
export class RoomEntityType {
	@Field(() => String)
	id: string;

	@Field(() => String)
	creatorId: string;

	@Field(() => String)
	crushId: string;

	@Field(() => String)
	creatorDisplayName: string;

	@Field(() => String)
	crushDisplayName: string;

	@Field(() => RoomType)
	roomType: RoomType;

	@Field(() => MatchStatus)
	matchStatus: MatchStatus;

	@Field(() => String)
	createdAt: String;

	@Field(() => String)
	updatedAt: String;
}
