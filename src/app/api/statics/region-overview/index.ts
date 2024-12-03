import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const API_URL = "https://apis.data.go.kr/B552115/PvAmountByLocHr/getPvAmountByLocHr";
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

    const response = await axios.get(API_URL, {
      params: {
        serviceKey: decodeURIComponent(API_KEY!),
        pageNo: 1,
        numOfRows: 384,
        dataType: "json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}