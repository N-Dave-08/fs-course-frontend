import Counter from "@/components/counter";
import CreatePostForm from "@/components/create-post-form";
import CreateUserForm from "@/components/create-user-form";
import DataFetcher from "@/components/data-fetcher";
import LoginForm from "@/components/login-form";
import NameForm from "@/components/name-form";
import PostsList from "@/components/posts-list";
import ServerInfo from "@/components/server-info";
import CardGrid from "@/components/ui/card-grid";
import UpdateUserForm from "@/components/update-user-form";
import { cards } from "@/helpers/cards";
import Link from "next/link";

export default function Home() {
	return (
		<div>
			<div className=" min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="max-w-2xl mx-auto px-4">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						Welcome to Next.js
					</h1>
					<p className="text-lg text-gray-600">
						This is your first Next.js page using App Router.
					</p>
					<Link
						href="/about"
						className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
					>
						Go to About page
					</Link>
					<ServerInfo />
					<Counter />
					<CardGrid cards={cards} />
					<NameForm />
					<DataFetcher />
					<CreateUserForm />
					<UpdateUserForm userId="132" />
					<CreatePostForm />
					<PostsList />
					<LoginForm />
				</div>
			</div>
		</div>
	);
}
