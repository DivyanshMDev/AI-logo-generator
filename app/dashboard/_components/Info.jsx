"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import React, { useContext } from 'react'

const Info = () => {
    const{userDetail,setUserDetail}=useContext(UserDetailContext)
  return (
    <div>
        <div>
            <h2 className='font-bold text-3xl text-primary '>Hello {userDetail?.name}</h2>
        </div>
    </div>
  )
}

export default Info