export default async function ServerComponent() {
	const data = await Promise.resolve("hello from server");
	return <div>{data}</div>;
}
