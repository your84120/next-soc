'use client'

import { Button } from "@/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (status == 'unauthenticated') router.push('/');
    }, [router, status])
    return (
        <>
            {console.log('status auth ====>>>>', status)}
            {status == 'authenticated' && session.user &&
                (<div className="flex items-center justify-center h-screen flex-col">
                    <div><h1>Welcome <b>{session.user.name}</b></h1></div>
                    <div className="mt-5">
                        <Button type="button" variant="destructive" onClick={() => signOut({ callbackUrl: '/' })}>
                            Logout  &nbsp;<ExitIcon />
                        </Button>
                    </div>
                </div>)
            }
        </>


    );
}