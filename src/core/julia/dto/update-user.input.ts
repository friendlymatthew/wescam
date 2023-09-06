// update-user.input.ts
import { InputType, Int, Field } from "@nestjs/graphql";
import { IsString, IsEmail, IsInt, IsOptional } from "class-validator";

@InputType()
export class UpdateUserInput {
	@Field(() => String, { description: "The name of the user", nullable: true })
	@IsString()
	@IsOptional()
	name?: string;

	@Field(() => String, {
		description: "The email address of the user",
		nullable: true,
	})
	@IsEmail()
	@IsOptional()
	email?: string;

	@Field(() => String, {
		description: "The pronoun of the user",
		nullable: true,
	})
	@IsString()
	@IsOptional()
	pronoun?: string;

	@Field(() => Int, {
		description: "The class year of the user",
		nullable: true,
	})
	@IsInt()
	@IsOptional()
	classYear?: number;
}
