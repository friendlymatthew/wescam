import { atom } from "recoil";

interface Room {
  id: string;
  creator: string;
  dateCreated: string;
}

export const roomSelectedListState = atom<Room[]>({
  key: "roomSelectedListState",
  default: [],
});
