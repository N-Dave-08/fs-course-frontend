import Image from "next/image";

export default function Playground() {
	return (
		<main className="grow">
			<div className="min-h-screen bg-gray-50  items-center justify-center">
				<div className="max-w-2xl mx-auto px-4">
					<div className="flex justify-between bg-amber-200 w-full">
						<div className=" bg-blue-600 size-60">box</div>
						<div className=" bg-red-600 size-60">box</div>
					</div>
					<div className="flex gap-4">
						<div className="shrink-0">Icon</div>
						<div className="min-w-0">
							<p className="truncate">
								Long text that should truncate
								aksjdkajsndkajbskdjbaskjbdkajsbdkjbaskjdbakjsbdkjbaskjdbakjsbd
							</p>
						</div>
					</div>

					{/* Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						<div className="bg-purple-200">Item 1</div>
						<div className="bg-purple-200">Item 2</div>
						<div className="bg-purple-200">Item 3</div>
					</div>

					{/* Max Width */}
					<div className="container max-w-xl mx-auto px-4 bg-green-200">
						Content with max width
					</div>

					{/* Responsive Classes */}
					<div className="text-sm md:test-base lg:text-lg">Responsive text</div>

					{/* Mobile responsive first */}
					<div className="flex flex-col gap-4 md:flex-row bg-amber-200">
						<div className="p-4 bg-indigo-200">left</div>
						<div className="p-4 bg-indigo-200">right</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						<div className="bg-green-200">Box</div>
						<div className="bg-green-200">Box</div>
						<div className="bg-green-200">Box</div>
					</div>

					<Image
						src={"/image.jpg"}
						alt="the thing"
						width={500}
						height={500}
						className="w-full h-auto"
					/>

					<div className="flex w-96">
						<div className="bg-orange-200  w-64 shrink-0">Box</div>
						<div className="bg-purple-200  w-64">Box</div>
					</div>
				</div>
			</div>
		</main>
	);
}
