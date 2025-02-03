import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

import { connectDB } from "@/app/api/mongodb"

export async function PATCH(req: Request) {
	try {
		const db = await connectDB()
		if (!db) {
			return NextResponse.json(
				{ message: "AMGO_Database connection failed" },
				{ status: 500 },
			)
		}

		const { searchParams } = new URL(req.url)
		const id = searchParams.get("id")

		if (!id) {
			return NextResponse.json(
				{ message: "Missing notification ID" },
				{ status: 400 },
			)
		}

		const collection = db.collection("Notifications")

		// 기존 알림 조회
		const notification = await collection.findOne({ _id: new ObjectId(id) })

		if (!notification) {
			return NextResponse.json(
				{ message: "Notification not found" },
				{ status: 404 },
			)
		}

		// is_read 상태 토글
		const updatedStatus = !notification.is_read

		await collection.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: { is_read: updatedStatus } },
		)

		return NextResponse.json(
			{ success: true, is_read: updatedStatus },
			{ status: 200 },
		)
	} catch (error) {
		console.error("Error updating notification:", error)
		return NextResponse.json(
			{
				message: "Error updating notification",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		)
	}
}
