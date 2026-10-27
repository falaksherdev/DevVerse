import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const path = nextUrl.pathname;
    const isLoggedIn = !!req.auth;

    const isAuthPage = path === "/login" || path === "/register";

    const isProtected =
        path === "/posts/new" ||
        /^\/posts\/[^/]+\/edit$/.test(path) ||
        path.startsWith("/bookmarks") ||
        path.startsWith("/settings");

    if (isAuthPage && isLoggedIn) {
        return NextResponse.redirect(new URL("/", nextUrl));
    }

    if (isProtected && !isLoggedIn) {
        const loginUrl = new URL("/login", nextUrl);
        loginUrl.searchParams.set("callbackUrl", path);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/login",
        "/register",
        "/posts/new",
        "/posts/:slug/edit",
        "/bookmarks/:path*",
        "/settings/:path*",
    ],
};