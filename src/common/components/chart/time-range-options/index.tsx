export function TimeRangeOptions(
	timeRange: string,
	setTimeRange: React.Dispatch<React.SetStateAction<string>>,
	timeRangeOptions: {
		value: string
		label: string
	}[],
) {
	return (
		<div className="flex items-center justify-end gap-1">
			{timeRangeOptions.map((option, idx) => (
				<label
					key={idx}
					className={`cursor-pointer rounded-full px-2 py-1 transition-all duration-300 ${
						timeRange === option.value
							? "bg-opacity-20 text-center font-bold text-[#0D9172]"
							: "bg-transparent font-thin text-gray-300 hover:bg-gray-200"
					} text-sm`}
				>
					<input
						className="hidden"
						name="range"
						type="radio"
						value={option.value}
						checked={timeRange === option.value}
						onChange={() => setTimeRange(option.value)}
					/>
					<span>{option.label}</span>
				</label>
			))}
		</div>
	)
}
