import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	getMostValuableFriendship(): string {
		return "Friendship :)";
	}
}
