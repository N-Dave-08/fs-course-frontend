const API_URL = "http://localhost:3001/api";

export type ApiError = {
	status: number;
	message: string;
	details?: unknown; // optional extra error info returned by the API
};

export async function apiClient<T>(
	endpoint: string,
	options?: RequestInit, // built-in type for fetch configuration (method, headers, body, etc.)
): Promise<T> {
	const res = await fetch(`${API_URL}${endpoint}`, {
		headers: {
			"Content-Type": "application/json",

			// merges any headers passed from the caller
			// if options.headers exists → spread them
			// if not → use empty object to avoid errors
			...(options?.headers ?? {}),
		},

		// spreads the rest of the fetch options
		// example: method, body, credentials, etc.
		...options,
	});

	// If HTTP status is NOT in the 200–299 range
	if (!res.ok) {
		const text = await res.text(); // ← only one body read, always safe

		let details: unknown;
		try {
			details = text ? JSON.parse(text) : null;
		} catch {
			details = text; // ← keep raw text if not valid JSON
		}

		throw {
			status: res.status,
			message: res.statusText,
			details,
		} satisfies ApiError;
	}

	// parse successful response JSON
	// <T> ensures TypeScript knows the expected return type
	return res.json();
}
