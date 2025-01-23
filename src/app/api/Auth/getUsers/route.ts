import jwt from "jsonwebtoken"
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"
// 환경 변수 설정
const JWT_SECRET = process.env.JWT_SECRET // 환경 변수에서 JWT_SECRET 가져오기
const MONGODB_URI = process.env.MONGODB_URI // 환경 변수에서 MONGODB_URI 가져오기

// MongoDB 클라이언트 초기화
const client = new MongoClient(MONGODB_URI!)

// CustomJwtPayload 타입 정의
interface CustomJwtPayload {
	email: string
	id: string
}

export async function GET(request: Request) {
	try {
		// 쿠키에서 JWT 가져오기
		const cookieHeader = request.headers.get("cookie")
		if (!cookieHeader) {
			return NextResponse.json(
				{ authenticated: false, message: "쿠키가 제공되지 않았습니다." },
				{ status: 401 },
			)
		}

		const cookies = Object.fromEntries(
			cookieHeader.split("; ").map((c) => c.split("=")),
		)
		const token = cookies["accessToken"]
		if (!token) {
			return NextResponse.json(
				{ authenticated: false, message: "토큰이 없습니다." },
				{ status: 401 },
			)
		}

		// JWT 검증 및 디코딩
		const decoded = jwt.verify(token, JWT_SECRET!) as CustomJwtPayload

		// MongoDB에서 로그인된 사용자 정보 가져오기
		await client.connect()
		const db = client.db("PixcelCrew")
		const collection = db.collection("User")

		// 로그인된 사용자 정보 가져오기
		const user = await collection.findOne({ email: decoded.email })

		if (!user) {
			return NextResponse.json(
				{ authenticated: false, message: "사용자를 찾을 수 없습니다." },
				{ status: 404 },
			)
		}

		// 로그인된 사용자 정보 반환
		return NextResponse.json(
			{ authenticated: true, message: "사용자 정보", user: user },
			{ status: 200 },
		)
	} catch (error) {
		console.error("Error during auth status check:", error)
		return NextResponse.json(
			{ authenticated: false, message: "유효하지 않은 토큰입니다." },
			{ status: 401 },
		)
	}
}
