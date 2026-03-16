"use client";

import { getCurrentUser } from "@/services/user-service";
import { useEffect, useState } from "react";
import UpdateUserForm from "./update-user-form";

export default function UpdateUserFormWrapper() {
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		async function fetchUser() {
			const user = await getCurrentUser();
			setUserId(user.id.toString());
		}

		fetchUser();
	}, []);

	if (!userId) return null;

	return <UpdateUserForm userId={userId} />;
}
