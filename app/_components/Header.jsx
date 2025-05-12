"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '../_components2/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { Router } from 'next/router'
import { useRouter } from 'next/navigation';
const Header = () => {
  const {user}=useUser();
  const router=useRouter(); 
  return (
    <div className='px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm'>  
        
        <Image src={'/logo.svg'} alt='logo' width={180} height={100}></Image>
        <div className='flex gap-3 items-center'>
          {user?<Button onClick={()=>router.push('/dashboard')}>Dashboard</Button>:
        <Button onClick={()=>router.push('/create')}>Get Started</Button>}
        <UserButton/>
        </div>
    </div>
  )
}

export default Header