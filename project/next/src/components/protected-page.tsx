import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function ProtectedPage({ children }: { children: ReactNode }) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			router.replace("/");
		} else {
			setLoading(false);
		}
	}, [router]);

	if (loading) return <div>loading...</div>;

	return <div>{children}</div>;
}
