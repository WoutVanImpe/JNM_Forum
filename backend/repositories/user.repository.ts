import { db } from "../config/knex";
import { CreateUserInput, FunctionEntity, UpdateUserInput, UserEntity } from "../types";

export const userRepository = {
	findById: async (id: number): Promise<UserEntity | undefined> => {
		return db("users").where({ id }).first();
	},

	findFunctionsByUserId: async (userId: number): Promise<FunctionEntity[]> => {
		return db("user_functions").join("functions", "user_functions.function_id", "functions.id").where("user_functions.user_id", userId).select("functions.id", "functions.name");
	},

	searchUsersInChannel: async (input: string, channelId: number): Promise<UserEntity[]> => {
		return db("users")
			.distinct("users.*")
			.join("user_functions", "users.id", "user_functions.user_id")
			.join("category_permissions", "user_functions.function_id", "category_permissions.function_id")
			.join("channels", "category_permissions.category_id", "channels.category_id")
			.where("channels.id", channelId)
			.andWhere("category_permissions.can_view", true)
			.andWhere("users.name", "ilike", `%${input}%`)
			.limit(5); //
	},

	create: async (userData: CreateUserInput): Promise<UserEntity> => {
		const [createdUser] = await db("users").insert(userData).returning("*");
		return createdUser;
	},

	update: async (id: number, updateData: UpdateUserInput): Promise<UserEntity> => {
		const [updatedUser] = await db("users")
			.where({ id })
			.update({
				...updateData,
				updated_at: db.fn.now(),
			})
			.returning("*");
		return updatedUser;
	},
};
