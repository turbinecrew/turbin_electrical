import type { Db } from "mongodb"
import { MongoClient } from "mongodb"

const uri: string | undefined = process.env.MONGODB_URI

let client: MongoClient | null = null
let database: Db | null = null

// MongoDB 연결 함수
export async function connectDB() {
	if (!uri) {
		console.error("MongoDB URI가 설정되지 않았습니다.")
		throw new Error("MONGODB_URI가 undefined입니다. 환경 변수를 확인하세요.")
	}
	if (!client) {
		client = new MongoClient(uri)
		await client.connect()
		database = client.db("PixcelCrew")
	}
	return database
}
