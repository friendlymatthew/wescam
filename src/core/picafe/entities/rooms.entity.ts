import { CupidStatus, Message, RoomType } from "@prisma/client";

export class Rooms {
	id: string;
	creatorId: string;
	crushId: string;
	creatorDisplayName: String;
	crushDisplayName: String;
	messages: Message[];
	type: RoomType;
	cupidStatus: CupidStatus;
	createdAt: Date;
	updatedAt: Date;
}
