"use client";

import { User } from "@/types/user";
import { useState } from "react";

interface UsersListProps {
	initialUsers: User[];
}

export default function UsersList({ initialUsers }: UsersListProps) {
	const [users] = useState<User[]>(initialUsers);

	return (
		<div className="max-w-2xl mx-auto">
			<h1 className="text-4xl font-bold text-gray-900 mb-4">Users List</h1>
			<ul className="space-y-2">
				{users.map((user) => (
					<li key={user.id}>
						<p className="text-lg font-bold text-gray-600">{user.name}</p>
						<p className="text-gray-600">{user.email}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
