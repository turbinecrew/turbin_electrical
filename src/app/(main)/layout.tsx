import Header from "@/common/components/header"
import Sidebar from "@/common/components/sidebar"

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="flex h-screen">
			{/* Sidebar 영역 */}
			<aside className="h-full">
				<Sidebar />
			</aside>

			{/* 메인 영역 */}
			<div className="flex flex-1 flex-col">
				{/* Header */}
				<header>
					<Header />
				</header>

				{/* Main 콘텐츠 */}
				<main className="flex-1 overflow-auto">{children}</main>
			</div>
		</div>
	)
}
