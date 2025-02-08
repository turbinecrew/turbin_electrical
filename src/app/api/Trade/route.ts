import { NextResponse } from "next/server"

import { connectDB } from "@/app/api/mongodb"

// GET 요청 처리
export async function GET() {
	try {
		// 데이터베이스 연결
		const db = await connectDB()
		if (!db) {
			return NextResponse.json(
				{ message: "AMGO_Database connection failed" },
				{ status: 500 },
			)
		}
		const collection = db.collection("Trade") // 컬렉션 선택
		const data = await collection.find({}).toArray() // 모든 문서 조회

		// 성공적으로 데이터를 JSON으로 반환
		return NextResponse.json(data, { status: 200 })
	} catch (err) {
		// 오류 발생 시 응답
		console.error("MongoDB 조회 오류:", err)
		return NextResponse.json(
			{
				message: "서버 오류 발생",
				error: err instanceof Error ? err.message : "Unknown error",
			},
			{ status: 500 },
		)
	}
}
