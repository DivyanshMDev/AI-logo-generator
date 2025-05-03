import { AIDesignIdea } from "../../../configs/Aimodel";
import { NextResponse } from "next/server";
export async function POST(req){
    const {prompt}=await req.json();

    try{
        const result=await AIDesignIdea.sendMessage(prompt);
        return NextResponse.json(JSON.parse(result.response.text()))
    }
    catch(e){
        return NextResponse.json({error:e});
       
        }
    }
