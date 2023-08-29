import User from "@/modals/modal.js";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import dbConnection from "@/dbConfig/dbConfig";

dbConnection()

export async function POST( request:NextRequest){
   const reqbody= await request.json();
   const {newPass,forgotPassword}= reqbody
   console.log(reqbody)

    const user = await User.findOne({forgotPassword})

    if(!user){
        return NextResponse.json({'mesage':'user not found'})
    }

    const newPassword = bcrypt.hash(newPass,10);
    user.passwword = newPassword;
     const res =  await user.save()
     console.log(user)
     return NextResponse.json({'mesage':'password Updated Successfully'})

}

