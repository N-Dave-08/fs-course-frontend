"use client";

import { ApiError } from "@/lib/api-client";
import {
	getUser,
	updateUser,
	type UpdateUserInput,
} from "@/services/user-service";
import { useEffect, useState } from "react";

interface UpdateUserFormProps {
	userId: string;
	initialData?: UpdateUserInput;
}

export default function UpdateUserForm({
	userId,
	initialData,
}: UpdateUserFormProps) {
	// form state for controlled inputs
	const [form, setForm] = useState<UpdateUserInput>({
		email: initialData?.email || "",
		name: initialData?.name || "",
		age: initialData?.age || 0,
		bio: initialData?.bio || "",
	});

	useEffect(() => {
		async function fetchUser() {
			try {
				const user = await getUser(userId);
				setForm({
					email: user.email,
					name: user.name,
					age: user.age,
					bio: user.bio,
				});
			} catch (err: unknown) {
				const error = err as ApiError;
				console.error("error fetching user: ", error);
				alert(error.details || error.message);
			}
		}
		fetchUser();
	}, [userId]);

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
			await updateUser(userId, form);

			// reset form state after successful submission
			setForm({ email: "", name: "", age: 0, bio: "" });

			// simple feedback to user
			alert("User updated successfully");
		} catch (err: unknown) {
			const error = err as ApiError;
			console.error("Error updating user:", error);

			alert(error.details || error.message || "Something went wrong");
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
			<button type="submit">Update User</button>
		</form>
	);
}
