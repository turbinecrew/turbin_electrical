import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

const uri = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

if (!uri || !JWT_SECRET) {
	throw new Error(
		"환경 변수가 설정되지 않았습니다. MONGODB_URI와 JWT_SECRET를 확인하세요.",
	)
}

let client: MongoClient

if (!global._mongoClientPromise) {
	client = new MongoClient(uri)
	global._mongoClientPromise = client.connect()
}
const clientPromise: Promise<MongoClient> = global._mongoClientPromise

const generateAccessToken = (user: any): string => {
	return jwt.sign(
		{ email: user.email, role: user.role || "member", id: user._id },
		JWT_SECRET,
		{ expiresIn: "15m" },
	)
}

const generateRefreshToken = (user: any): string => {
	return jwt.sign(
		{ email: user.email, role: user.role || "member", id: user._id },
		JWT_SECRET,
		{ expiresIn: "7d" },
	)
}

export async function POST(request: Request) {
	try {
		const requestData = await request.json()
		console.log("서버로 수신된 데이터:", requestData)

		const { email, password }: { email: string; password: string } = requestData

		if (
			!email ||
			!password ||
			typeof email !== "string" ||
			typeof password !== "string"
		) {
			console.error("유효하지 않은 데이터 형식:", requestData)
			return NextResponse.json(
				{ message: "유효한 이메일과 비밀번호를 입력해주세요." },
				{ status: 400 },
			)
		}

		const client = await clientPromise
		const db = client.db("PixcelCrew")
		const collection = db.collection("User")

		const user = await collection.findOne({ email })
		if (!user) {
			console.error("사용자가 존재하지 않습니다:", email)
			return NextResponse.json(
				{ message: "사용자가 존재하지 않습니다." },
				{ status: 404 },
			)
		}

		if (!user.password || typeof user.password !== "string") {
			console.error("DB에 저장된 비밀번호가 유효하지 않습니다:", user.password)
			return NextResponse.json(
				{ message: "서버에 저장된 사용자 정보가 손상되었습니다." },
				{ status: 500 },
			)
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			console.error("비밀번호가 일치하지 않습니다:", email)
			return NextResponse.json(
				{ message: "비밀번호가 올바르지 않습니다." },
				{ status: 401 },
			)
		}

		const accessToken = generateAccessToken(user)
		const refreshToken = generateRefreshToken(user)

		await collection.updateOne(
			{ _id: user._id },
			{ $set: { refreshToken, updatedAt: new Date() } },
		)

		const response = NextResponse.json({ message: "로그인 성공" })
		response.cookies.set("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: 15 * 60,
			sameSite: "strict",
		})
		response.cookies.set("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: 7 * 24 * 60 * 60,
			sameSite: "strict",
		})

		return response
	} catch (error: any) {
		console.error("로그인 중 오류 발생:", error.message || error)
		return NextResponse.json(
			{ message: "서버 오류가 발생했습니다." },
			{ status: 500 },
		)
	}
}
