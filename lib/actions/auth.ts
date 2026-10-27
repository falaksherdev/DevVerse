
"use server";

import connectDB from "../db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut } from "../auth";
import { AuthError } from "next-auth";
import User from "@/models/User";

export type RegisterState = {
    error?: string;
};

export async function registerUser(
    prevState: RegisterState,
    formData: FormData,
): Promise<RegisterState> {
    const name = String(formData.get("name") ?? "").trim();
    const username = String(formData.get("username") ?? "")
        .trim()
        .toLowerCase();
    const email = String(formData.get("email") ?? "")
        .trim()
        .toLowerCase();
    const password = String(formData.get("password") ?? "");

    if (!name || !username || !email || !password) {
        return {
            error: "All fields are required",
        };
    }
    if (!/^[a-z0-9_]{3,20}$/.test(username)) {
        return {
            error: "Username must be 3-20 characters (letters, numbers, underscore)",
        };
    }
    if (password.length < 8) {
        return {
            error: "Password must be at least 8 characters",
        };
    }
    try {
        await connectDB();
        const existing = await User.findOne({
            $or: [{ email }, { username }],
        });
        if (existing) {
            return {
                error:
                    existing.email === email
                        ? "Email already registered"
                        : "Username already taken",
            };
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({
            name,
            email,
            username,
            password: hashedPassword,
        });
    } catch (error) {
        console.log("Register error", error);
        return {
            error: "Something went wrong. Please try again.",
        };
    }

    redirect("/login?registered=true")
}

export type LoginState = {
    error?: string
}

export async function loginUser(
    prevState: LoginState,
    formData: FormData
): Promise<LoginState> {
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const rawCallback = String(formData.get("callbackUrl") ?? "/");

    const redirectTo =
        rawCallback.startsWith("/") && !rawCallback.startsWith("//")
            ? rawCallback
            : "/";

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    try {
        await signIn("credentials", { email, password, redirectTo });
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: "Invalid email or password" };
        }
        throw error;
    }

    return {};
}
export async function logoutUser() {
    await signOut({ redirectTo: "/" });
}