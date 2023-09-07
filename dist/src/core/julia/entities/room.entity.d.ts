import { MatchStatus, RoomType } from "@prisma/client";
export declare class RoomEntityType {
    id: string;
    creatorId: string;
    crushId: string;
    creatorDisplayName: string;
    crushDisplayName: string;
    roomType: RoomType;
    matchStatus: MatchStatus;
    createdAt: String;
    updatedAt: String;
}
