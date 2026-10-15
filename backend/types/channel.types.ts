export interface ChannelEntity {
	id: number;
	category_id: number;
	name: string;
	type: "chat" | "thread" | "broadcast";
	created_at: Date | string;
	updated_at: Date | string;
}

export interface ChannelReadEntity {
	user_id: number;
	channel_id: number;
	last_read_at: Date | string;
}

export type CreateChannelInput = Omit<ChannelEntity, "id" | "created_at" | "updated_at">;

export type UpdateChannelReadInput = {
	channel_id: number;
};
