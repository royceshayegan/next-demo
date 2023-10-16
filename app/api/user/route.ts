import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/lib/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  
  try {
    const { username, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({
      username,
      password: hashedPassword,
      preferredTheme: "default",
      tasks: [],
    });

    return NextResponse.json({ message: "User created.", status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: "An error occured while creating the user.",
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const params = await req.nextUrl.searchParams;
    const username = params.get('username');
    const user = await User.findOne({ username }).select("_id");
    return NextResponse.json({user});
  } catch (error) {
    return NextResponse.json({error: error});
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectMongoDB();
    const params = await req.nextUrl.searchParams;
    const newTheme = await req.json();
    const username = params.get('username');
    const user = await User.findOne({ username });
    if (user) {
      user.preferredTheme = newTheme.theme;
      await user.save();
    }
    return NextResponse.json({message: 'user updated', status: 200 });
  } catch (error) {
    return NextResponse.json({error: error});
  }
}