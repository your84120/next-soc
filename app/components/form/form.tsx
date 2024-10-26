'use client'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { EnterIcon } from "@radix-ui/react-icons"

export const Form = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/homePage'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            console.log('password: ', password);
            console.log('email: ', email);
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            })

            if (result?.error) {
                console.error(result.error);
                setError(result.error);
                return false
            }else {
                router.push(callbackUrl);
            }
        } catch (err: any) { console.log('error from user login ====>>>> ', err, ' <<<<====') }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                    className="w-full"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                    className="w-full"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                />
            </div>
            {error && <Alert>{error}</Alert>}
            <div className="w-full">
               <Button className="w-full" size="lg">
                    Login &nbsp;<EnterIcon/>
                </Button>
            </div>
        </form>
    )
}