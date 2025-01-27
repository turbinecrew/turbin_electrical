export function getTodayString(
	format: "YYYY-MM-DD" | "MM/DD/YYYY" = "YYYY-MM-DD",
): string {
	const date = new Date()
	if (format === "YYYY-MM-DD") {
		return date.toISOString().split("T")[0]
	}
	const month = String(date.getMonth() + 1).padStart(2, "0")
	const day = String(date.getDate()).padStart(2, "0")
	const year = date.getFullYear()
	return `${month}/${day}/${year}`
}

export function formatMonthDay(dateString: string): string {
	const parts = dateString.split("-")
	if (parts.length < 3) {
		throw new Error("Invalid date format. Expected 'YYYY-MM-DD'")
	}
	const [year, month, day] = parts.map(Number)
	return `${year}년 ${month}월 ${day}일`
}
