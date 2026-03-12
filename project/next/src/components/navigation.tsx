import Link from "next/link";

export default function Navigation() {
	return (
		<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="flex justify-between h-16">
				{/* Logo Brand */}
				<div className="shrink-0 flex flex-col justify-center">
					<Link href="/" className="text-xl font-bold text-gray-900">
						MyApp
					</Link>
				</div>

				<div className="flex space-x-8">
					<Link
						href="/"
						className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-blue-600"
					>
						Home
					</Link>
					<Link
						href="/about"
						className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-blue-600"
					>
						About
					</Link>
					<Link
						href="/contact"
						className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-blue-600"
					>
						Contanct
					</Link>
				</div>
			</div>
		</nav>
	);
}
