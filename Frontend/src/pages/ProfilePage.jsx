import React from 'react'
import assets from '../assets/assets'

const ProfilePage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col text-gray-300'>
      <div className='p-10 border border-gray-500 backdrop-blur-xl rounded-xl bg-white/5 flex gap-20 items-center'>
       {/* left side */}
       <div className='min-w-[50%] flex flex-col gap-4'>
        <h2>Profile details</h2>
        <div className='flex gap-3 items-center'>
          <img className='w-9' src={assets.avatar_icon} alt="" />
          <p className='text-sm'>Upload Profile Image</p>
        </div>
        
        <input type="text" className='text-sm p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Enter your Full Name'/>
        <textarea rows={4} className='text-sm p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Hi Everyone, I am using QuickChat'/>
        <button className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-full cursor-pointer hover:from-purple-500 hover:to-violet-700 transition-all duration-300 font-medium '>Save</button>

       </div>
        {/* right side */}
        <div className='flex justify-center'>
          <img className='w-[50%]' src={assets.logo_icon} alt="" />
        </div>


      </div>
    </div>
  )
}

export default ProfilePage
