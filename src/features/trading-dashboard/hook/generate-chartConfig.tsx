import type { ChartConfig } from "@/shadcn/components/chart"

type ChartPT = {
	data: Record<string, unknown>[]
}

export function generateChartConfig({ data }: ChartPT): ChartConfig {
	const config: ChartConfig = {}
	const colors = [
		"hsl(var(--chart-1))",
		"hsl(var(--chart-2))",
		"hsl(var(--chart-3))",
		"hsl(var(--chart-4))",
	]

	Object?.keys(data[0])?.forEach((key, index) => {
		if (key !== "date") {
			config[key] = {
				label: key,
				color: colors[index - 1] || `hsl(${Math.random() * 360}, 70%, 50%)`,
			}
		}
	})

	return config
}
