import { NextResponse } from "next/server"

import { connectDB } from "@/app/api/mongodb"

export async function PATCH(req: Request) {
	try {
		const db = await connectDB()
		if (!db) {
			return NextResponse.json(
				{ message: "Database connection failed" },
				{ status: 500 },
			)
		}

		const collection = db.collection("Notifications")

		const { searchParams } = new URL(req.url)
		const status = searchParams.get("status")

		if (!status) {
			return NextResponse.json(
				{ message: "Missing notification status" },
				{ status: 400 },
			)
		}

		// 모든 알림의 is_read 상태를 status(true/false)으로 변경 (boolean으로 저장)
		const updatedStatus = status === "true"

		// 모든 알림의 is_read를 true로 업데이트
		const result = await collection.updateMany(
			{ deleted_at: null }, // 삭제되지 않은 알림만 업데이트
			{ $set: { updated_at: new Date(), is_read: updatedStatus } },
		)

		if (result.modifiedCount === 0) {
			return NextResponse.json(
				{ message: "No notifications were updated" },
				{ status: 404 },
			)
		}

		return NextResponse.json(
			{ success: true, modifiedCount: result.modifiedCount },
			{ status: 200 },
		)
	} catch (error) {
		console.error("Error updating notifications:", error)
		return NextResponse.json(
			{
				message: "Error updating notifications",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		)
	}
}
