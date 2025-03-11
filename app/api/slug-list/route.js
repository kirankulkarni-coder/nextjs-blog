import mongoose from "../../../lib/db";
import BlogSchema from "../../../schema/blog.schema";
import { NextResponse as res } from "next/server";

export const GET = async (request) => {
  try {
    const titles = await BlogSchema.distinct("title");
    const slugs = titles.map((item) => item.split(" ").join("-"));
    return res.json(slugs);
  } catch (err) {
    // If an error occurs, catch it and return a JSON response with the error message
    return res.json(
      {
        success: false,
        message: err.message, // Include the error message in the response
      },
      { status: 500 } // Set the HTTP status code to 500 (Internal Server Error)
    );
  }
};
