import type { Card } from "@/helpers/cards";

interface CardGridProps {
	cards: Card[];
}

export default function CardGrid({ cards }: CardGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-blue-200">
			{cards.map((card) => (
				<div
					key={card.id}
					className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
				>
					<h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
					<p className="text-gray-600">{card.description}</p>
				</div>
			))}
		</div>
	);
}
