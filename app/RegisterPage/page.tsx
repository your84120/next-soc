'use client'

import {
    Alert, AlertDescription,
    AlertTitle,
} from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ExclamationTriangleIcon, ExitIcon, PersonIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const RegisterPage = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้า
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to create user.');
                return;
            }
            router.push('/LoginPage'); // เปลี่ยนเส้นทางไปยังหน้าอื่น
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
            <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
                <h1 className="font-semibold text-2xl">Register</h1>
                <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Name</Label>
                        <Input
                            className="w-full"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            type="text"
                        />
                    </div>
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
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="password">Confirm Password</Label>
                        <Input
                            className="w-full"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            id="confirmPassword"
                            type="password"
                        />
                    </div>
                    {error && <Alert variant="destructive">  <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {error}
                        </AlertDescription></Alert>}
                    <div className="w-full">
                        <Button className="w-full" size="lg">
                            Create Account &nbsp;<PersonIcon/>
                        </Button>
                        <Button type='button' variant="destructive" className="w-full mt-5 " size="lg"
                            onClick={() => {
                                setName('');
                                setEmail('');
                                setPassword('');
                                setConfirmPassword('');
                                router.push('/LoginPage');
                            }}
                        >
                            Cancel &nbsp;<ExitIcon />
                        </Button>
                    </div>
                </form>
            </div>

        </div>

    )
}

export default RegisterPage; 