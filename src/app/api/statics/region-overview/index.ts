import axios from "axios"

export async function GetRegionOverviewStatics() {
    const API_URL =
        "https://apis.data.go.kr/B552115/PvAmountByLocHr/getPvAmountByLocHr"
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY
    try {
        const response = await axios.get(API_URL, {
            params: {
                serviceKey: decodeURIComponent(API_KEY!),
                pageNo: 1,
                numOfRows: 384,
                dataType: "json",
            },
        })

        return response.data
    } catch (error) {
        return console.error("API Route Error:", error)
    }
}