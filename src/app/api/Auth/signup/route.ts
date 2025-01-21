import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

// 환경 변수 설정

const MONGODB_URI = process.env.MONGODB_URI // 환경 변수에서 MONGODB_URI 가져오기
const JWT_SECRET = process.env.JWT_SECRET

let client: MongoClient

if (!global._mongoClientPromise) {
	client = new MongoClient(MONGODB_URI!)
	global._mongoClientPromise = client.connect()
}
const clientPromise: Promise<MongoClient> = global._mongoClientPromise

if (!JWT_SECRET) {
	throw new Error("JWT_SECRET 환경 변수가 설정되지 않았습니다.")
}

// JWT 생성 함수
const generateAccessToken = (user: any): string => {
	return jwt.sign(
		{ email: user.email, role: user.role || "member", id: user._id },
		JWT_SECRET, // JWT_SECRET은 이제 string으로 보장됨
		{ expiresIn: "1h" },
	)
}

export async function POST(request: Request) {
	try {
		// MongoDB 연결
		const client = await clientPromise // 비동기 연결 기다리기
		const db = client.db("PixcelCrew")
		const collection = db.collection("User")

		// 요청에서 데이터 가져오기
		const {
			email,
			password,
			businessName,
			businessNumber,
			businessOwner,
			businessAddress,
			role = "member", // 기본값을 "member"로 설정
		} = await request.json()

		// 필수 입력값 확인
		if (
			!email ||
			!password ||
			!businessName ||
			!businessNumber ||
			!businessOwner ||
			!businessAddress
		) {
			return NextResponse.json(
				{ message: "모든 필드를 입력해주세요." },
				{ status: 400 },
			)
		}

		// 이메일 중복 확인
		const existingUser = await collection.findOne({ email })
		if (existingUser) {
			return NextResponse.json(
				{ message: "이미 가입된 이메일입니다." },
				{ status: 409 },
			)
		}

		// 사업자 번호 중복 확인
		const existingBusiness = await collection.findOne({ businessNumber })
		if (existingBusiness) {
			return NextResponse.json(
				{ message: "이미 등록된 사업자번호입니다." },
				{ status: 409 },
			)
		}

		// 비밀번호 암호화
		const SALT_ROUNDS = 10
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

		// 사용자 데이터 저장
		const newUser = {
			email,
			password: hashedPassword,
			businessName,
			businessNumber,
			businessOwner,
			businessAddress,
			role, // 역할 추가
			createdAt: new Date(),
			updatedAt: new Date(),
		}

		await collection.insertOne(newUser)

		// JWT 생성
		const token = generateAccessToken(newUser)

		// 쿠키에 JWT 저장
		const response = NextResponse.json(
			{ message: "회원가입이 완료되었습니다." },
			{ status: 201 },
		)
		response.cookies.set("accessToken", token, {
			httpOnly: true, // 클라이언트에서 접근 불가
			secure: process.env.NODE_ENV === "production", // HTTPS 환경에서만 전송
			path: "/",
			maxAge: 60 * 60, // 1시간 동안 유효
			sameSite: "strict", // CSRF 방지
		})

		return response
	} catch (error) {
		console.error("Error during registration:", error)
		return NextResponse.json(
			{ message: "서버 오류가 발생했습니다." },
			{ status: 500 },
		)
	}
}
