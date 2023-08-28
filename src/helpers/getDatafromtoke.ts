import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";


const getDataFromToken = (request:NextRequest)=>{
    try{
       const token =request.cookies.get('token')?.value || ''
       if(token){
       const decode:any = jwt.verify(token,'MysecretKey')
       return decode.id
       }
    }catch(err){
       console.log(err)
    }
}


export default getDataFromToken