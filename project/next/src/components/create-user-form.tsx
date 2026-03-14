"use client";

import { createUser, CreateUserInput } from "@/services/user-service";
import { useState } from "react";

export default function CreateUserForm() {
	// form state for controlled inputs
	const [form, setForm] = useState<CreateUserInput>({
		email: "",
		name: "",
		age: 0,
		bio: "",
		password: "",
	});

	// handles changes for all inputs and textarea
	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		const { name, value } = e.target;

		// dynamically update the corresponding field in the form state
		// note: age needs to be converted to a number
		setForm((prev) => ({
			...prev,
			[name]: name === "age" ? Number(value) : value,
		}));
	}

	// handles form submission
	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		try {
			// call the user-service createUser function
			// it uses apiClient internally to make the HTTP POST request
			await createUser(form);

			// reset form state after successful submission
			setForm({ email: "", name: "", age: 0, bio: "", password: "" });

			// simple feedback to user
			alert("User created successfully");
		} catch (error) {
			// error is likely a structured ApiError from apiClient
			// logging the full error helps debug both status and details
			console.error("error creating user: ", error);

			// alert shows either a JSON object or string depending on the response
			alert(error);
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-4 bg-white rounded-lg shadow p-4"
		>
			<input
				type="email"
				name="email" // important: must match form state key for handleChange
				placeholder="Email"
				value={form.email}
				onChange={handleChange}
			/>
			<input
				type="text"
				name="name" // must match form state key
				placeholder="Name"
				value={form.name}
				onChange={handleChange}
			/>
			<input
				type="number"
				name="age" // must match form state key
				placeholder="Age"
				value={form.age}
				onChange={handleChange}
			/>
			<textarea
				placeholder="Bio"
				name="bio" // must match form state key
				value={form.bio}
				onChange={handleChange}
			/>
			<input
				type="password"
				name="password" // must match form state key
				placeholder="Password"
				value={form.password}
				onChange={handleChange}
			/>
			<button type="submit">Register</button>
		</form>
	);
}
