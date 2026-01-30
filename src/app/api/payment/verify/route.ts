import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, User, Purchase } from "@/lib/models";

export async function POST(request: NextRequest) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            email,
            password,
            name,
            courseId,
            courseName,
            courseImage,
            amount,
        } = await request.json();

        // Verify Razorpay signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json(
                { error: "Payment verification failed" },
                { status: 400 }
            );
        }

        const db = await getDb();
        const usersCollection = db.collection<User>(COLLECTIONS.USERS);
        const purchasesCollection = db.collection<Purchase>(COLLECTIONS.PURCHASES);

        // Check if user exists or create new one
        let user = await usersCollection.findOne({ email });
        let userId: ObjectId;

        if (!user) {
            // Create new user
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser: User = {
                email,
                password: hashedPassword,
                name,
                createdAt: new Date(),
            };
            const result = await usersCollection.insertOne(newUser);
            userId = result.insertedId;
        } else {
            userId = user._id!;
        }

        // Check if course already purchased
        const existingPurchase = await purchasesCollection.findOne({
            userId,
            courseId,
        });

        if (existingPurchase) {
            return NextResponse.json(
                { error: "Course already purchased" },
                { status: 400 }
            );
        }

        // Save purchase
        const purchase: Purchase = {
            userId,
            courseId,
            courseName,
            courseImage,
            amount,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            purchasedAt: new Date(),
        };

        await purchasesCollection.insertOne(purchase);

        // Generate JWT
        const token = jwt.sign(
            { userId: userId.toString(), email, name },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        return NextResponse.json({
            message: "Payment verified and course purchased successfully",
            token,
            user: { id: userId.toString(), email, name },
        });
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json(
            { error: "Payment verification failed" },
            { status: 500 }
        );
    }
}
