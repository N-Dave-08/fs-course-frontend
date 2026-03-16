import { apiClient } from "@/lib/api-client";
import type { User } from "@/types/user";

export interface UpdateUserInput {
	email?: string;
	name?: string;
	age?: number;
	bio?: string;
}

export function getUser(userId: string) {
	return apiClient<User>(`/users/${userId}`);
}

export async function getUsers(token?: string): Promise<User[]> {
	const data = await apiClient<{ data: User[] }>(
		"/users",
		{
			cache: "no-store",
		},
		token,
	);

	return data.data;
}

export async function getCurrentUser(): Promise<User> {
	const data = await apiClient<User>("/auth/me", {
		cache: "no-store",
	});

	return data;
}

export function updateUser(id: string | number, input: UpdateUserInput) {
	return apiClient<User>(`/users/${id}`, {
		method: "PUT",
		body: JSON.stringify(input),
	});
}
