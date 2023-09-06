import { Resolver, Query } from "@nestjs/graphql";

@Resolver(() => "App")
export class AppResolver {
	@Query(() => String)
	getMostValuableFriendship(): string {
		return "Friendship :)";
	}
}
