import { CupidService } from './cupid.service';
import { CreateCupidDto } from './dto/create-cupid.dto';
import { UpdateCupidDto } from './dto/update-cupid.dto';
export declare class CupidController {
    private readonly cupidService;
    constructor(cupidService: CupidService);
    create(createCupidDto: CreateCupidDto): any;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCupidDto: UpdateCupidDto): string;
    remove(id: string): string;
}
