import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
}

export interface Purchase {
    _id?: ObjectId;
    userId: ObjectId;
    courseId: string;
    courseName: string;
    courseImage: string;
    amount: number;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    purchasedAt: Date;
}

export const COLLECTIONS = {
    USERS: "users",
    PURCHASES: "purchases",
} as const;
