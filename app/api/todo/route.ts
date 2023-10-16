import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/lib/models/user";

export async function POST(req: NextRequest) {
  try {
    const { description, date } = await req.json();
    await connectMongoDB();

    return NextResponse.json({ message: "User created.", status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: "An error occured while creating the user.",
      status: 500,
    });
  }
}
