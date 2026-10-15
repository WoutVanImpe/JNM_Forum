import type { UserDto } from "@/types/user.dto";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// GET /users
export const getUsers = async (): Promise<UserDto[]> => {
	const response = await fetch(`${API_URL}/users`);
	return response.json();
};

// POST /users
export const createUser = async (user: Omit<UserDto, "id">): Promise<UserDto> => {
	const response = await fetch(`${API_URL}/users`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user),
	});
	return response.json();
};
