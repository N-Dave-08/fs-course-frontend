"use client";

import { useState } from "react";
import Button from "./ui/button";

export default function Counter() {
	const [count, setCount] = useState(0);

	return (
		<div className="bg-green-50 border border-green-200 rounded-lg p-6 my-4">
			<h2 className="text-lg font-semibold text-green-900 mb-4">
				Client Component - Counter
			</h2>
			<div className=" flex items-center gap-4">
				<Button
					variant="primary"
					label="Increment"
					onClick={() => setCount(count + 1)}
				/>
				<span className="text-2xl font-bold text-green-900"> {count}</span>
				<Button
					variant="danger"
					label="Decrement"
					onClick={() => setCount(count - 1)}
					disabled={count === 0}
				/>
			</div>
		</div>
	);
}
