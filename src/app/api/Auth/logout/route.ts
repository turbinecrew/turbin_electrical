import type { JwtPayload } from "jsonwebtoken"
import jwt, { TokenExpiredError } from "jsonwebtoken"
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"
//Acess Token 검증 함수 추가 필요

// 환경 변수 설정 검증
const uri = process.env.MONGODB_URI
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

async function verifyToken(
	token: string,
	secret: string,
	tokenType: string,
): Promise<JwtPayload> {
	try {
		return jwt.verify(token, secret) as JwtPayload
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			throw new Error(`TokenExpiredError: ${tokenType}`)
		} else {
			throw new Error(`InvalidTokenError: ${tokenType}`)
		}
	}
}

if (!uri || !ACCESS_TOKEN_SECRET) {
	throw new Error(
		"환경 변수가 설정되지 않았습니다. MONGODB_URI와 ACCESS_TOKEN_SECRET를 확인하세요.",
	)
}

// MongoDB 클라이언트 설정 (전역에서 재사용)
let client: MongoClient

if (!global._mongoClientPromise) {
	client = new MongoClient(uri)
	global._mongoClientPromise = client.connect()
}
const clientPromise: Promise<MongoClient> = global._mongoClientPromise

export async function DELETE(request: Request) {
	try {
		const client = await clientPromise
		const db = client.db("PixcelCrew")
		const collection = db.collection("User")

		// 쿠키에서 Access Token 가져오기
		const cookieHeader = request.headers.get("cookie")
		if (!cookieHeader) {
			return NextResponse.json(
				{ message: "쿠키가 제공되지 않았습니다." },
				{ status: 400 },
			)
		}

		const cookies = Object.fromEntries(
			cookieHeader.split("; ").map((c) => c.split("=")),
		)
		const accessToken = cookies["accessToken"]

		if (!accessToken) {
			return NextResponse.json(
				{ message: "엑세스 토큰이 없습니다." },
				{ status: 403 },
			)
		}

		// Access Token 검증 및 이메일 추출
		const { email } = await verifyToken(
			accessToken,
			ACCESS_TOKEN_SECRET!,
			"accessToken",
		)

		// 데이터베이스에서 사용자 정보 업데이트
		const result = await collection.updateOne(
			{ email },
			{ $unset: { refreshToken: "" } }, // Refresh Token 필드 제거
		)

		if (result.matchedCount === 0) {
			return NextResponse.json(
				{ message: `해당 이메일(${email})을 가진 사용자를 찾을 수 없습니다.` },
				{ status: 404 },
			)
		}

		// 클라이언트 쿠키 삭제
		const response = NextResponse.json(
			{ message: `로그아웃 처리되었습니다.` },
			{ status: 200 },
		)

		response.cookies.set("refreshToken", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 0, // 쿠키 만료
			path: "/",
		})

		response.cookies.set("accessToken", "", {
			maxAge: 0, // 쿠키 만료
			path: "/",
		})

		return response
	} catch (error: any) {
		// Access Token 만료 에러 처리
		if (error.message.startsWith("TokenExpiredError")) {
			return NextResponse.json({ message: "Token Expired" }, { status: 401 })
		}

		// 기타 서버 오류 처리
		return NextResponse.json(
			{ message: "서버 오류가 발생했습니다." },
			{ status: 500 },
		)
	}
}
