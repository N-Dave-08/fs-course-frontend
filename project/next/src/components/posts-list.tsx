"use client";

import { deletePost, getPosts } from "@/services/post-service";
import type { Post } from "@/types/post";
import { useEffect, useState } from "react";

export default function PostsList() {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		async function fetchPosts() {
			try {
				const data = await getPosts();
				setPosts(data);
			} catch (error) {
				console.error(error);
			}
		}
		fetchPosts();
	}, []);

	async function handleDelte(id: string | number) {
		if (!confirm("are you sure you want to delete this post?")) return;

		try {
			await deletePost(id);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="bg-white p-4 rounded-lg flex felx-col gap-4 shadow">
			<ul className="space-y-4">
				{posts.map((post) => (
					<li key={post.id}>
						<p className="font-semibold text-gray-600">
							Author ID: {post.authorId}
						</p>
						<h2 className="font-bold text-gray-400">Title: {post.title}</h2>
						<p className="text-xl">{post.content}</p>
						<button
							type="button"
							onClick={() => handleDelte(post.id)}
							className="bg-red-400 p-2"
						>
							delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
