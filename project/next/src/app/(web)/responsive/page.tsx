export default function ResponsivePage() {
	return (
		<div className="min-h-screen bg-gray-100">
			{/* Header */}
			<header className="bg-white shadow-sm p-4">
				<h1 className="text-2xl font-bold text-gray-900">Responsive Layout</h1>
			</header>

			<main className="class-w-7xl">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{/* Sidebar - Full width on mobile, 1 column on larger */}
					<aside className="lg:col-span-1 bg-white rounded-lg shadow p-4">
						<h2 className="text-lg font-semibold mb-4">Sidebar</h2>
						<p className="text-gray-600">
							This sidebar appears on all screen sizes but takes different
							space.
						</p>
					</aside>
					{/* Main Content = Full width on mobile/tablet, 2 columns on desktop */}
					<div className="mg:col-span-2 lg:col-span-2 space-y-4">
						<section className="bg-white rounded-lg shadow p-6">
							<h2 className="text-lg font-semibold mb-4">Main Content</h2>
							<p className="text-gray-600">
								This is the main content area. On mobile, it's full width. On
								tablet, it shares space with sidebar. On desktop, it takes 2/3
								of the width.
							</p>
						</section>

						<section className="bg-white rounded-lg shadow p-4">
							<h2 className="text-lg font-semibold mb-4">Additional Content</h2>
							<p className="text-gray-600">
								More content goes here. The layout adapts to screen size.
							</p>
						</section>
					</div>
				</div>
			</main>
		</div>
	);
}
