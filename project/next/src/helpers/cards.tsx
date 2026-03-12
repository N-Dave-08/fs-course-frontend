export interface Card {
	id: number;
	title: string;
	description: string;
}

export const cards: Card[] = [
	{ id: 1, title: "First Card", description: "this is the first card" },
	{ id: 2, title: "Second Card", description: "this is the second card" },
	{ id: 3, title: "Third Card", description: "this is the third card" },
];
