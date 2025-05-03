"use client"
import Link from 'next/link'
import { Button } from '../../_components2/ui/button'
import { UserDetailContext } from '../../_context/UserDetailContext'
import React, { useContext } from 'react'

const Info = () => {
    const{userDetail,setUserDetail}=useContext(UserDetailContext)
  return (
    <div>
        <div className='flex justify-between items-center '>
            <h2 className='font-bold text-3xl text-primary '>Hello {userDetail?.name}</h2>
            <div className='font-bold text-3xl'>
              <h2>{userDetail?.credits} Credits Left</h2>
            </div>
        </div>

        <div className='flex justify-between mt-4 items-center'>
          
          <h2 className='font-bold text-2xl'>Dashboard</h2>
          <Link href='/create'><Button>Create a New Logo</Button>
          </Link>
          </div>
    </div>
  )
}

export default Info