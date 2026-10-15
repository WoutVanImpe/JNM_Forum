import { userRepository } from "../repositories/user.repository";
import type { UserEntity, CreateUserInput, UpdateUserInput, UserDTO } from "../types/user.types";

export const userService = {
	getUserById: async (userId: number): Promise<UserDTO> => {
		const user = await userRepository.findById(userId);
		if (!user) {
			throw new Error(`Gebruiker met id ${userId} niet gevonden`);
		}

		const functions = await userRepository.findFunctionsByUserId(userId);

		return {
			...user,
			functions,
		};
	},

	searchInChannel: async (input: string, channelId: number): Promise<UserEntity[]> => {
		return userRepository.searchInChannel(input, channelId);
	},

	createUser: async (userData: CreateUserInput): Promise<UserEntity> => {
		return userRepository.create(userData);
	},

	updateUser: async (id: number, updateData: UpdateUserInput): Promise<UserEntity> => {
		const updatedUser = await userRepository.update(id, updateData);
		if (!updatedUser) {
			throw new Error(`Kan gebruiker met id ${id} niet bijwerken: niet gevonden`);
		}
		return updatedUser;
	},
};
