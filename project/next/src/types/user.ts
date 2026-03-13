export interface User {
	id: number;
	name: string;
	email: string;
	age: number;
	bio: string;
}

export interface ApiResponse {
	data: User[];
}
