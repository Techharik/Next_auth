import User from "@/modals/modal.js";
import { NextResponse,NextRequest } from "next/server";



export async function POST(request:NextResponse){

    try {
         const reqBody = await request.json();
         const {token} = reqBody;
         console.log(token)
         
         const user:any = User.findOne({forgotPassword:token,forgotPasswordExpiry:{$gt: Date.now()}})


       if(!user){
         return NextResponse.json({'error':'user not found'})
       }

       console.log(user)

       user.forgotPassword = token;
      
       return NextResponse.json({'sucess':'true'})
  
    } catch (error) {
        console.log(error)
    }


}