import prisma from "@/lib/db";
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOption: AuthOptions = {
    providers: [ // การกำหนดวิธีการยืนยันตัวตนของผู้ใช้
        CredentialsProvider // เป็น provider ที่ใช้สำหรับการล็อกอินโดยใช้ข้อมูลรับรอง (credentials) ของผู้ใช้โดยตรง
            ({
                name: "Credentials",
                credentials: {
                    email: { label: "Email", type: "email" },
                    password: { label: "Password", type: "password" }
                },
                async authorize(credentials, req) { // logic สำหรับตรวจสอบการ login
                    
                    if (!credentials) return null;
                    
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email }
                    });
                    
                    if (!user) {
                        throw new Error('Invalid email or password');
                    }

                    const isPasswordValid = await bcrypt.compare(credentials.password, user!.password);

                    if (user && isPasswordValid) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        } as any;
                    } else {
                        throw new Error('Invalid email or password');
                    }
                }
            })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt' // session เก็บเป็น JSON Web Token (JWT)
    },
    callbacks: {
        jwt: async ({ token, user }) => { // เขียน jwt ยืนยันว่าเป็น user คนไหนผ่าน email
            if (user) {
                token.id = user.id
            }
            return token;
        },
        session: async ({ session, token }: any) => { // รับ session ยืนยันว่าเป็น user คนไหนผ่าน token.email เพื่อเรียกใช้
            if (session.user) {
                session.user.id = token.id;
            }
            return session;
        }
    }
}

const handler = NextAuth(authOption);

export { handler as GET, handler as POST }