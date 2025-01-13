import { fetchTodayRECData } from "../api/fetchTodayRECData"
import { fetchPastRECData } from "../api/fetchPastRECData"
import { useQuery } from "@tanstack/react-query"

type TRECChartData = {
	_id: { $oid: string }
	date: string
	volume?: number
	trade_volume?: number
	average_price?: number
	highest_price?: number
	lowest_price?: number
	closing_price?: number
}[]

// `processRECData`는 데이터를 처리하는 함수로, 데이터를 반환함
const processRECData = (data: any[]) => {
	return data.map((item, idx) => {
		const date = new Date(item.date)
		const rec = item.average_price ? item.average_price : item.value

		return {
			date, // Date 객체로 변환된 날짜
			rec, // value 설정 (average_price를 사용하거나 기존 value 사용)
		}
	})
}

// `useRECChartData` 훅
export function useRECChartData() {
	// `useQuery`에서 `fetchPastRECData`와 `fetchTodayRECData`를 동시에 호출하고 결과를 병합
	const { data, isLoading, isError } = useQuery({
		queryKey: ["recData"],
		queryFn: async () => {
			// `fetchPastRECData`와 `fetchTodayRECData`를 동시에 호출
			const [pastData, todayData] = await Promise.all([
				fetchPastRECData(),
				fetchTodayRECData(),
			])

			// 데이터를 처리하고 정렬 후 반환
			const processedPastData = processRECData(pastData || [])
			const processedTodayData = processRECData(todayData || [])

			// 두 데이터를 합치고 정렬 후 상위 100개 반환
			const mergeAndSortData = [...processedPastData, ...processedTodayData]
				.sort((a, b) => b.date.getTime() - a.date.getTime())
				.slice(0, 100)

			return mergeAndSortData
		},
		staleTime: 1000 * 60 * 5, // 캐시의 유효 시간을 5분으로 설정
		retry: 3, // 실패 시 최대 3번 재시도
	})

	return {
		data,
		isLoading,
		isError,
	}
}
