import mongoose from "../../../../../lib/db";
import BlogSchema from "../../../../../schema/blog.schema";
import { NextResponse as res } from "next/server";

export const DELETE = async (request, { params }) => {
  try {
    const { id } = await params; // Add await here
    const blog = await BlogSchema.findByIdAndDelete(id);

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
      message: "Blog deleted successfully",
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

export const PUT = async (request, { params }) => {
  try {
    const body = await request.json();
    const { id } = await params; // Add await here

    const blog = await BlogSchema.findByIdAndUpdate(id, body, {
      new: true,
    });

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
      message: "Blog updated successfully",
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
