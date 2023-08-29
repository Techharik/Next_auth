import User from '@/modals/modal.js';
import dbConnection from '@/dbConfig/dbConfig.js'
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';


export async function POST(reqest:NextRequest){
  try{

await dbConnection()    
    const reqBody = await reqest.json()

   const {userName,email,password} =reqBody
  
    const userExits = await User.findOne({email})

    if(userExits){
        return  NextResponse.json({'success':false, 'message':'User already exists'})
    }

    const hasedPassword = await bcryptjs.hash(password,10)

    const newUser = await new User({
        userName,
        email,
        password:hasedPassword
    })

    const saveUser = await newUser.save()

   return  NextResponse.json({'success':true, 'message':'User added to db successfully'})

  }catch(e:any){
    console.log(e) 
    return NextResponse.json({e : e.message})
  }
}