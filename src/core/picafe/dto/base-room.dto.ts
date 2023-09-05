import { CupidStatus, Message, RoomType } from "@prisma/client";

export class BaseRoomDto {
	creatorId: string;
	crushId: string;
	creatorDisplayName: string;
	crushDisplayName: string;
	type: RoomType;
	cupidStatus: CupidStatus;
}

export class BaseOptionalRoomDto {
	creatorId?: string;
	crushId?: string;
	creatorDisplayName?: string;
	crushDisplayName?: string;
	type?: RoomType;
	cupidStatus?: CupidStatus;
	messages?: Message[];
}
