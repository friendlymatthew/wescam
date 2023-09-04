import { atomFamily } from "recoil";

const selectedRoomFamilyState = atomFamily<boolean, string>({
  key: "selectedRoomStateFamily",
  default: false,
});
