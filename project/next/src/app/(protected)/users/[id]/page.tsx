interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

interface User {
	id: number;
	name: string;
	email: string;
	age: number;
	bio: string;
}

async function getUsers(id: string): Promise<User> {
	const res = await fetch(`http://localhost:3001/api/users/${id}`);
	if (!res.ok) throw new Error(`failed to load users: ${res.status}`);
	return res.json();
}

export default async function UserPage({ params }: PageProps) {
	const { id } = await params;
	const users = await getUsers(id);
	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">User Profile</h1>
				<p className="text-lg text-gray-600">
					User ID: <span className="font-semibold">{id}</span>
				</p>
				<div>{users.name}</div>
			</div>
		</div>
	);
}
