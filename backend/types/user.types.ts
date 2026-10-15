export interface UserEntity {
	id: number;
	auth0_id: string;
	name: string;
	age_group: string;
	department: string;
	profile_picture: string | null;
	onesignal_device_id: string | null;
	created_at: Date | string;
	updated_at: Date | string;
}

export interface FunctionEntity {
	id: number;
	name: string;
}
export interface UserDTO extends UserEntity {
	functions: FunctionEntity[];
}

export type CreateUserInput = Omit<UserEntity, "id" | "created_at" | "updated_at">;

export type UpdateUserInput = Partial<Omit<UserEntity, "id" | "name" | "profile_picture" | "auth0_id" | "created_at" | "updated_at">>;
