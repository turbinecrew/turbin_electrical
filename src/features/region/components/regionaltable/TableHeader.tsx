type SortConfig = {
	key: string | null
	ascending: boolean
}

type Column = {
	key: string
	label: string
}

interface TableHeaderProps {
	formattedToday: string
	columns: Column[]
	sortConfig: SortConfig
	onSort: (key: string) => void
}

export default function TableHeader({
	formattedToday,
	columns,
	sortConfig,
	onSort,
}: TableHeaderProps) {
	return (
		<thead className="bg-gray-100">
			<tr>
				<th colSpan={6} className="border border-gray-300 px-4 py-2">
					오늘({formattedToday})
				</th>
			</tr>
			<tr>
				{columns.map((column) => (
					<th key={column.key} className="border border-gray-300 px-4 py-2">
						<div className="flex items-center justify-between">
							<span className="text-center">{column.label}</span>
							<div className="flex flex-col">
								<button
									type="button"
									onClick={() => onSort(column.key)}
									className={`h-3 px-1 text-[10px] hover:bg-gray-200 ${
										sortConfig.key === column.key && sortConfig.ascending
											? "text-[#07A525]"
											: "text-gray-500"
									}`}
								>
									▲
								</button>
								<button
									type="button"
									onClick={() => onSort(column.key)}
									className={`h-3 px-1 text-[10px] hover:bg-gray-200 ${
										sortConfig.key === column.key && !sortConfig.ascending
											? "text-[#07A525]"
											: "text-gray-500"
									}`}
								>
									▼
								</button>
							</div>
						</div>
					</th>
				))}
			</tr>
		</thead>
	)
}
