import { CupidStatus, Message, RoomType } from "@prisma/client";
import { BaseOptionalRoomDto, BaseRoomDto } from "./base-room.dto";

export class UpdateRoomDto extends BaseOptionalRoomDto {
	// Fields that might be optional when updating a room
	creatorId?: string;
	crushId?: string;
	creatorDisplayName?: string;
	crushDisplayName?: string;
	type?: RoomType;
	cupidStatus?: CupidStatus;
	// For messages, if they can be updated
	messages?: Message[];
}
