"use client"
import { FaGithub } from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from '@/lib/auth-client'
import FormError from '../form-error'
import { useRouter } from 'next/navigation'
import CardWrapper from '../CardWrapper'
import { FormSuccess } from '../form-success'
import Image from 'next/image'
import { AuroraText } from '../magicui/aurora-text'
import { Home } from 'lucide-react'
import Link from 'next/link'

const SignIn = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setError("")
    setSuccess("")
    setLoading(false)
  }, [])

  const githubSignIn = async () => {
    try {
      await signIn.social({
        provider: "github",
        callbackURL: "/dashboard"
      }, {
        onResponse: () => {
          setLoading(false)
        },
        onRequest: () => {
          setSuccess("")
          setError("")
          setLoading(true)
        },
        onSuccess: () => {
          setSuccess("You are logged in successfully")
          router.replace('/dashboard')
        },
        onError: (ctx) => {
          setError(ctx.error.message)
        }
      })
    } catch (error: unknown) {
      console.log(error)
      setError("Something went wrong")
    }
  }

  const googleSignIn = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/dashboard"
      }, {
        onResponse: () => {
          setLoading(false)
        },
        onRequest: () => {
          setSuccess("")
          setError("")
          setLoading(true)
        },
        onSuccess: () => {
          setSuccess("You are logged in successfully")
          router.replace('/dashboard')
        },
        onError: (ctx) => {
          setError(ctx.error.message)
        }
      })
    } catch (error: unknown) {
      console.error(error)
      setError("Something went wrong")
    }
  }

  return (
    <CardWrapper
      cardTitle=''
      cardDescription=''
      className='relative overflow-hidden border-2 border-[#292929] bg-[#161616] backdrop-blur-sm shadow-2xl py-8 px-6 max-w-md w-full mx-4 shadow-black text-[#7b7b7d]'
    >
      {/* Home Button */}
      <Link href='/' className='absolute top-4 left-4 text-[#7b7b7d] hover:text-white transition-colors'>
        <Home className='w-5 h-5' />
      </Link>
      <div className='flex flex-col items-center justify-center space-y-6 w-full'>
        {/* FONA Logo */}
        <div className='w-24 h-24 relative'>
          <Image
            src='/fona.svg'
            alt='FONA Logo'
            fill
            className='object-contain'
            priority
          />
        </div>
        
        {/* Title */}
        <h2 className='text-2xl font-bold text-center text-[#7b7b7d]'>
          Sign up to create notes with 
        </h2>
        <AuroraText colors={["#FFBB94", "#DC586D", "#FB9590"]} className="font-bold text-4xl font-inter">FONA</AuroraText>
        
        <div className='w-full space-y-4'>
          <FormError message={error} />
          <FormSuccess message={success} />
          
          <Button
            variant='outline'
            className='w-full flex items-center justify-center gap-2 h-12 text-base text-[#7b7b7d] hover:text-white hover:bg-[#242424] transition-colors bg-[#191919] border-[#292929]'
            onClick={googleSignIn}
            disabled={loading}
          >
            <FcGoogle className='w-6 h-6' />
            Continue with Google
          </Button>
          
          <Button
            variant='outline'
            className='w-full flex items-center justify-center gap-2 h-12 text-base text-[#7b7b7d] hover:text-white hover:bg-[#242424] transition-colors bg-[#191919] border-[#292929]'
            onClick={githubSignIn}
            disabled={loading}
          >
            <FaGithub className='w-6 h-6' />
            Continue with GitHub
          </Button>
        </div>
      </div>
    </CardWrapper>
  )
}

export default SignIn
