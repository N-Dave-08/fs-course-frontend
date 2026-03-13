"use client";

import { useEffect, useState } from "react";

interface User {
	id: number;
	name: string;
	email: string;
}

export default function DataFetcher() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchUsers() {
			try {
				setLoading(true);
				setError(null);

				const res = await fetch("https://jsonplaceholder.typicode.com/users");

				if (!res.ok) {
					throw new Error("failed to fetch users");
				}

				const data = await res.json();
				setUsers(data);
			} catch (error) {
				setError(error instanceof Error ? error.message : "an error occurred");
			} finally {
				setLoading(false);
			}
		}

		fetchUsers();
	}, []);

	if (loading) {
		return <div>loading users...</div>;
	}

	if (error) {
		<div>Error: {error}</div>;
	}
	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-2">Users</h2>
			<ul className="space-y-2">
				{users.map((user) => (
					<li key={user.id}>
						<p className="text-lg font-bold text-gray-800">{user.name}</p>
						<p className="text-gray-600">{user.email}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
