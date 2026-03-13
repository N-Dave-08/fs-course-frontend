"use client";

import { useState } from "react";

// <T> is a GENERIC TYPE
// This means the hook can store ANY type (string, number, object, array, etc.)
function useLocalStorage<T>(
	key: string,
	initialValue: T,
): [T, (value: T) => void] {
	// return type: [storedValue, setValueFunction]
	// useState with LAZY INITIALIZATION
	// Instead of passing a value directly, we pass a function (() => {...})
	// React will execute this function ONLY on the first render
	// This is useful because reading localStorage is a side operation we don't want to run on every render
	const [storedValue, setStoredValie] = useState<T>(() => {
		// Next.js / SSR safety check
		// On the server, "window" does not exist
		// So we return the initial value to prevent errors
		if (typeof window === "undefined") {
			return initialValue;
		}

		try {
			// Try to read the value from localStorage
			const item = window.localStorage.getItem(key);

			// If value exists -> parse it from JSON
			// If not -> fallback to the initialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			// If JSON parsing fails or something goes wrong
			console.error(error);

			// fallback to initial value
			return initialValue;
		}
	});

	// Custom setter function
	const setValue = (value: T) => {
		try {
			// This supports TWO types of updates
			// 1. Direct value: setValue(5)
			// 2. Function update: setValue(prev => prev + 1)

			const valueToStore =
				value instanceof Function // check if value is a function
					? value(storedValue) // if function -> execute it with current state
					: value; // otherwise use value directly

			// update React state
			setStoredValie(valueToStore);

			// Save value to localStorage (only in browser)
			if (typeof window !== "undefined") {
				window.localStorage.setItem(
					key,
					JSON.stringify(valueToStore), // convert value to JSON string
				);
			}
		} catch (error) {
			console.error(error);
		}
	};

	// return tuple
	// same structure as useState
	return [storedValue, setValue];
}

export default useLocalStorage;
