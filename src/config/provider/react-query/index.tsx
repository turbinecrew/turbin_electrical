"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { useState } from "react"

// QueryProvider Props 정의
type QueryProviderProps = {
	children: ReactNode
}

// QueryProvider 컴포넌트 구현
export default function QueryProvider({ children }: QueryProviderProps) {
	// QueryClient 인스턴스를 상태로 관리 (Hot Reload 방지)
	const [queryClient] = useState(() => new QueryClient())

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
