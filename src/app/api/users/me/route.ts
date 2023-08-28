import getDataFromToken from '@/helpers/getDatafromtoke'

import User from '@/modals/modal'

import dbConnection from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server';

dbConnection();


export async function GET(request:NextRequest){
    try{
        const id = getDataFromToken(request)
        const userDetails=await User.findOne({_id:id}).select('-password')

        return NextResponse.json({
            mesage:"User Found",
            data:userDetails
        })


    }catch(e:any){
      return NextResponse.json({error:e.message},{status:400})
    }
}