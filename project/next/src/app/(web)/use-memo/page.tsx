"use client";

import { useMemo, useRef, useState } from "react";

export default function UseMemoPage() {
	console.log("component render");

	const mounted = useRef(true);

	// if (!mounted.current) {
	// 	console.log("first render of this mount");
	// 	mounted.current = true;
	// }

	const memo = useMemo(() => {
		console.log(" memo executed");
		return 100;
	}, []);

	const [num, setNum] = useState(0);

	return (
		<div>
			<p>{memo}</p>
			<p className={mounted.current ? "bg-blue-400" : "bg-red-400"}>
				mounted{mounted.current}
			</p>
			<button type="button" onClick={() => setNum(num + 1)}>
				Increment
			</button>
		</div>
	);
}
