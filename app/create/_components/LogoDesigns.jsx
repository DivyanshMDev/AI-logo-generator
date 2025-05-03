"use client"
import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '../../_data/Lookup'
import LogoDesig from '../../_data/LogoDesig'
import Image from 'next/image'

const LogoDesigns = ({onHandleInputChange,formData}) => {
    const [selectedOption,setSelectedOption]=useState(formData?.design?.title);

  return (
    <div className='my-10'>
        <HeadingDescription
        title={Lookup.LogoDesignTitle}
        description={Lookup.LogoDesignDesc}></HeadingDescription>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-10 mt-10'>
            {LogoDesig.map((design,index)=>(
                <div key={index }
                onClick={()=>{setSelectedOption(design.title)
                    onHandleInputChange(design)
                }}
                className={`p-1 hover:border-2 border-primary rounded-3xl cursor-pointer${selectedOption==design.title && 'border-2 rounded-xl border-primary' }`}>
                    <Image src={design.image} alt={design.title}
                     width={300} height={200} className='rounded-2xl'></Image>
                     </div>
            ))}
        </div>

    </div>
  )
}

export default LogoDesigns