import { cx } from "@/lib/utils";

interface ButtonProps {
	className?: string;
	label: string;
	onClick: () => void;
	variant?: "primary" | "secondary" | "danger";
	disabled?: boolean;
}

const buttonClass = (variant: "primary" | "secondary" | "danger") =>
	cx(
		"py-1 px-2 rounded-lg focuse:outline-none focus:ring-2",
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
	label,
	onClick,
	variant = "primary",
	disabled,
}: ButtonProps) {
	return (
		<button
			className={cx(buttonClass(variant), className)}
			type="button"
			onClick={onClick}
			disabled={disabled}
		>
			{label}
		</button>
	);
}
