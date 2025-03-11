import { NextResponse } from "next/server";

export const config = {
  matcher: "/admin/:path*",
};

export async function middleware(request) {
  const cookies = request.cookies.get("accessToken");

  console.log("Access Token Cookie:", cookies); // Log the cookie

  // If no accessToken cookie is found, redirect to /login
  if (!cookies) {
    console.log("No accessToken found, redirecting to /login"); // Log the redirect
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const apiUrl = process.env.API_URL || "http://localhost:3000/api/session";
    console.log("Validating token with API:", apiUrl); // Log the API URL

    const apiResponse = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({ token: cookies.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("API Response Status:", apiResponse.ok); // Log the API response status

    // If the token is invalid, redirect to /login
    if (!apiResponse.ok) {
      console.log("Invalid token, redirecting to /login"); // Log the redirect
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    console.error("Error validating session:", error); // Log the error
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("Token is valid, proceeding with the request"); // Log successful validation
  return NextResponse.next();
}
