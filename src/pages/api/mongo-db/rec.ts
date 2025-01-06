import type { Db } from "mongodb"
import { MongoClient } from "mongodb"
import type { NextApiRequest, NextApiResponse } from "next"

const uri =
	"mongodb+srv://admin:pixcelcrew12345@pixelcrew.5xtd5.mongodb.net/?retryWrites=true&w=majority"

let client: MongoClient | null = null
let database: Db | null = null

// MongoDB 연결 함수
async function connectDB() {
	if (!client) {
		client = new MongoClient(uri)
		await client.connect()
		database = client.db("PixcelCrew")
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
			return res.status(500).json({ message: "REC_Database connection failed" })
		}

		const collection = db.collection("REC_CSV")

		const data = await collection.find({}).toArray()
		res.status(200).json(data)
	} catch (err: unknown) {
		// 'unknown' 타입으로 처리
		console.error("REC_CSV 데이터 조회 실패", err)
		res.status(500).json({
			message: "서버 오류 발생",
			error: err instanceof Error ? err.message : "Unknown error",
		})
	}
}
