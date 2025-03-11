import mongoose from "../../../../lib/db";
import BlogSchema from "../../../../schema/blog.schema";
import { NextResponse as res } from "next/server";

export const GET = async (request, { params }) => {
  try {
    let { id } = await params; // Add await here
    const isId = mongoose.Types.ObjectId.isValid(id);
    const query = isId ? { _id: id } : { title: id.split("-").join(" ") };

    const blog = await BlogSchema.findOne(query);

    if (!blog) {
      return res.json(
        {
          success: true,
          message: "Blog not found",
        },
        { status: 500 }
      );
    }

    return res.json({
      success: true,
      message: "Blog found successfully",
      data: blog,
    });
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
