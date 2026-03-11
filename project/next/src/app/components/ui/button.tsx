interface ButtonProps {
	className?: string;
	label: string;
	onClick: () => void;
	variant?: "primary" | "secondary" | "danger";
	disabled?: boolean;
}

export default function Button({
	className,
	label,
	onClick,
	variant = "primary",
	disabled,
}: ButtonProps) {
	const variantStyles = {
		primary: "bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-200",
		secondary: "bg-gray-500 hover:bg-gray-600 text-white disabled:bg-gray-200",
		danger: "bg-red-500 hover:bg-red-600 text-white disabled:bg-red-200",
	};
	return (
		<button
			className={`${variantStyles[variant]} py-1 px-2 rounded-lg disabled:text-gray-500 transition ${className ?? ""}`}
			type="button"
			onClick={onClick}
			disabled={disabled}
		>
			{label}
		</button>
	);
}
