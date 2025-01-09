import Header from "@/common/components/header"
import Sidebar from "@/common/components/sidebar"

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="flex h-screen">
			<aside className="h-full">
				<Sidebar />
			</aside>

			<div className="flex flex-1 flex-col">
				<header>
					<Header />
				</header>

				<main className="flex-1 overflow-auto">{children}</main>
			</div>
		</div>
	)
}
