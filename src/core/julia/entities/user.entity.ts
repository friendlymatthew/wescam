import { Field, ObjectType } from "@nestjs/graphql";
import { RoomEntityType } from "./room.entity";

@ObjectType()
export class UserType {
	@Field(() => String)
	id: string;

	@Field(() => String)
	name: string;

	@Field(() => String)
	email: string;

	@Field(() => String)
	pronouns: string;

	@Field(() => Number)
	classYear: number;

	@Field(() => [RoomEntityType], { nullable: "itemsAndList" })
	createdRooms?: RoomEntityType[];
}
