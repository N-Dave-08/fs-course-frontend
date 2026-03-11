export default async function BlogPost({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	await new Promise((r) => setTimeout(r, 3000));
	return <h1>Blog Post: {slug}</h1>;
}
