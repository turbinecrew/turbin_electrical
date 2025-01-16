import { NextResponse } from "next/server"

import { connectDB } from "@/app/api/mongodb"

export async function GET() {
	try {
		const db = await connectDB()
		if (!db) {
			return NextResponse.json(
				{ message: "AMGO_Database connection failed" },
				{ status: 500 },
			)
		}
		const collection = db.collection("predict_amgo")
		const data = await collection.find({}).toArray()

		return NextResponse.json(data, { status: 200 })
	} catch (err) {
		// 에러 처리
		console.error("발전량 데이터 조회 실패", err)
		return NextResponse.json(
			{
				message: "서버 오류 발생",
				error: err instanceof Error ? err.message : "Unknown error",
			},
			{ status: 500 },
		)
	}
}
