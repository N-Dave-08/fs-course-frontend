"use client";

import { useEffect, useState } from "react";

async function fetchData(): Promise<string> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("hello");
		}, 2000);
	});
}

export default function UseEffect() {
	const [data, setData] = useState<string | null>(null);

	useEffect(() => {
		console.log("side effect started");
		let cancelled = false;

		fetchData().then((value) => {
			if (!cancelled) setData(value);
			console.log("side effect finished");
		});

		return () => {
			cancelled = true;
		};
	}, []);

	return <div>{data ?? "loading..."}</div>;
}
