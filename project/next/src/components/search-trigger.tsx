"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";

const SearchModal = dynamic(() => import("@/components/search-modal"), {
	loading: () => <span>Loading...</span>,
	ssr: false,
});

export default function SearchTrigger() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<button type="button" onClick={() => setIsOpen(true)}>
				Search Site
			</button>
			{isOpen && (
				<SearchModal onClose={() => setIsOpen(false)} title="Search" />
			)}
		</div>
	);
}
