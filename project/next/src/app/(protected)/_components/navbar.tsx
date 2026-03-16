"use client";

import { useAuth } from "@/context/auth-context";
import Link from "next/link";

export default function Navbar() {
	const { user, loading } = useAuth();

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			{user ? <p>Welcome back, {user.name}</p> : <Link href="/">Home</Link>}
		</div>
	);
}
