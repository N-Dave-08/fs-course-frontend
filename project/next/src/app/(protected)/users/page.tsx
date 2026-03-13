import UsersList from "../_components/users-list";

interface User {
	id: number;
	name: string;
	email: string;
	age: number;
	bio: string;
}

async function getUsers(): Promise<User[]> {
	const res = await fetch("http://localhost:3001/api/users/", {
		cache: "no-store",
	});
	if (!res.ok) throw new Error(`failed to load users: ${res.status}`);
	const data = await res.json();
	return data.data;
}

export default async function UsersPage() {
	let users: User[] = [];

	try {
		users = await getUsers();
	} catch (error) {
		console.error(error);
	}
	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4">
			<UsersList initialUsers={users} />
		</div>
	);
}
