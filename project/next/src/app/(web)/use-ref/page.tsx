"use client";

import { useRef, useState } from "react";
import Button from "@/components/ui/button";

export default function UseRefPage() {
	const [count, setCount] = useState<number>(0);
	const buttonRef = useRef(null);

	// useRef is like button.getElementById in javascript
	console.log(buttonRef.current); //shows the button DOM in the console

	return (
		<div>
			<p>count: {count}</p>
			<Button ref={buttonRef} onClick={() => setCount(count + 1)}>
				Increment
			</Button>
		</div>
	);
}
