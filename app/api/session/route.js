import mongoose from "../../../lib/db";
import { NextResponse as res } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { token } = await req.json();
    const session = await jwt.verify(token, process.env.ACCESS_TOKEN);
    return res.json(session);
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
