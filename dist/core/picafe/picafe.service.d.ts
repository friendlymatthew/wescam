import { CreatePicafeDto } from './dto/create-picafe.dto';
import { UpdatePicafeDto } from './dto/update-picafe.dto';
export declare class PicafeService {
    create(createPicafeDto: CreatePicafeDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePicafeDto: UpdatePicafeDto): string;
    remove(id: number): string;
}
