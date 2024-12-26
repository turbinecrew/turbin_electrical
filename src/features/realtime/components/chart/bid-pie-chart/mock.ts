export const chartData = [
	{ type: "pending", number: 18, fill: "var(--color-pending)" },
	{ type: "approved", number: 7, fill: "var(--color-approved)" },
	{ type: "denied", number: 3, fill: "var(--color-denied)" },
]
export const chartConfig = {
	number: {
		label: "number",
	},
	pending: {
		label: "대기중",
		color: "#394235",
	},
	matched: {
		label: "매칭완료",
		color: "#72BF2C",
	},
}
