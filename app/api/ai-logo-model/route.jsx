// import { AILogoPrompt } from "@/configs/Aimodel";
// import axios from "axios";
// import { NextResponse } from "next/server";

// export async function POST(req){

//     const {prompt}=await req.json();
//     try{
//         //generate ai text prompt for logo
//        const AiPromptResult=await AILogoPrompt.sendMessage(prompt);
//        console.log(JSON.parse(AiPromptResult.response.text()).prompt)
//        const AIPrompt=JSON.parse(AiPromptResult.response.text()).prompt;
       
//        //generate logo from ai modal
//        const response=await axios.post("https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
//         AIPrompt,
//         {
//         headers: {
//             Authorization: "Bearer "+process.env.HUGGING_FACE_API_KEY,
//             "Content-Type": "application/json",
//         },
//         responseType:"arraybuffer"
//     } 
//        )

//        //convert to base 64 image
//        const buffer=Buffer.from(response.data,"binary");
//        const base64Image=buffer.toString("base64");
       
//        const base64ImageWithM=`data:image/png;base64,${base64Image}`
//        console.log(base64ImageWithM)

//        //save to db
       
       
//        return NextResponse.json({image:base64ImageWithM})

//     }
//     catch(e){
//         return NextResponse.json({error:e});
//     }
// }
//the above code will work for hugging face api just add the db part too
//once you have the credits






import { AILogoPrompt } from "@/configs/Aimodel";
import { db } from "@/configs/FirebaseConfig";

import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// AIGuruLab API configuration
const BASE_URL = 'https://aigurulab.tech';
const API_KEY = process.env.AIGURU_API_KEY; // Store this in your .env file

export async function POST(req) {
  const { prompt ,email,title,desc} = await req.json();
  
  try {
    // Step 1: Generate AI text prompt for logo using your existing model
    const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
    const AIPrompt = JSON.parse(AiPromptResult.response.text()).prompt;
    console.log("Generated logo prompt:", AIPrompt);
    
    // Step 2: Use AIGuruLab API to generate the image
    const response = await axios.post(
      `${BASE_URL}/api/generate-image`,
      {
        width: 1024,
        height: 1024,
        input: AIPrompt, // Use the generated prompt
        model: 'sdxl',   // Using SDXL model, or 'flux' if available
        aspectRatio: "1:1" // For Flux model only
      },
      {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        }
      }
    );
    
    // Step 3: Extract the base64 image directly from the response
    const base64Image = response.data.image;
    console.log("Image generated successfully");

    //SAVING TO DB
        try{
            await setDoc(doc(db,"users",email,"logos",Date.now().toString()),{
                image:base64Image,
                title:title,
                desc:desc
            }
        )
        }

        catch{

        }





    
    // Step 4: Return the image data
    return NextResponse.json({
      success: true,
      prompt: AIPrompt,
      image: base64Image // This is already in base64 format according to the API docs
    });
  }
  catch (error) {
    console.error("Error generating logo:", error);
    
    if (error.response) {
      // Handle API-specific error responses
      return NextResponse.json({
        error: "API error",
        details: error.response.data || error.response.statusText,
        status: error.response.status
      }, { status: error.response.status });
    }
    
    // Generic error handling
    return NextResponse.json({
      error: "Failed to generate logo",
      message: error.message
    }, { status: 500 });
  }
}