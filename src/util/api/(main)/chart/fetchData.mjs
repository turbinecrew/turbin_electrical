"use server"
import fetch from "node-fetch" // fetch 사용
import jsdom from "jsdom" // HTML 파싱용 jsdom
const { JSDOM } = jsdom

// 크롤링할 URL
const url =
	"https://epsis.kpx.or.kr/epsisnew/selectEkmaSmpShdChart.do?menuId=040202"

// 오늘 날짜 계산
const today = new Date().getDate() + "일" // 예: "14일"

// 데이터 가져오기 함수
export default async function getChartData() {
	try {
		// HTTP GET 요청
		const response = await fetch(url)

		if (!response.ok) {
			throw new Error(`HTTP 요청 실패: ${response.status}`)
		}

		// HTML 콘텐츠 가져오기
		const htmlContent = await response.text()

		// HTML 파싱
		const dom = new JSDOM(htmlContent)
		const scripts = [...dom.window.document.querySelectorAll("script")] // 모든 <script> 태그 가져오기

		// chartData.push 데이터 찾기 위한 정규식
		const chartDataPattern = /chartData\.push\(\{.*?\}\);/g
		let chartDataLines = []

		// 스크립트 태그에서 데이터 추출
		scripts.forEach((script) => {
			const scriptContent = script.textContent
			if (scriptContent) {
				const matches = scriptContent.match(chartDataPattern)
				if (matches) {
					chartDataLines = chartDataLines.concat(matches)
				}
			}
		})

		// 오늘 날짜 데이터만 필터링
		const todayData = chartDataLines.filter((line) => line.includes(today))

		// JSON 변환
		const jsonData = todayData.map((line) =>
			JSON.parse(line.replace("chartData.push(", "").replace(");", "")),
		)

		// 현재 연도와 월 가져오기
		const currentYear = new Date().getFullYear()
		const currentMonth = new Date().getMonth() + 1 // getMonth()는 0부터 시작하므로 1을 더합니다.

		// JSON 변환 부분 수정
		const jsonNewData = todayData.map((line) => {
			const data = JSON.parse(
				line.replace("chartData.push(", "").replace(");", ""),
			)

			// 날짜 문자열 파싱
			const [day, hour] = data.Date.split(" ")
			const dayNumber = parseInt(day)

			// 새로운 Date 객체 생성
			const date = new Date(
				currentYear,
				currentMonth - 1,
				dayNumber,
				parseInt(hour),
			)

			// 날짜를 원하는 형식으로 포맷팅
			const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:00`

			return { ...data, Date: formattedDate }
		})

		return jsonNewData
	} catch (error) {
		console.error("오류 발생:", error.message)
	}
}
