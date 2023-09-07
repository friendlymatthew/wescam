import { JuliaService } from "./julia.service";
import { CreateRoomInput } from "../dto/create-room.input";
import { RoomEntityType } from "../entities/room.entity";
export declare class HolidayInnService {
    private readonly juliaService;
    constructor(juliaService: JuliaService);
    createOrUpdateRoom(input: CreateRoomInput): Promise<RoomEntityType>;
    getRoomsByUserId(id: string): Promise<RoomEntityType[]>;
    private convertToRoomEntityType;
}
