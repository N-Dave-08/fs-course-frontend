import LogoutButton from "@/components/logout-button";
import UsersList from "../_components/users-list";
import UpdateUserFormWrapper from "@/components/update-user-form-wrapper";
import { getUsers } from "@/services/user-service";
import { cookies } from "next/headers";
import Navbar from "../_components/navbar";
import Button from "@/components/ui/button";
interface User {
	id: number;
	name: string;
	email: string;
	age: number;
	bio: string;
}

export default async function UsersPage() {
	let users: User[] = [];
	let error: string | null = null;

	try {
		const cookieStore = await cookies();
		const token = cookieStore.get("token")?.value;
		users = await getUsers(token);
	} catch (err) {
		error = err instanceof Error ? err.message : "Failed to fetch users";
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4">
			<Navbar />
			<UsersList initialUsers={users} />
			<UpdateUserFormWrapper />
			<LogoutButton />
			<Button>click me</Button>
		</div>
	);
}
