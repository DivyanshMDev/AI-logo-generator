import React from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'

const LogoDesc = ({onHandleInputChange,formData}) => {
  return (
    <div className='my-10'>
        <HeadingDescription 
        title={Lookup.LogoDescTitle}
        description={Lookup.LogoDescDesc}></HeadingDescription>

         <input type="text" placeholder={Lookup.InputTitlePlaceholder} 
                className='p-4 border rounded-lg mt-5 w-full'
               value={formData.desc}
                onChange={(e)=>onHandleInputChange(e.target.value)}
                ></input>
    </div>
  )
}

export default LogoDesc