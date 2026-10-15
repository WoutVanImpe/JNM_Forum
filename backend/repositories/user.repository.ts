import { db } from "../config/knex";
import type { User, CreateUserInput } from "../types/user.types";

export const userRepository = {
  findAll: async (): Promise<User[]> => {
    return db("users").select("*");
  },

  findById: async (id: number): Promise<User | undefined> => {
    return db("users").where({ id }).first();
  },

  create: async (userData: CreateUserInput): Promise<User> => {
    const [createdUser] = await db("users").insert(userData).returning("*");
    return createdUser;
  },
};