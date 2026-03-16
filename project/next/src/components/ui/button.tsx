import { cx } from "@/lib/utils";

interface ButtonProps {
	className?: string;
	children: React.ReactNode;
	onClick?: () => void;
	variant?: "primary" | "secondary" | "danger" | "glass";
	disabled?: boolean;
	ref?: React.Ref<HTMLButtonElement>;
}

const buttonClass = (variant: "primary" | "secondary" | "danger" | "glass") =>
	cx(
		"h-10 min-w-20",
		"py-1 px-2 rounded-lg focus:outline-none focus:ring-2",
		"disabled:text-gray-500 transition",

		variant === "primary" &&
			"bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-200 disabled:bg-blue-200",
		variant === "secondary" &&
			"bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-200 disabled:bg-gray-200",
		variant === "danger" &&
			"bg-red-500 hover:bg-red-600 text-white focus:ring-red-200 disabled:bg-red-200",
	);

export default function Button({
	className,
	children,
	onClick,
	variant = "primary",
	disabled,
	ref,
}: ButtonProps) {
	return (
		<button
			className={cx(buttonClass(variant), className)}
			type="button"
			onClick={onClick}
			disabled={disabled}
			ref={ref}
		>
			{children}
		</button>
	);
}
