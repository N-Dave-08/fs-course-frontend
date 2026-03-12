import React from "react";

type CardProps = {
	title: string;
	children: React.ReactNode;
};

export default function Cards({ title, children }: CardProps) {
	return (
		<section className="bg-gray-100 p-2 rounded-md">
			<h2 className="mb-2">{title}</h2>
			{children}
		</section>
	);
}
