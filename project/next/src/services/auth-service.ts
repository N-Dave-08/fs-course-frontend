import { apiClient } from "@/lib/api-client";
import type { User } from "@/types/user";

export interface CreateUserInput {
	email: string;
	name: string;
	age: number;
	bio: string;
	password: string;
}

export function register(input: CreateUserInput) {
	return apiClient<User>("/auth/register", {
		method: "POST",
		body: JSON.stringify(input),
	});
}

export async function login(email: string, password: string) {
	try {
		const data = await apiClient<{
			message: string;
			user: { id: number; name: string; email: string };
		}>("/auth/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});

		console.log("Login Response data: ", data);
		return data;
	} catch (error) {
		console.error("Login Error: ", error);
		throw error;
	}
}

export async function logout() {
	return apiClient("/auth/logout", {
		method: "POST",
	});
}
