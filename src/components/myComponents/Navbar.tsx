'use client'
import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { useRouter } from 'next/navigation'

function Navbar() {
    const {data: session} = useSession()
    const user : User = session?.user as User
    const router = useRouter()

    function logout(){
         signOut();
    }
  return (
    <div>
      <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">AnonyPoll</a>
  </div>
  <div className=' w-[100%]'>
    <h1 className='flex justify-center align-middle items-center w-[100%]'>
        {session? <span className='font-semibold text-lg'>Welcome {user?.username || user?.email}</span>:<><span className="loading loading-ring loading-md"></span></>}
    </h1>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li onClick={()=>logout()}><a >Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    </div>
  )
}

export default Navbar
