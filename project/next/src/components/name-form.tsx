"use client";

import { useId, useState } from "react";

export default function NameForm() {
	const [name, setName] = useState<string>("");
	const id = useId();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-4">Name Form</h2>
			<div>
				<div>
					<label
						htmlFor={id}
						className="block text-sm font-medium text-gray-700 mb-2"
					>
						Enter your name
					</label>
					<input
						type="text"
						id={id}
						value={name}
						onChange={handleChange}
						className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-50"
						placeholder="type your name here..."
					/>
				</div>

				{name && (
					<div>
						<p>
							Hello, <span>{name}</span>
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
