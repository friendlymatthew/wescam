import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RogueUserType {
	@Field(() => String)
	id: string;

	@Field(() => String)
	email: string;
}
