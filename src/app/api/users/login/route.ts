import User from '@/modals/modal.js';
import dbConnection from '@/dbConfig/dbConfig.js'
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

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
 
     return NextResponse.json({'success': true})
    }catch(e:any){
      
      return NextResponse.json(
        {e : e.message}
        )
    }
  }