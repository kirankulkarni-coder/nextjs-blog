import mongoose from "../../../lib/db";
import { NextResponse as res } from "next/server";
import UserSchema from "../../../schema/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getToken = (payload) => {
  console.log(process.env);
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Database not connected");
    }

    const user = await UserSchema.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.json({
        success: false,
        status: 404,
        message: "User Not Found",
      });
    }

    const isLogin = await bcrypt.compare(password, user.password);

    if (!isLogin) {
      return res.json({
        success: false,
        status: 404,
        message: "Password is incorrect",
      });
    }

    const token = getToken({
      email: user.email,
      name: user.name,
    });

    console.log(token);

    const result = res.json({
      success: true,
      message: "User Logged In successfully",
    });

    result.cookies.set("accessToken", token.accessToken, {
      httpOnly: true,
      secure: process.env.prod === "true" ? true : false,
      path: "/",
    });

    result.cookies.set("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: process.env.prod === "true" ? true : false,
      path: "/",
    });

    return result;
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
