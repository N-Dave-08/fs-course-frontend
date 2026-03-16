"use client";

import { logout as apiLogout } from "@/services/auth-service";
import { getCurrentUser } from "@/services/user-service";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
	user: User | null;
	loading: boolean;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadUser() {
			try {
				const userData = await getCurrentUser();
				setUser(userData);
			} catch (error) {
				console.error;
				setUser(null);
			} finally {
				setLoading(false);
			}
		}
		loadUser();
	}, []);

	const handleLogout = async () => {
		try {
			await apiLogout();
		} catch (error) {
			console.error;
		} finally {
			setUser(null);
			router.push("/");
			router.refresh();
		}
	};

	return (
		<AuthContext.Provider value={{ user, loading, logout: handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
