export function TimeRangeOptions(
	timeRange: string,
	setTimeRange: React.Dispatch<React.SetStateAction<string>>,
	timeRangeOptions: {
		value: string
		label: string
	}[],
) {
	return (
		<div className="flex items-center justify-end gap-3">
			{timeRangeOptions.map((option, idx) => (
				<label
					key={idx}
					className={`${
						timeRange === option.value
							? "font-bold text-[#0D9172]"
							: "font-thin text-[#9FA0A0]"
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
