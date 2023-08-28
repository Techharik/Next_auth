'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'




function signup() {
  const Router = useRouter()
  const [user,setUser] = useState({
    userName:'',
    email:'',
    password:''
  })

  const SignUp =async ()=>{
     const userPost = await axios.post('/api/users/signup',user)
    //  const data = userPost.\\()
     Router.push('/login')
  }

  return (
    <div>
      <div>
      <label htmlFor="username">Username</label>
      <input type="text" className='text-black'
      value={user.userName}
      onChange={(e)=>setUser({...user,userName:e.target.value})}
      />
      </div>
      <br />

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

      <button onClick={SignUp}> 
        SignUp
      </button>

    </div>
  )
}

export default signup