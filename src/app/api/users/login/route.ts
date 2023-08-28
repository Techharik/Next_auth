import User from '@/modals/modal.js';
import dbConnection from '@/dbConfig/dbConfig.js'
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
dbConnection()


export async function POST(reqest:NextRequest){
    try{
       const reqBody = await reqest.json();
       console.log(reqBody);
       const {email,password} =reqBody
       const findUser = await User.findOne({email})

       if(!findUser){
          return NextResponse.json({'error': 'User Not FOund'})
       }

       const validePassword = await bcryptjs.compare(password,findUser.password)

       if(!validePassword){
        return NextResponse.json({'error': 'Password Incorrect'})
     }

     const token = {
         id:findUser._id,
         email,
         username:findUser._userName
     }
 
 
     const jwtSign = await jwt.sign(token,'MysecretKey',{
      expiresIn:'1d'
     })


      const response =  NextResponse.json({'success': true, token })

      response.cookies.set('token', jwtSign,{
         httpOnly:true
      })
   
      return response;
      

    }catch(e:any){
      
      return NextResponse.json(
        {e : e.message}
        )
    }
  }