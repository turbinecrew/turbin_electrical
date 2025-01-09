import mockData from "@/features/region/components/regionaltable/mock"

export const chartData = mockData.map((item) => ({
	date: item.시간,
	지역: item.지역,
	"일사량(W/㎡)": item["일사량(W/㎡)"],
	"기온(℃)": item["기온(℃)"],
	"풍속(㎧)": item["풍속(㎧)"],
}))
