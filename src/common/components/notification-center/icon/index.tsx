"use client"
import {
	User,
	Bell,
	ClipboardX,
	ClipboardCheck,
	LockKeyhole,
	Map,
	TriangleAlert,
	AlarmClock,
	ChartCandlestick,
} from "lucide-react"

const alertIconFormat = [
	{ type: "warnig", icon: TriangleAlert },
	{ type: "alram", icon: AlarmClock },
	{ type: "regionPage", icon: Map },
	{ type: "user", icon: User },
	{ type: "tradingConfirm", icon: ClipboardCheck },
	{ type: "tradingPage", icon: ChartCandlestick },
	{ type: "security", icon: LockKeyhole },
	{ type: "tradingDeny", icon: ClipboardX },
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
