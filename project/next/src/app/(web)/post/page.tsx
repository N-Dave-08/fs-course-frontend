interface Post {
	id: number;
	title: string;
	body: string;
}

async function getPosts(): Promise<Post[]> {
	const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("failed to fetch posts");
	}

	return res.json();
}

export default async function PostPage() {
	const posts = await getPosts();

	return (
		<div className="min-h-screen bg-gray-100 py-12 px-4">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">
					<div className="space-y-4">
						{posts.map((post) => (
							<article key={post.id} className="bg-white rounded-lg shadow p-6">
								<h2 className="text-xl font-semibold text-gray-900 mb-2">
									{post.title}
								</h2>
								<p className="text-gray-600">{post.body}</p>
							</article>
						))}
					</div>
				</h1>
			</div>
		</div>
	);
}
