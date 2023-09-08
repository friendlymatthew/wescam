import { InputType, Field, Int } from "@nestjs/graphql";
import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateUserInput {
	@Field(() => String, { description: "Name of the user" })
	@IsString()
	@IsNotEmpty()
	name: string;

	@Field(() => String, { description: "Email of user" })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Field(() => String, { description: "Pronouns of user" })
	@IsString()
	@IsNotEmpty()
	pronouns: string;

	@Field(() => Int, { description: "Class year of user" })
	@IsInt()
	@IsNotEmpty()
	classYear: number;
}
