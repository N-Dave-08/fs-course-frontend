const API_URL = "http://localhost:3001/api";

export type ApiError = {
	status: number;
	message: string;
	details?: unknown;
};

export async function apiClient<T>(
	endpoint: string,
	options?: RequestInit,
	token?: string,
): Promise<T> {
	// 1. Build headers dynamically
	const headers = new Headers(options?.headers);
	headers.set("Content-Type", "application/json");

	// 2. Only add Authorization if token exists (Server Component usage)
	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	const res = await fetch(`${API_URL}${endpoint}`, {
		...options,
		headers,
		// 3. 'include' is safe for both server and client in modern Fetch,
		// but explicit check is fine.
		credentials: "include",
	});

	if (!res.ok) {
		const text = await res.text();
		let details: unknown;
		try {
			details = text ? JSON.parse(text) : null;
		} catch {
			details = text;
		}

		// Throw a structured error that your UI can catch
		throw {
			status: res.status,
			message: (details as any)?.error || res.statusText,
			details,
		} as ApiError;
	}

	// Handle empty responses (like 204 No Content) gracefully
	if (res.status === 204) return {} as T;

	return res.json();
}
