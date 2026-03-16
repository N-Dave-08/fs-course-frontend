"use client";

import { login } from "@/services/auth-service";
import React, { useState } from "react";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		setLoading(true);
		setError("");

		try {
			await login(email, password);
			window.location.href = "/users";
		} catch (error) {
			console.error(error);
			setError("Canot Login");
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>{error}</div>
			<input
				type="text"
				name="email"
				placeholder="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				name="password"
				placeholder="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type="submit">{loading ? "logging in..." : "login"}</button>
		</form>
	);
}
