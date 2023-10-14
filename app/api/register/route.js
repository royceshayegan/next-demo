import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/lib/models/user";
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);    
    console.log("username: ", username);
    console.log("password: ", password);

    await connectMongoDB();
    await User.create({username, password: hashedPassword});

    return NextResponse.json({ message: "User created.", status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: "An error occured while creating the user.",
      status: 500,
    });
  }
}
