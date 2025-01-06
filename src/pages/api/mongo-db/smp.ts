import { MongoClient } from "mongodb"
import type { Db } from "mongodb"
import type { NextApiRequest, NextApiResponse } from "next"

// MongoDB Atlas 연결 URI (appName 옵션을 빼봄)
const uri =
	"mongodb://admin:pixcelcrew12345@pixelcrew.5xtd5.mongodb.net/PixcelCrew?retryWrites=true&w=majority"

let client: MongoClient | null = null
let database: Db | null = null

// MongoDB 연결 함수
async function connectDB() {
	if (!client) {
		client = new MongoClient(uri)
		await client.connect()
		database = client.db("PixcelCrew") // "PixcelCrew" 데이터베이스로 연결
	}
	return database
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const db = await connectDB()
		if (!db) {
			return res.status(500).json({ message: "SMP_Database connection failed" })
		}

		const collection = db.collection("SMP_CSV") // "SMP_CSV" 컬렉션 선택
		const data = await collection.find({}).toArray() // 데이터를 조회

		res.status(200).json(data) // 조회된 데이터를 응답
	} catch (err: unknown) {
		// 'unknown' 타입으로 처리
		console.error("SMP_CSV 데이터 조회 실패", err)
		res.status(500).json({
			message: "서버 오류 발생",
			error: err instanceof Error ? err.message : "Unknown error",
		})
	}
}
