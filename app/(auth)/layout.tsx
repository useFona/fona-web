"use client"
import { DotPattern } from '@/components/magicui/dot-pattern'
import React, { useEffect, useState } from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [isFirefox, setIsFirefox] = useState(false)

  useEffect(() => {
    setIsFirefox(navigator.userAgent.includes('Firefox'))
  }, [])

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      {isFirefox ? (
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-[#1e1d1d] to-[#090b0c] overflow-hidden" />
      ) : (
        <DotPattern glow={true} />
      )}
      {children}
    </div>
  )
}

export default AuthLayout