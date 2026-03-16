import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Use 'export default' to resolve the "must export a function" error
export default function proxy(req: NextRequest) {
	const token = req.cookies.get("token")?.value;

	// Direct match for /users and any sub-routes
	if (!token) {
		// Redirecting to the landing page (root)
		return NextResponse.redirect(new URL("/", req.url));
	}

	return NextResponse.next();
}

export const config = {
	// Ensure this covers exactly what you want to protect
	matcher: ["/users", "/users/:path*"],
};
