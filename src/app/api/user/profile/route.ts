import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, User, Purchase } from "@/lib/models";

interface JWTPayload {
    userId: string;
    email: string;
    name: string;
}

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];

        let decoded: JWTPayload;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
        } catch {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }

        const db = await getDb();
        const usersCollection = db.collection<User>(COLLECTIONS.USERS);
        const purchasesCollection = db.collection<Purchase>(COLLECTIONS.PURCHASES);

        // Get user
        const user = await usersCollection.findOne({
            _id: new ObjectId(decoded.userId),
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Get purchased courses
        const purchases = await purchasesCollection
            .find({ userId: user._id })
            .sort({ purchasedAt: -1 })
            .toArray();

        return NextResponse.json({
            user: {
                id: user._id!.toString(),
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
            },
            purchases: purchases.map((p) => ({
                id: p._id!.toString(),
                courseId: p.courseId,
                courseName: p.courseName,
                courseImage: p.courseImage,
                amount: p.amount,
                purchasedAt: p.purchasedAt,
            })),
        });
    } catch (error) {
        console.error("Profile error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
