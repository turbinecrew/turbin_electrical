"use client"
import {
	Home,
	User,
	Bell,
	TrendingUp,
	TrendingDown,
	ClipboardCheck,
	LockKeyhole,
	Map,
	TriangleAlert,
	AlarmClock,
	Settings,
	ChartCandlestick,
} from "lucide-react"

const alertIconFormat = [
	{ type: "warnig", icon: TriangleAlert },
	{ type: "alram", icon: AlarmClock },
	{ type: "region page", icon: Map },
	{ type: "user", icon: User },
	{ type: "priceUp", icon: TrendingUp },
	{ type: "priceDown", icon: TrendingDown },
	{ type: "tradingConfirm", icon: ClipboardCheck },
	{ type: "tradingPage", icon: ChartCandlestick },
	{ type: "security", icon: LockKeyhole },
	{ type: "setting", icon: Settings },
	{ type: "home", icon: Home },
]

type IconFormatterPT = {
	type: string
	size?: number
	children?: React.ReactNode
}

export function IconFormatter({ type, size = 20, children }: IconFormatterPT) {
	let IconComponent = alertIconFormat.find((item) => item.type === type)?.icon
	if (IconComponent == null) {
		IconComponent = Bell
	}
	return (
		<div
			className={
				"translate h-fit w-fit rounded-3xl bg-tbPastelGreen px-2 py-3 group-hover:bg-white"
			}
		>
			<IconComponent
				size={size}
				className="transition-colors group-hover:text-tbGreen"
			/>
			{children}
		</div>
	)
}
