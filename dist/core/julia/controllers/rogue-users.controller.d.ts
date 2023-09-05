import { CreateRogueUserDto } from '../dto/create-rogue-user.dto';
import { RogueUsersService } from '../rogue-users/rogue-users.service';
import { AbstractRogueUsers } from '../interfaces/abstract-rogue-users.interface';
export interface RogueUsersControllerInterface extends AbstractRogueUsers {
    createRogueUser(createRogueUserDto: CreateRogueUserDto): Promise<any>;
    isRogueUser(email: string): Promise<any>;
    removeRogueUser(email: string): Promise<any>;
}
export declare class RogueUsersController implements RogueUsersControllerInterface {
    private readonly rogueUsersService;
    constructor(rogueUsersService: RogueUsersService);
    createRogueUser(createRogueUserDto: CreateRogueUserDto): Promise<{
        id: string;
        email: string;
    }>;
    isRogueUser(email: string): Promise<import("../../wrappers/response-wrapper.model").ResponseWrapper<string>>;
    removeRogueUser(email: string): Promise<void>;
}
