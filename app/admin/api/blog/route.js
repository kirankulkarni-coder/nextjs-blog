import mongoose from "../../../../lib/db";
import BlogSchema from "../../../../schema/blog.schema";
import { NextResponse as res } from "next/server";

// Export an asynchronous function named POST to handle HTTP POST requests
export async function POST(req) {
  try {
    // Parse the JSON body from the incoming request
    const body = await req.json();
    // Log the parsed body to the console for debugging purposes
    console.log(body);

    // Create a new instance of the BlogSchema using the parsed body
    const blog = new BlogSchema(body);

    // Save the newly created blog document to the database
    await blog.save();

    // Return a JSON response indicating success, along with the created blog data
    return res.json({
      success: true,
      message: "Blog created successfully",
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
}

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
