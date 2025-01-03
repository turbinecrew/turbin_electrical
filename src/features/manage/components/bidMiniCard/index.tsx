import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/shadcn/components/card"

export default function bidMiniCard() {
	const cardData = [
		{ title: "전력 생산량", value: "500 kW", change: "+5%", total: "1000 kW" },
		{ title: "총 수익", value: "$150,000", change: "-3%", total: "$300,000" },
		{ title: "입찰 요청 수", value: "10 건", change: "+5%", total: "200 건" },
		{ title: "승인율", value: "92%", change: "-3%", total: "95%" },
	]

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			{cardData.map((item, index) => (
				<Card key={index}>
					<CardHeader>
						<CardTitle className="text-gray-500">{item.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">{item.value}</p>
						<p
							className={`mt-1 text-sm ${item.change.startsWith("+") ? "text-red-500" : "text-blue-500"}`}
						>
							{item.change}
						</p>
						<p className="mt-1 text-gray-500">총 누적 {item.total}</p>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
