import { DotPattern } from '@/components/magicui/dot-pattern'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <DotPattern glow={true} />
      {children}</div>
  )
}

export default AuthLayout
