// "use client"
// import React, { useContext, useEffect, useState } from 'react'
// import { UserDetailContext } from '../_context/UserDetailContext'
// import Prompt from '../_data/Prompt';
// import axios from 'axios';
// import Image from 'next/image';

// const GenerateLogo = () => {
//   const {userDetail,setUserDetail}=useContext(UserDetailContext);
//   const [formData,setFormData]=useState()
//   const[loading,setLoading]=useState(false);
//   const[logoImage,setLogoImage]=useState();
//   useEffect(()=>{
//     if(typeof window!=undefined &&userDetail?.email){
//       const storage=localStorage.getItem('formData')
//       if(storage){
//         setFormData(JSON.parse(storage))
//         console.log(JSON.parse(storage))
//       }
//     }
//   },[userDetail])


//   useEffect(()=>{
//     if(formData?.title){
//       GenerateAILogo()
//     }
//   },[formData])


// const GenerateAILogo=async()=>{
//   setLoading(true);
//   const PROMPT=Prompt.LOGO_PROMPT
//   .replace('{logoTitle',formData?.title)
//   .replace('{logoDesc',formData?.desc)
//   .replace('{logoColor',formData?.palette)
//   .replace('{logoIdea',formData?.idea)
//   .replace('{logoDesign',formData?.design?.title)
//   .replace('{logoPrompt',formData?.design?.prompt);

//   console.log(PROMPT);
//   const result=await axios.post('/api/ai-logo-model',{
//     prompt:PROMPT,
//     email:userDetail?.email,
//     title:formData.title,
//     desc:formData.desc

//   })
//   console.log(result?.data)
//   setLogoImage(result.data?.image)
//   setLoading(false)
// }


//   return (
//     <div>
//     <h2>{loading&&'Loading..'}</h2>
//     {!loading&&<Image src={logoImage} alt='logo' width={200} height={200}></Image>}
    
//     </div>
//   )
// }

// export default GenerateLogo
//The above code is perfectly working alright but the beeow code is for a better frontend


"use client"
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '../_context/UserDetailContext'
import Prompt from '../_data/Prompt';
import axios from 'axios';
import Image from 'next/image';
import { Loader2 } from 'lucide-react'; // If you have lucide-react installed

const GenerateLogo = () => {
  const {userDetail} = useContext(UserDetailContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if(typeof window !== "undefined" && userDetail?.email) {
      const storage = localStorage.getItem('formData')
      if(storage) {
        setFormData(JSON.parse(storage))
      }
    }
  }, [userDetail])

  useEffect(() => {
    if(formData?.title) {
      GenerateAILogo()
    }
  }, [formData])

  const GenerateAILogo = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const PROMPT = Prompt.LOGO_PROMPT
        .replace('{logoTitle', formData?.title)
        .replace('{logoDesc', formData?.desc)
        .replace('{logoColor', formData?.palette)
        .replace('{logoIdea', formData?.idea)
        .replace('{logoDesign', formData?.design?.title)
        .replace('{logoPrompt', formData?.design?.prompt);

      const result = await axios.post('/api/ai-logo-model', {
        prompt: PROMPT,
        email: userDetail?.email,
        title: formData.title,
        desc: formData.desc
      });
      
      setLogoImage(result.data?.image);
    } catch (err) {
      console.error("Error generating logo:", err);
      setError("Failed to generate logo. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-lg">Creating your custom logo...</p>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button 
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90" 
            onClick={GenerateAILogo}
          >
            Try Again
          </button>
        </div>
      ) : logoImage ? (
        <div className="flex flex-col items-center">
          <div className="border rounded-lg p-4 shadow-md">
            <Image 
              src={logoImage} 
              alt="Generated Logo" 
              width={300} 
              height={300}
              className="rounded-md"
              priority
            />
          </div>
          <button 
            className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            onClick={GenerateAILogo}
          >
            Generate Another Logo
          </button>
        </div>
      ) : (
        <p>Preparing to generate your logo...</p>
      )}
    </div>
  )
}

export default GenerateLogo
