import { axiosInstance } from "@/config/axios"

export async function fetchRegionData() {
	const response = await axiosInstance.get(
		"/PvAmountByLocHr/getPvAmountByLocHr",
		{
			params: {
				serviceKey: decodeURIComponent(process.env.NEXT_PUBLIC_API_KEY!),
				pageNo: 1,
				numOfRows: 384,
				dataType: "json",
			},
		},
	)
	return response.data
}
