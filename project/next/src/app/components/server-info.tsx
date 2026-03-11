import React from "react";

export default function ServerInfo() {
	const timestamp = new Date().toISOString();
	const formatted = new Date(timestamp).toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	});

	return (
		<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
			<h2 className="text-lg font-semibold text-blue-900 mb-2">
				Server Component
			</h2>
			<p className="text-blue-700">
				Current server time: <span className="font-mono">{formatted}</span>
			</p>
			<p className="text-sm text-blue-600 mt-2">
				This component rendered on the server at page load.
			</p>
		</div>
	);
}
