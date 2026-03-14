import { apiClient } from "@/lib/api-client";
import type { User } from "@/types/user";

export type CreateUserInput = {
	email: string;
	name: string;
	age: number;
	bio: string;
	password: string;
};

export type UpdateUserInput = {
	email?: string;
	name?: string;
	age?: number;
	bio?: string;
};

export function getUser(userId: string) {
	return apiClient<User>(`/users/${userId}`);
}

export function createUser(input: CreateUserInput) {
	return apiClient<User>("/auth/register", {
		method: "POST",
		body: JSON.stringify(input),
	});
}

export function updateUser(id: string | number, input: UpdateUserInput) {
	return apiClient<User>(`/users/${id}`, {
		method: "PUT",
		body: JSON.stringify(input),
	});
}
