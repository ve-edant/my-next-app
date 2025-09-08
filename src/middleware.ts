import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Public routes (skip auth)
const isPublicRoute = createRouteMatcher([
  "/sign-in/:path*", 
  "/sign-up/:path*", 
  "/api/webhooks/clerk",
  "/admin/login",       // admin login page
  "/api/admin/login"    // admin login API
]);

// Protected admin routes
const isAdminRoute = createRouteMatcher([
  "/api/admin/:path*",
]);

function verifyAdminToken(token: string): any | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
  } catch (err) {
    console.log("JWT verification failed:", err);
    return null;
  }
}

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  console.log("Middleware running for:", pathname);

  // Skip public routes
  if (isPublicRoute(req)) return NextResponse.next();

  // Admin routes
  if (isAdminRoute(req)) {
    const token = req.cookies.get("admin-token")?.value;

    if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));

    const admin = verifyAdminToken(token);
    if (!admin) return NextResponse.redirect(new URL("/admin/login", req.url));

    return NextResponse.next();
  }

  // Protect all other routes with Clerk
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn({ returnBackUrl: req.url });

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/api/admin/:path*",   // protect admin APIs
    "/api/webhooks/clerk", // allow clerk webhooks
    "/sign-in/:path*",
    "/sign-up/:path*"
  ],
};
