import { GuessStatus, Message } from '@prisma/client';
export declare class CreateRoomDto {
    creatorId: string;
    crushId: string;
    creatorNickname: string;
    crushNickname: string;
    guessStatus: GuessStatus;
    messages: Message[];
}
