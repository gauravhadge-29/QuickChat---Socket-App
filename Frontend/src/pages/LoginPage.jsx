import React from 'react'
import assets from '../assets/assets'

const LoginPage = () => {

  const [currentState, setCurrentState] = React.useState('Sign Up') // login , signup
  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [bio, setBio] = React.useState('')
  const [isDataSubmitted, setIsDataSubmitted] = React.useState(false)

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if(currentState === 'Sign Up' && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }


      
  }



  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-xl'>
      {/* LEFT */}
      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />

      {/* RIGHT */}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currentState}
          {
            isDataSubmitted && <img onClick={()=>setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer'/>
          }
          
        </h2>

        {
          currentState === 'Sign Up' && !isDataSubmitted && (
            <input onChange={(e)=>setFullName(e.target.value)} value={fullName} type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Enter your full name' required/>
          )
        }

        {
          !isDataSubmitted && (
            <>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Enter your email' required/>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Enter your password' required/>
            </>
          )
        }

        {
          currentState === 'Sign Up' && isDataSubmitted && (
            <textarea onChange={(e)=>setBio(e.target.value)} value={bio} rows="4" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Provide Short bio' required/>
          )
        }

        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer hover:from-purple-500 hover:to-violet-700 transition-all duration-300 font-medium '>
          {
            currentState === 'Sign Up' ? "Create Account" : "Login"
          }
        </button>

        <div className='flex gap-2 px-2 text-sm items-center text-gray-500'>
          <input type="checkbox" />
          <p>By signing up, you agree to our Terms and Conditions</p>
        </div>

        <div className='flex flex-col gap-2'>
          {
            currentState === 'Sign Up' ? (
              <p className='text-sm text-gray-600'>Already have an account? <span onClick={()=>{setCurrentState('Login'); setIsDataSubmitted(false)}} className='text-indigo-500 font-medium cursor-pointer hover:underline'>Login</span></p>
            ) : (
              <p className='text-sm text-gray-600'>Don't have an account? <span onClick={()=>{setCurrentState('Sign Up'); setIsDataSubmitted(false)}} className='text-indigo-500 font-medium cursor-pointer hover:underline'>Sign Up</span></p>
            )
          }
        </div>
      </form>


    </div>
  )
}

export default LoginPage
