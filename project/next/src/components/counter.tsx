"use client";

import { useEffect, useState } from "react";
import Button from "./ui/button";

export default function Counter() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		console.log("component mounts, count", count);
		console.log("component rerendered");
	}, [count]);

	return (
		<div className="bg-green-50 border border-green-200 rounded-lg p-6 my-4">
			<h2 className="text-lg font-semibold text-green-900 mb-4">
				Client Component - Counter
			</h2>
			<div className=" flex items-center gap-4">
				<Button variant="primary" onClick={() => setCount(count + 1)}>
					Increment
				</Button>
				<span className="text-2xl font-bold text-green-900"> {count}</span>
				<Button
					variant="danger"
					onClick={() => setCount(count - 1)}
					disabled={count === 0}
				>
					Decrement
				</Button>
			</div>
		</div>
	);
}
