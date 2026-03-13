"use client";

import { useMemo } from "react";

function expensiveCompute(items: number[]) {
	return items.reduce((sum, n) => sum + n, 0);
}

export function UseMemoExample({ items }: { items: number[] }) {
	const total = useMemo(() => {
		console.log("expensiveCompute RAN → items:", items);
		return expensiveCompute(items);
	}, [items]);
	return <div>Total: {total}</div>;
}
