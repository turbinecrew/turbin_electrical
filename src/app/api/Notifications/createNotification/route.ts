import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

import { connectDB } from "@/app/api/mongodb"

export async function POST(req: Request) {
	try {
		const db = await connectDB()
		if (!db) {
			return NextResponse.json(
				{ message: "Database connection failed" },
				{ status: 500 },
			)
		}

		const { searchParams } = new URL(req.url)
		const userId = searchParams.get("userId")
		const type = searchParams.get("type")
		const title = searchParams.get("title")
		const message = searchParams.get("message")
		const content_link = searchParams.get("link")

		if (!userId || !type || !title || !message || !content_link) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 },
			)
		}
		// userId를 ObjectId로 변환
		let objectId: ObjectId
		try {
			objectId = new ObjectId(userId)
		} catch (error) {
			return NextResponse.json(
				{ message: "Invalid user ID format" },
				{ status: 400 },
			)
		}
		const collection = db.collection("Notifications")

		// 새로운 알림 데이터 생성
		const newNotification = {
			user_id: objectId,
			data: { type, title, message, content_link },
			is_read: false,
			created_at: new Date(),
			updated_at: null,
			deleted_at: null,
		}

		// 알림 저장
		const result = await collection.insertOne(newNotification)

		if (!result.acknowledged) {
			return NextResponse.json(
				{ message: "Failed to create notification" },
				{ status: 500 },
			)
		}

		return NextResponse.json(
			{ success: true, insertedId: result.insertedId },
			{ status: 201 },
		)
	} catch (error) {
		console.error("Error creating notification:", error)
		return NextResponse.json(
			{
				message: "Error creating notification",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		)
	}
}
