'use client'

import axios from 'axios'
import React,{useState} from 'react'



function Forgotpassword(){
 const [userEmail,setUserEmail] = useState('')

 const onForgotEmailVerify = async () => {

    try {
        const headers = {
            'Content-Type': 'application/json',
            // Add more headers as needed
        }
      const response = await axios.post("/api/users/forgotpassword", userEmail ,{ headers});
      
      console.log("Email Found", response.data);
    } catch (error:any) {
    
      throw new Error(error);
    }
 }
//  console.log(userEmail)



    return(
        <>
        <h1>Enter Your Email to verify and rest password</h1>
          <div >
           <input type="text" 
           value={userEmail}
           onChange={(e)=>setUserEmail(e.target.value)}
           className='text-black'
           />
           <button onClick={onForgotEmailVerify}>Submit</button>
          </div>
        
        </>
    )
}

export default Forgotpassword




