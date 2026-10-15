import { ChannelEntity } from "./channel.types";

export interface CategoryEntity {
	id: number;
	name: string;
	created_at: Date | string;
	updated_at: Date | string;
}

export interface CategoryDTO extends CategoryEntity {
	channels?: ChannelEntity[];
	permissions?: {
		can_view: boolean;
		can_manage: boolean;
		is_admin: boolean;
	};
}

export type CreateCategoryInput = {
	name: string;
	allowed_function_ids: number[];
};
