'use client'
import React, { useState,useEffect } from 'react'
import axios from 'axios'


function page() {
   const [token, setToken] = useState('')
   const [newpass, setNewPass] = useState('')
   const [user,setUser] =useState({
    newPass:'',
    forgotPasswordTokan:''
   })

    const setverifyToken= async ()=>{
   try{
        const res=await axios.post('/api/users/verifyToken',{token})

    }catch(e){
         console.log(e)   
    }
    }




    useEffect(()=>{
        if(token.length > 0){
            setverifyToken()
        }
      },[token])


   useEffect(()=>{
        const url = window.location.search
       const parsedUrl = url.replace('?token=','')
       setToken(parsedUrl)
   },[]) 

  

const Onset =async()=>{
      setUser({
        newPass:newpass,
        forgotPasswordTokan:token
      })

    const res =await  axios.post('/api/users/updatePassword',user)


}

  return (
    <div>
      <input type="text" name="newpass" id="newpass" 
      value={newpass}
      onChange={(e)=>setNewPass(e.target.value)}
      className='text-black'
      />
      <button onClick={Onset}>Submit</button>

    </div>
  )
}

export default page