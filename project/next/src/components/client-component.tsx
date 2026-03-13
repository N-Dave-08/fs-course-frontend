"use client";

import { useState } from "react";
import Button from "./ui/button";

export default function ClientComponent() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<p>Count: {count}</p>

			<Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
			<Button onClick={() => setCount((c) => c - 1)} disabled={count === 0}>
				Decrement
			</Button>
		</div>
	);
}
