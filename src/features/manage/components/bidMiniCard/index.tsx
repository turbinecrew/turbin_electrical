import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/shadcn/components/card"

export default function BidMiniCard() {
	const cardData = [
		{ title: "전력 생산량", value: "500 kW", change: "+5%", total: "1000 kW" },
		{ title: "총 수익", value: "$150,000", change: "-3%", total: "$300,000" },
		{ title: "입찰 요청 수", value: "10 건", change: "+5%", total: "200 건" },
		{ title: "승인율", value: "92%", change: "-3%", total: "95%" },
	]

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			{cardData.map((item, idx) => (
				<Card
					key={idx}
					className="shadow-md transition-transform hover:scale-105 hover:shadow-lg"
				>
					<CardHeader className="rounded-t-md border-b bg-gray-50 px-4 py-3">
						<CardTitle className="text-lg font-medium text-gray-600">
							{item.title}
						</CardTitle>
					</CardHeader>
					<CardContent className="p-6 text-center">
						<p className="text-3xl font-semibold text-gray-800">{item.value}</p>
						<p
							className={`mt-2 text-sm font-medium ${
								item.change.startsWith("+") ? "text-green-500" : "text-red-500"
							}`}
						>
							{item.change}
						</p>
						<p className="mt-3 text-sm text-gray-500">총 누적 {item.total}</p>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
