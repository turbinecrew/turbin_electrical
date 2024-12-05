import Header from "@/components/custom/header"

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div>
			<Header />
			<div>{children}</div>
		</div>
	)
}
