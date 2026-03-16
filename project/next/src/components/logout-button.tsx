"use client";

import { logout } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
	const router = useRouter();
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	async function handleLogout() {
		setIsLoggingOut(true);
		try {
			await logout();

			router.refresh();
			router.push("/");
		} catch (error) {
			console.error("logout error:", error);
			alert("failed to logout");
		} finally {
			setIsLoggingOut(false);
		}
	}

	return (
		<button
			type="button"
			onClick={handleLogout}
			disabled={isLoggingOut}
			className="bg-red-400 text-white px-4 py-1 rounded"
		>
			{isLoggingOut ? "Logging out..." : "Logout"}
		</button>
	);
}
