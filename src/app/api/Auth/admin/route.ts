import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

// JWT_SECRET 설정 (환경 변수로 관리하는 것이 좋습니다)
const JWT_SECRET = "pixelcrew12345" // 실제로는 환경변수로 관리하는 것이 좋습니다

// JWT에서 반환되는 객체 타입 정의
interface CustomJwtPayload {
	email: string
	role: string
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

		// JWT 검증
		try {
			const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload

			// 이메일 확인
			if (!decoded.email) {
				return NextResponse.json(
					{ authenticated: false, message: "유효하지 않은 이메일 정보입니다." },
					{ status: 403 },
				)
			}

			// 관리자인지 확인
			if (decoded.role !== "admin") {
				return NextResponse.json(
					{ authenticated: false, message: "관리자 권한이 필요합니다." },
					{ status: 403 },
				)
			}

			// 관리자인 경우 대시보드 정보 제공
			return NextResponse.json(
				{
					authenticated: true,
					email: decoded.email,
					message: "관리자 대시보드에 오신 것을 환영합니다.",
				},
				{ status: 200 },
			)
		} catch (error) {
			return NextResponse.json(
				{ authenticated: false, message: "유효하지 않은 토큰입니다." },
				{ status: 401 },
			)
		}
	} catch (error) {
		console.error("Error during auth status check:", error)
		return NextResponse.json(
			{ authenticated: false, message: "서버 오류가 발생했습니다." },
			{ status: 500 },
		)
	}
}
