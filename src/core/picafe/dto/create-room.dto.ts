import { CupidStatus, Message, RoomType } from "@prisma/client";
import { BaseRoomDto } from "./base-room.dto";

export class CreateRoomDto extends BaseRoomDto {
	creatorId: string;
	crushId: string;
	creatorDisplayName: string;
	crushDisplayName: string;
	type: RoomType;
	cupidStatus: CupidStatus;
}
