import { Connectiondb } from "@/lib/dbconnect";
import Usermodel from "@/model/user";
import { NextRequest, NextResponse } from "next/server";


interface SendMailParams {
  name: string;
  email: string;
  password:string
}





export async function POST(request: NextRequest) {
  await Connectiondb();
  
  try {
    const { username, email, password } = await request.json();
  console.log(username);
  
    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

   

    // Check for existing user
    const existingUser = await Usermodel.findOne({ 
      $or: [{ username }, { email }] 
    });

    if (existingUser) {
    
        return NextResponse.json(
          { success: false, message: "User already exists" },
          { status: 400 }
        );
      }
      
     
      await Usermodel.create({
        username,
        email,
        password,
      });
    

    

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
      },
      { status: 200 }
    );

  } catch (error:unknown) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}