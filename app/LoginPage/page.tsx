'use client'
import Link from 'next/link'
import { Form as LoginForm } from '../components/form/form'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { data, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status == 'authenticated') router.push('/homePage');
  }, [router, status])
  return (
    <>
      {console.log('status auth ====>>>>', status)}
      {status == 'unauthenticated' && <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
        <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
          <h1 className="font-semibold text-2xl">Login</h1>
          <LoginForm />
          <p className="text-center">
            Need to create an account?{' '}
            <Link className="text-indigo-500 hover:underline" href="/RegisterPage">
              Create Account
            </Link>{' '}
          </p>
        </div>
      </div>}
    </>
  )
}