import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class CreateRogueUserInput {
	@Field(() => String, { description: "Email of RogueUser" })
	@IsEmail()
	@IsNotEmpty()
	email: string;
}
