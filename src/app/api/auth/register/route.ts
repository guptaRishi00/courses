import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, User } from "@/lib/models";

export async function POST(request: NextRequest) {
    try {
        const { email, password, name } = await request.json();

        if (!email || !password || !name) {
            return NextResponse.json(
                { error: "Email, password, and name are required" },
                { status: 400 }
            );
        }

        const db = await getDb();
        const usersCollection = db.collection<User>(COLLECTIONS.USERS);

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const newUser: User = {
            email,
            password: hashedPassword,
            name,
            createdAt: new Date(),
        };

        const result = await usersCollection.insertOne(newUser);

        // Generate JWT
        const token = jwt.sign(
            { userId: result.insertedId.toString(), email, name },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        return NextResponse.json({
            message: "User registered successfully",
            token,
            user: { id: result.insertedId.toString(), email, name },
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
