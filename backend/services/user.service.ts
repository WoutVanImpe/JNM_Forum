import { userRepository } from "../repositories/user.repository";
import type { User, CreateUserInput } from "../types/user.types";

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    return userRepository.findAll();
  },

  getUserById: async (id: number): Promise<User> => {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error(`Gebruiker met id ${id} niet gevonden`);
    }
    return user;
  },

  createUser: async (userData: CreateUserInput): Promise<User> => {
    return userRepository.create(userData);
  },
};