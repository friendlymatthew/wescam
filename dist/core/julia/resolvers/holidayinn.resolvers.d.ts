import { HolidayInnService } from "../service/holidayinn.service";
import { CreateRoomInput } from "../dto/create-room.input";
import { RoomEntityType } from "../entities/room.entity";
export declare class HolidayInnResolver {
    private readonly holidayInnService;
    constructor(holidayInnService: HolidayInnService);
    createOrUpdateRoom(createRoomInput: CreateRoomInput): Promise<RoomEntityType>;
    getRoomById(id: string): Promise<RoomEntityType[]>;
}
