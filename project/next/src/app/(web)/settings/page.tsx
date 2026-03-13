"use client";

import useLocalStorage from "@/hooks/use-local-storage";

export default function SettingsPage() {
	const [theme, setTheme] = useLocalStorage<string>("theme", "light");

	return (
		<div>
			<div>
				<select value={theme} onChange={(e) => setTheme(e.target.value)}>
					<option value="light">Light</option>
					<option value="dark">Dark</option>
				</select>
			</div>
		</div>
	);
}
