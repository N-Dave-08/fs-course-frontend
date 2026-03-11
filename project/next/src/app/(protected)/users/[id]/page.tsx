interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function UserPage({ params }: PageProps) {
	const { id } = await params;
	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">User Profile</h1>
			</div>
			<p className="text-lg text-gray-600">
				User ID: <span className="font-semibold">{id}</span>
			</p>
		</div>
	);
}
