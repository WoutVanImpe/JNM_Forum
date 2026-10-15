import { UserEntity } from "./user.types";

export interface MessageEntity {
	id: number;
	channel_id: number;
	user_id: number;
	content: string;
	quoted_message_id: number | null;
	parent_message_id: number | null;
	created_at: Date | string;
	updated_at: Date | string;
}

export interface MessageDTO extends MessageEntity {
	author: Pick<UserEntity, "id" | "name" | "profile_picture">;
	quoted_message?: {
		id: number;
		content: string;
		author_name: string;
	} | null;
}

export type CreateMessageInput = {
	channel_id: number;
	content: string;
	quoted_message_id?: number | null;
	parent_message_id?: number | null;
};
