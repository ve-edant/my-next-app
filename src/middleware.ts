import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const isPublicRoute = createRouteMatcher([
  "/",                 // landing
  "/sign-in(.*)",      // sign-in pages
  "/sign-up(.*)",      // sign-up pages
  "/api/webhooks/clerk", // allow Clerk webhooks
  "/admin/login",      // admin login page
  "/api/admin/login",  // admin login API
  "/admin/dashboard(.*)",
  "/api/admin/users(.*)",
  "/api/admin/logout",
]);

const isAdminRoute = createRouteMatcher([
  "/adminss/dashboard(.*)",
]);

function verifyAdminToken(token: string): any | null {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return payload;
  } catch (error) {
    console.log('JWT verification failed:', error);
    return null;
  }
}

export default clerkMiddleware(async (auth, req: NextRequest) => {
  console.log('Middleware running for:', req.nextUrl.pathname);
  
  // Handle admin routes
  if (isAdminRoute(req)) {
    console.log('Admin route detected:', req.nextUrl.pathname);
    
    const token = req.cookies.get('admin-token')?.value;
    console.log('Admin token present:', !!token);
    
    if (!token) {
      console.log('No admin token, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    
    const admin = verifyAdminToken(token);
    console.log('Admin verification result:', !!admin);
    
    if (!admin) {
      console.log('Invalid admin token, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    
    console.log('Admin authenticated, allowing access');
    return NextResponse.next();
  }

  // Skip protection for public routes
  if (isPublicRoute(req)) {
    console.log('Public route, skipping protection');
    return;
  }

  // Protect everything else with Clerk
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};