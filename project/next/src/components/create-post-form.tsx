"use client";

import type { ApiError } from "@/lib/api-client";
import { createPost, type CreatePostInput } from "@/services/post-service";
import { useState } from "react";

export default function CreatePostForm() {
	const [form, setForm] = useState<CreatePostInput>({
		title: "",
		content: "",
		published: false,
		authorId: 0,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: name === "authorId" ? Number(value) : value,
		}));
	}

	

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSuccess(false);

		setTimeout(async() => {
		try {
			await createPost(form)
			setSuccess(true);
			setTimeout(() => setSuccess(false), 3000);
			// alert("post created successfully");
		} catch (err: unknown) {
			const message =
				typeof err === "object" && err && "message" in err
					? String((err as ApiError).message)
					: "failed to create post";
			setError(message);
		} finally {
			setLoading(false);
		}

		// for triggering loading, delay for 3 seconds
	}, 3000)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white rounded-lg shadow p-4 flex flex-col gap-4"
		>
			{error && <div>Error: {error}</div>}
			{success && <div className="text-green-600">user created successfully</div>}
			<input
				type="text"
				placeholder="Title"
				name="title"
				value={form.title}
				onChange={handleChange}
			/>
			<input
				type="text"
				placeholder="Content"
				name="content"
				value={form.content}
				onChange={handleChange}
			/>
			<div className="flex items-center gap-4">
				<label htmlFor="published">Published</label>
				<input
					type="checkbox"
					name="published"
					checked={form.published}
					onChange={(e) =>
						setForm((prev) => ({ ...prev, published: e.target.checked }))
					}
				/>
			</div>
			<input
				type="number"
				placeholder="Author ID"
				name="authorId"
				value={form.authorId}
				onChange={handleChange}
			/>
			<button disabled={loading} className="bg-blue-400 p-2" type="submit">
				{
					loading ? "creating post..." : "create post"
				}
			</button>
		</form>
	);
}
