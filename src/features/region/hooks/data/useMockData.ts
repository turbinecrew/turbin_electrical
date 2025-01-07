import { useState, useEffect } from "react"

export function useMockData<T>(mockData: T[]) {
	const [data, setData] = useState<T[]>([]) // 빈 배열로 초기화
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setData(mockData)
			setIsLoading(false)
		}, 1000)

		return () => clearTimeout(timer)
	}, [mockData])

	return { data, isLoading }
}
