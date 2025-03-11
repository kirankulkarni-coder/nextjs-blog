import mongoose from "../../../lib/db";
import { NextResponse as res } from "next/server";
import UserSchema from "../../../schema/user.schema";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Database not connected");
    }

    const user = new UserSchema(body);

    await user.save();
    return res.json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    return res.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}
