import { ChartConfig } from "@/components/ui/chart"

export const chartData = [
	{ date: "2024-09-01", smp: 220, rec: 130 },
	{ date: "2024-09-02", smp: 125, rec: 235 },
	{ date: "2024-09-03", smp: 190, rec: 240 },
	{ date: "2024-09-04", smp: 115, rec: 320 },
	{ date: "2024-09-05", smp: 218, rec: 225 },
	{ date: "2024-09-06", smp: 123, rec: 232 },
	{ date: "2024-09-07", smp: 128, rec: 138 },
	{ date: "2024-09-08", smp: 222, rec: 129 },
	{ date: "2024-09-09", smp: 127, rec: 137 },
	{ date: "2024-09-10", smp: 124, rec: 233 },
]

export const chartConfig: ChartConfig = {
	rec: {
		label: "rec",
		color: "hsl(var(--chart-1))",
	},
	smp: {
		label: "smp",
		color: "hsl(var(--chart-2))",
	},
}
