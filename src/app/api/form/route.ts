import formDatamodel from "@/model/formData";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export interface FormData{
 jobPosition: string;
  jobDescription: string;
  duration: string;
  type: string;
}


export async function POST(request:NextRequest) {
    const {formData}=await request.json();
    const{jobPosition,type,duration,jobDescription} = formData;
    if(!jobPosition||!type||!duration||!jobDescription){
        return NextResponse.json({
            message:"all field are required"
        },{status:400})
    }

    try {
        const res=await formDatamodel.create({
            jobDescription,
            jobPosition,
            duration,
            type
        })

        if(res.success){
            return NextResponse.json({message:"formdata saved sucessfully"},{status:200})
        }
        else{
            return NextResponse.json({
            message:"failed to upload form data"
        },{status:400})
        }
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            message:"internal server error"
        },{status:500})
    }
}

export async function GET(req:NextRequest){
    const data=await getToken({req});
    console.log(data);
    try {
        const res=await formDatamodel.findOne({email:data?.email});
        console.log("res",res);
        return NextResponse.json({message:"formdata saved sucessfully"},{status:200})
    } catch (error) {
         return NextResponse.json({
            message:"internal server error to get form data"
        },{status:500})
    }
    

}