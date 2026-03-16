export default function SearchModal({
	onClose,
	title,
}: {
	onClose: () => void;
	title: string;
}) {
	return (
		<div className="h-15 w-20 bg-blue-200">
			<p>{title}</p>
			<input type="text" placeholder="search something chu chu" />
			<button
				type="button"
				onClick={onClose}
				className="bg-red-200 p-2 rounded-lg"
			>
				close
			</button>
		</div>
	);
}
