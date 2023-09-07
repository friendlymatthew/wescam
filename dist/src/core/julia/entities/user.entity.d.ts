import { RoomEntityType } from "./room.entity";
export declare class UserType {
    id: string;
    name: string;
    email: string;
    pronouns: string;
    classYear: number;
    createdRooms?: RoomEntityType[];
}
