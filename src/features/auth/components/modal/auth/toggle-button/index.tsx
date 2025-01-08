type ToggleButtonPT = {
	label: string
	onClick: () => void
}

export function ToggleButton({ label, onClick }: ToggleButtonPT) {
	return (
		<div
			className="cursor-pointer text-lg font-thin text-gray-400 transition-all"
			onClick={onClick}
		>
			{label}
		</div>
	)
}
