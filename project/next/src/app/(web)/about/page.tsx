import Link from "next/link";

export default async function About() {
	await new Promise((r) => setTimeout(r, 3000));
	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
				<p className="text-lg text-gray-600 mb-6">
					This is About page. Learn more about our application here.
				</p>
			</div>
			<Link href="/" className="text-blue-600 hover:text-blue-800 underline">
				Back to Home
			</Link>
		</div>
	);
}
