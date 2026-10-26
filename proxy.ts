import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";


const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const path = nextUrl.pathname
    const isLoggedIn = !!req.auth

    const isAuthPage = path === "/login" || path === "/register"

    const isProtected =
        path === "/posts/new" ||
        /^\/posts\/[^/]+\/edit$/.test(path) ||
        path.startsWith("/bookmarks") ||
        path.startsWith("/settings");




})