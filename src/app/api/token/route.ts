import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { MongoClient, ObjectId } from "mongodb"

// 환경 변수 설정 검증
const uri = process.env.MONGODB_URI
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string

if (!uri || !ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
	throw new Error(
		"환경 변수가 설정되지 않았습니다. MONGODB_URI, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET를 확인하세요.",
	)
}

// MongoDB 클라이언트 설정 (전역에서 재사용)
let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!global._mongoClientPromise) {
	client = new MongoClient(uri)
	global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

// Access Token 생성 함수
const generateAccessToken = (user: any): string => {
	return jwt.sign(
		{ email: user.email, role: user.role || "member", id: user._id },
		ACCESS_TOKEN_SECRET,
		{ expiresIn: "15m" }, // Access Token 유효 기간: 15분
	)
}

// Refresh Token 생성 함수
const generateRefreshToken = (user: any): string => {
	return jwt.sign(
		{ email: user.email, role: user.role || "member", id: user._id },
		REFRESH_TOKEN_SECRET,
		{ expiresIn: "7d" }, // Refresh Token 유효 기간: 7일
	)
}

export async function POST(request: Request) {
	try {
		const client = await clientPromise
		const db = client.db("PixcelCrew")
		const collection = db.collection("User")

		// 클라이언트에서 Refresh Token 가져오기
		const { refreshToken }: { refreshToken: string } = await request.json()

		if (!refreshToken) {
			return NextResponse.json(
				{ message: "Refresh Token이 제공되지 않았습니다." },
				{ status: 400 },
			)
		}

		// Refresh Token 검증
		let decoded
		try {
			decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as any // Refresh Token 디코딩
		} catch (error) {
			return NextResponse.json(
				{ message: "유효하지 않은 Refresh Token입니다." },
				{ status: 401 },
			)
		}

		// User 컬렉션에서 Refresh Token 확인
		const user = await collection.findOne({ _id: new ObjectId(decoded.id) })

		if (!user || user.refreshToken !== refreshToken) {
			return NextResponse.json(
				{ message: "유효하지 않은 Refresh Token입니다." },
				{ status: 401 },
			)
		}

		// 새로운 Access Token 및 Refresh Token 생성
		const newAccessToken = generateAccessToken(user)
		const newRefreshToken = generateRefreshToken(user)

		// 새 Refresh Token을 데이터베이스에 저장
		await collection.updateOne(
			{ _id: user._id },
			{ $set: { refreshToken: newRefreshToken } },
		)

		// Access Token과 Refresh Token을 응답에 포함
		const response = NextResponse.json({ accessToken: newAccessToken })

		response.cookies.set("accessToken", newAccessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: 15 * 60, // 15분 유효
			sameSite: "strict",
		})

		response.cookies.set("refreshToken", newRefreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: 7 * 24 * 60 * 60, // 7일 유효
			sameSite: "strict",
		})

		return response
	} catch (error) {
		console.error("토큰 재발급 중 오류 발생:", error)
		return NextResponse.json(
			{ message: "서버 오류가 발생했습니다." },
			{ status: 500 },
		)
	}
}
