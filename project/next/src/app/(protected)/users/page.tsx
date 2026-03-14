import { apiClient } from "@/lib/api-client";
import UsersList from "../_components/users-list";

interface User {
	id: number;
	name: string;
	email: string;
	age: number;
	bio: string;
}

async function getUsers(): Promise<User[]> {
	const data = await apiClient<{ data: User[] }>("/users", {
		cache: "no-store",
	});

	return data.data;
}

export default async function UsersPage() {
	let users: User[] = [];
	let error: string | null = null;

	try {
		users = await getUsers();
	} catch (err) {
		error = err instanceof Error ? err.message : "Failed to fetch users";
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4">
			<UsersList initialUsers={users} />
		</div>
	);
}
