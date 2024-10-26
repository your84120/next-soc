import prisma from "@/lib/db"; // import Prisma client
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: 'Missing required fields', status: 400 });
        }
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });
        const isPasswordValid = await bcrypt.compare(password, user!.password);
            if (!isPasswordValid) {
                return NextResponse.json({ error: 'Invalid email or password', status: 401 });
            }
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create user', status: 500 });
    }
};

