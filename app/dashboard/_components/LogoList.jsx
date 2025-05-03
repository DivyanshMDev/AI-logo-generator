"use client"
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '../../_context/UserDetailContext'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../configs/FirebaseConfig';
import Image from 'next/image';

const LogoList = () => {
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  const [LogoList,setLogoList]=useState([]); 
  useEffect(()=>{
    userDetail&&GetUserLogos();

  },[userDetail])

  const GetUserLogos=async()=>{
    const querySnapshot=await getDocs(collection(db,"users",userDetail?.email,"logos"))
    querySnapshot.forEach((doc) => {
    console.log(doc.data());    
    setLogoList(prev=>[...prev,doc.data()])  
    });
  }

  const ViewLogo=(image)=>{
    const imageWindow=window.open();
    imageWindow.document.writeln(`<img src="${image}" alt="Base64 Image"/>`)
  }
  return (
    <div className='mt-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
       {LogoList?.length>0?LogoList.map((logo,index)=>(
        <div key={index} className='hover:scale-105 transition-all cursor-pointer' 
        onClick={()=>ViewLogo(logo?.image)}>
          <Image src={logo?.image} width={400} height={200} 
          className='w-full rounded-xl'
          alt={logo?.title}></Image>
          <h2 className='text-center text-lg mt-2'>{logo?.title}</h2>
          <p className='text-sm text-gray-500 text-center'>{logo?.desc}</p>
        </div>
       )):
       [1,2,3,4,5,6,7,8].map((item,index)=>(
        <div key={index} className='bg-slate-200 animate-ping rounded-xl width-full h-[200px]'></div>
       ))} 
      </div>
    </div>
  )
}

export default LogoList