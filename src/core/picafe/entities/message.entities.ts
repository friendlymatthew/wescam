import { types } from "cassandra-driver";

export class Message {
	message_id: types.TimeUuid;
	room_id: types.Uuid;
	sender_id: types.Uuid;
	content: string;
	timestamp: Date;
	medialink: string;
}
