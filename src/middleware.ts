import { NextRequest, NextResponse } from "next/server";

import { jwtVerify } from "jose";

export const middleware = async (request: NextRequest) => {
  const { origin, pathname } = request.nextUrl;
  const headerToken = request.cookies.get("token")?.value;
  console.log("headerTkoen", headerToken);

  try {
    if (pathname === "/login" || pathname === "/register") {
      if (headerToken) return NextResponse.redirect(`${origin}`);
      return NextResponse.next();
    }
    if (!headerToken) {
      return NextResponse.redirect(`http://localhost:3000/login`);
    }
    const verifyToken = await jwtVerify(
      headerToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    console.log("verifyToken", verifyToken);

    if (verifyToken) {
      return NextResponse.next();
    }

    return NextResponse.json(
      { error: { message: "auth required" } },
      { status: 401 }
    );
  } catch (error) {
    console.log(error);
  }
};

export const config = {
  matcher: ["/", "/login", "/protected"],
};
