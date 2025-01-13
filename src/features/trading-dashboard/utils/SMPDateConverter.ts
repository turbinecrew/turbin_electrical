export const TodaySMPDateConverter = (dateString: string): Date => {
	const today = new Date() // 현재 날짜를 기준으로
	const dayPattern = /(\d{1,2})일 (\d{1,2})시/ // "10일 01시" 포맷을 찾는 정규 표현식
	const matches = dateString.match(dayPattern)

	if (matches) {
		const day = parseInt(matches[1], 10) // 일자 추출
		const hour = parseInt(matches[2], 10) // 시간 추출

		// 현재 날짜에 해당 일자와 시간을 설정하여 새로운 Date 객체 생성
		today.setDate(day)
		today.setHours(hour)
		today.setMinutes(0)
		today.setSeconds(0)
		today.setMilliseconds(0)

		return today
	}
	return new Date(dateString)
}

export const WeeklySMPDateConverter = (dateString: string): Date => {
	// "20250103" 형식의 문자열을 "2025-01-03" 형식으로 변환
	const formattedDate = new Date(
		dateString.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"),
	)

	// 변환된 문자열을 Date 객체로 생성
	return new Date(formattedDate.setHours(0, 1, 0, 0))
}
