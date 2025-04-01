// import { db } from "@/configs/FirebaseConfig";
// import {doc, getDoc, setDoc} from "firebase/firestore"
// import { NextResponse } from "next/server";



// export async function POST(req) {
//  const{userEmail,userName}=await req.json()
 
//  try{
//     //IF USER EXIST 
//     const docRef=doc(db,"users",userEmail);
//     const docSnap=await getDoc(docRef);
//     if(docSnap.exists()){
//         return NextResponse.json(docSnap.data())

//     }
//     else{
//         //insert bnew user
//         const data={
//             name:userName,
//             email:userEmail,
//             credits:5
//         }
//         await setDoc(doc(db,"users",userEmail),{
//             ...data
//         })

//         return NextResponse.json(data)
//     }
   

// }
// catch(e){

// }
    
// }
//although the code below is changed but its same as above I did so as I
//faced problem in setting up the firebase

import { db } from "@/configs/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the request body properly
    const { userEmail, userName } = await req.json();
    
    // Validation to prevent null/undefined values
    if (!userEmail) {
      return NextResponse.json({ error: "userEmail is required" }, { status: 400 });
    }

    try {
      // IF USER EXISTS 
      const docRef = doc(db, "users", userEmail);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return NextResponse.json(docSnap.data());
      } else {
        // insert new user
        const data = {
          name: userName || 'Anonymous User',
          email: userEmail,
          credits: 5,
          createdAt: new Date().toISOString()
        };
        
        await setDoc(doc(db, "users", userEmail), data);
        return NextResponse.json(data);
      }
    } catch (firestoreError) {
      console.error("Firestore operation failed:", firestoreError);
      
      // Handle Firestore specific errors
      if (firestoreError.code === 'unavailable') {
        return NextResponse.json({ 
          error: "Database is currently unavailable. Please check your internet connection.",
          offline: true
        }, { status: 503 });
      }
      
      if (firestoreError.code === 'permission-denied') {
        return NextResponse.json({ 
          error: "You don't have permission to perform this operation.",
        }, { status: 403 });
      }
      
      throw firestoreError; // Re-throw for the outer catch block
    }
  } catch (error) {
    // Proper error handling with logging
    console.error("API Error:", error);
    
    return NextResponse.json({ 
      error: "Failed to process your request", 
      details: error.message || "Internal server error" 
    }, { status: 500 });
  }
}