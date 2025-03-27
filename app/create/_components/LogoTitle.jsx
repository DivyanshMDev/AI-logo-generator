"use client"
import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import { useSearchParams } from 'next/navigation'

const LogoTitle = ({onHandleInputChange}) => {
  const searchParam=useSearchParams();

  const[title,setTitle]=useState(searchParam?.get('title')??"");

  return (
    <div className='my-10'>
        <HeadingDescription title={Lookup?.LogoTitle}
        description={Lookup?.LogoTitleDesc}/>

        <input type="text" placeholder={Lookup.InputTitlePlaceholder} 
        className='p-4 border rounded-lg mt-5 w-full'
        default={title}
        onChange={(e)=>onHandleInputChange(e.target.value)}
        ></input>
    </div>
  )
}

export default LogoTitle