import Header from "@/components/custom/header"
import Sidebar from "@/components/custom/sidebar"

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div>
			<Header />
			<Sidebar />
			<div>{children}</div>
		</div>
	)
}
