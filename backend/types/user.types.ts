export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
}

export type CreateUserInput = Omit<User, "id" | "created_at">;