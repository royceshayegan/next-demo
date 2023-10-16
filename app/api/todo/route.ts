import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import {config} from '@/lib/auth';
import User from "@/lib/models/user";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const params = await req.nextUrl.searchParams;
    const username = params.get('username');
    const user = await User.findOne({ username });
    const tasks = user.tasks;
    return NextResponse.json({tasks});
  } catch (error) {
    return NextResponse.json({error: error});
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const params = await req.nextUrl.searchParams;
    const newTask = await req.json();
    console.log("new task is: ", newTask);
    console.log(params.get('username'));
    const username = params.get('username');
    const user = await User.findOne({ username });
    console.log("user is: ", user);
    if (user) {
      user.tasks.push(newTask);
      await user.save();
      console.log(user);
    }
    return NextResponse.json({message: 'task created', status: 201 });
  } catch (error) {
    return NextResponse.json({error: error});
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectMongoDB();
    const params = await req.nextUrl.searchParams;
    const newTask = await req.json();
    const username = params.get('username');
    const taskId = params.get('task');
    const user = await User.findOne({ username });
    if (user) {
      const task = user.tasks.id(taskId);
      task.description = newTask.description;
      task.date = newTask.date;
      await user.save();
    }
    return NextResponse.json({message: 'task updated', status: 200 });
  } catch (error) {
    return NextResponse.json({error: error});
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectMongoDB();
    const params = await req.nextUrl.searchParams;
    const username = params.get('username');
    const taskId = params.get('task');
    const user = await User.findOne({ username });
    if (user) {
      const task = user.tasks.id(taskId);
      console.log(task);
      user.tasks.pull(task);
      await user.save();
    }
    return NextResponse.json({message: 'task removed', status: 200 });
  } catch (error) {
    return NextResponse.json({error: error});
  }
}
