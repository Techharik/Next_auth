'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'




function login() {
  const Router = useRouter()
  const [user,setUser] = useState({
    email:'',
    password:''
  })

  const Login =async ()=>{
     const userPost = await axios.post('/api/users/login',user)
   console.log(userPost.data)
       
       Router.push('/profile')
  }

  return (
    <div>
      

      <div>
      <label htmlFor="email">Email</label>
      <input type="text" className='text-black'
      
      value={user.email}
      onChange={(e)=>setUser({...user,email:e.target.value})}
      />

      </div>
      <br />

      <div>
      <label htmlFor="password">Password</label>
      <input type="text"className='text-black'
       value={user.password}
       onChange={(e)=>setUser({...user,password:e.target.value})}
       />
      </div>
      <br />

      <button onClick={Login}> 
        Login
      </button>

    </div>
  )
}

export default login