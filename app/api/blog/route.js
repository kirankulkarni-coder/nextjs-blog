import mongoose from "../../../lib/db";
import BlogSchema from "../../../schema/blog.schema";
import { NextResponse as res } from "next/server";
export async function GET(req) {
  try {
    // Fetch all blogs from the database
    const blogs = await BlogSchema.find({});

    // Return the blogs as a JSON response
    return res.json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (err) {
    // Handle any errors that occur during the fetch operation
    return res.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}
