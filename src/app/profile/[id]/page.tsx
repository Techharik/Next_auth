'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'



function singleProfile({params}:any) {
 const Router = useRouter()
  const [user,setUser]=useState(null)

    const logout =async ()=>{
        try{
        const userout =await axios.get('/api/users/logout')
        Router.push('/login')

        }catch(err){
            console.log(err)
        }
    }

   useEffect(()=> {
    const getData = async()=>{
      const response =await axios.get('/api/users/me')
      setUser(response.data.data)
      console.log(response)
    }

    getData()
       
   },[])


  return (
    <>
     <div>{params.id}</div>
    <button onClick={logout}>Logout</button>
{
user != null ?    
    <div className="border">
      <h1 className="bold">{user.userName}</h1>
    </div> : ''
}
    </>
   
  )
}

export default singleProfile