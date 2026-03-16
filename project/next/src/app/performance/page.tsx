"use client";

import { useEffect } from "react";

export default function PerformancePage() {
	useEffect(() => {
		const logMetrics = () => {
			// Assert the type to PerformanceNavigationTiming
			const [navigation] = performance.getEntriesByType(
				"navigation",
			) as PerformanceNavigationTiming[];

			if (navigation) {
				const pageLoadTime = navigation.loadEventEnd - navigation.startTime;
				console.log("🚀 Page Load Time:", pageLoadTime.toFixed(2), "ms");
			}
		};

		if (document.readyState === "complete") {
			logMetrics();
		} else {
			window.addEventListener("load", logMetrics);
			return () => window.removeEventListener("load", logMetrics);
		}
	}, []);

	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-4">Performance Monitoring</h1>
			<p>Check browser console for performance metrics</p>
		</div>
	);
}
