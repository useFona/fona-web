"use client"
import React from 'react'
import { Button } from '../ui/button'
import { authClient, signOut } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

const SignOut = () => {
  const router = useRouter()
  const session = authClient.useSession()

  if (!session.data) {
    return (
      <Button onClick={() => { router.push("/signin") }}>
        Login
      </Button>
    )
  }

  return (
    <button
      onClick={async () => {
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/signin")
            }
          }
        })
      }}
      className="p-2 bg-[#2d1b1b] text-[#ff6b6b] border border-[#4a2626] rounded-md flex items-center justify-center transition-all duration-200 hover:bg-[#3a2525]"
    >
      Logout
    </button>
  )
}

export default SignOut
