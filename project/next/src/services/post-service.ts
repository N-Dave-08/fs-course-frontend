import { apiClient } from "@/lib/api-client";
import type { Post } from "@/types/post";

export type CreatePostInput = {
	title: string;
	content: string;
	published: boolean;
	authorId: number;
};

export function getPosts() {
	return apiClient<Post[]>(`/posts`, {
		method: "GET",
	});
}

export function createPost(input: CreatePostInput) {
	return apiClient<Post>(`/posts`, {
		method: "POST",
		body: JSON.stringify(input),
	});
}

export function deletePost(id: string | number) {
	return apiClient<void>(`/posts/${id}`, {
		method: "DELETE",
	});
}
