import connectDb from "@/lib/db";
import userStorage from "@/models/user.storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {

    const ownerId = req.nextUrl.searchParams.get("ownerId");

    if (!ownerId) {
      return NextResponse.json(
        { message: "ownerId is required" },
        { status: 400 }
      );
    }

    await connectDb();

    const storage = await userStorage.findOne({ ownerId });

    if (!storage) {
      return NextResponse.json(
        { message: "User storage not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(storage, { status: 200 });

  } catch (error) {

    console.error("GET /api/userStorage error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}