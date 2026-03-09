import connectDb from "@/lib/db";
import userStorage from "@/models/user.storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ownerId, businessName, supportEmail, knowledge } = await req.json();

    if (!ownerId) {
      return NextResponse.json(
        { message: "ownerId is required" },
        { status: 400 }
      );
    }

    if (!businessName) {
      return NextResponse.json(
        { message: "businessName is required" },
        { status: 400 }
      );
    }

    if (!supportEmail) {
      return NextResponse.json(
        { message: "supportEmail is required" },
        { status: 400 }
      );
    }

    if (!knowledge) {
      return NextResponse.json(
        { message: "knowledge is required" },
        { status: 400 }
      );
    }

    await connectDb()
    const storage = await userStorage.findOneAndUpdate(
        {ownerId},
        { ownerId, businessName, supportEmail, knowledge },
        {new : true, upsert: true}
    )
    return NextResponse.json(storage)

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
