import type { Db } from "mongodb"
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

const uri: string = process.env.MONGODB_URI || "default-uri"

let client: MongoClient | null = null
let database: Db | null = null

async function connectDB(): Promise<Db> {
	if (!client) {
		client = new MongoClient(uri)
		await client.connect()
		database = client.db("PixcelCrew")
	}
	if (!database) {
		throw new Error("데이터베이스 연결에 실패했습니다.")
	}
	return database
}

export async function GET() {
	try {
		const db = await connectDB()
		const collection = db.collection("amgo")
		const data = await collection.find({}).toArray()

		return NextResponse.json(data, { status: 200 })
	} catch (err) {
		console.error("AMGO 데이터 조회 실패:", err)
		return NextResponse.json(
			{
				message: "서버 오류 발생",
				error: err instanceof Error ? err.message : "Unknown error",
			},
			{ status: 500 },
		)
	}
}
