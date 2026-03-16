import React from "react";

export default async function SlowComponent() {
	await new Promise((resolve) => setTimeout(resolve, 3000));

	return <div className="p-5 bg-orange-400">data loaded after 3 seconds</div>;
}
