import React from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {

  const [selectedImage, setSelectedImage] = React.useState(null);
  const navigate = useNavigate();
  const [name,setName] = React.useState('Gaurav Hadge');
  const [bio,setBio] = React.useState('Hi Everyone, I am using QuickChat');

  const handleSubmit = async (e)=>{
    e.preventDefault();
    navigate('/');
    

  }


  return (
    <div className='min-h-screen flex items-center justify-center text-gray-300'>
      <div className='w-5/6 max-w-2xl p-10 border-2 border-gray-600 max-sm:flex-col-reverse backdrop-blur-2xl rounded-lg flex jusitfy-between items-center'>
       {/* left side */}
       <form onSubmit={handleSubmit} className='flex flex-1 flex-col gap-5 p-10'>
        <h2 className='text-lg'>Profile details</h2>
        <div>
          <input type="file" onChange={(e)=>setSelectedImage(e.target.files[0])} id="profile" accept='.png, .jpeg, .jpg'hidden/>
          <label className='flex gap-3 items-center cursor-pointer' htmlFor="profile">
            <img className={`w-10 aspect-square ${selectedImage && 'rounded-full'}`} src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon} alt="" />
            <p className='text-sm'>Upload Profile Image</p>
          </label>
          
          
        </div>
        
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='text-sm text-gray-400 p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Enter your Full Name' required/>
        <textarea rows={4} value={bio} onChange={(e)=>setBio(e.target.value)} className='text-sm text-gray-400 p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Hi Everyone, I am using QuickChat' required/>
        <button className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-full cursor-pointer hover:from-purple-500 hover:to-violet-700 transition-all duration-300 font-medium '>Save</button>

       </form>
        {/* right side */}
        <div className='flex justify-center'>
          <img className='max-w-44 rounded-full aspect-square mx-10 max-sm:mt-10' src={assets.logo_icon} alt="" />
        </div>


      </div>
    </div>
  )
}

export default ProfilePage
