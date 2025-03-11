import { revalidatePath } from "next/cache";
import { NextResponse as res } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();

    // Validate the input
    if (!body.paths || !Array.isArray(body.paths)) {
      return res.json(
        {
          success: false,
          message: "Invalid input: 'paths' must be an array.",
        },
        { status: 400 } // Bad Request
      );
    }

    // Revalidate each path
    const revalidationResults = await Promise.all(
      body.paths.map(async (path) => {
        try {
          await revalidatePath(path); // Revalidate the path
          return {
            path,
            reValidatedAt: Date.now(), // Use Date.now() to get the current timestamp
            success: true,
          };
        } catch (error) {
          return {
            path,
            reValidatedAt: Date.now(),
            success: false,
            error: error.message,
          };
        }
      })
    );

    return res.json({
      success: true,
      status: 200,
      data: revalidationResults,
    });
  } catch (error) {
    return res.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 } // Internal Server Error
    );
  }
};
