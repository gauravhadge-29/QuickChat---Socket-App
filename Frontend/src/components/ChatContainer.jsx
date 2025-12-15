import React,{useEffect, useRef} from 'react'
import assets from '../assets/assets'
import toast from 'react-hot-toast'
import { formatMessgaeTime } from '../lib/utils'
import { ChatContext } from '../context/ChatContext.jsx';
import { AuthContext } from '../context/authContext.jsx';

const ChatContainer = () => {

  const scrollEnd = useRef()
  const {messages , selectedUser, setSelectedUser, sendMessage, getMessages} = React.useContext(ChatContext);
  const { authUser, onlineUsers } = React.useContext(AuthContext);

  const [input,setInput] = React.useState("");

  useEffect(() => {
    if (scrollEnd.current) {
      setTimeout(() => {
        scrollEnd.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 0);
    }
  }, [messages,selectedUser]);

  //handle sending  MESSAGE
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if(input.trim() === "" ) return;
    await sendMessage({text: input.trim()});
    setInput("");
  }

  //handle sending image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if(!file || !file.type.startsWith("image/")){
      toast.error("Please select a valid image file"); 
      return};
      const reader = new FileReader();
      

      reader.onloadend = async () => {
        const base64Image = reader.result;
        await sendMessage({image: base64Image});
        e.target.value = ""; // Reset the input value
      }

      reader.readAsDataURL(file);
  }

  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      
      {/* this is header */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src= {selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-8 rounded-full'/>
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          {selectedUser.fullName}
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
        </p>
        <img onClick={()=>setSelectedUser(null)} src={assets.arrow_icon} alt=""  className='md:hidden max-w-7'/>
        <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5'/>
      </div>

      {/* This is chat area */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {
          (messages || []).map((msg,index)=>(
            <div 
              key={index} 
              className={`flex items-end gap-2 justify-end ${msg.senderId === authUser?._id && 'flex-row-reverse'}`}
            >
              {msg.image ? (
                <img 
                  src={msg.image} 
                  alt="" 
                  className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8'
                />
              ) : (
                <p 
                  className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                    msg.senderId === authUser?._id ? 'rounded-br-none' : 'rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </p>
              )}

              <div className='text-center text-xs'>
                <img 
                  src={msg.senderId === authUser?._id ? assets.avatar_icon : assets.profile_martin} 
                  alt="" 
                  className='w-7 rounded-full'
                />
                <p className='text-gray-500'>
                  {formatMessgaeTime(msg.createdAt)}
                </p>
              </div>

            </div>
          ))
        }
        <div ref={scrollEnd}></div>
      </div>

      {/* bottom area */}
      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
        <div className='flex-1 flex items-center bg-gray-100/4 px-3 rounded-full'>
          <input 
            type="text" 
            placeholder='Send a Messgae' 
            value={input}
            onKeyDown={(e)=>e.key==="Enter" ? handleSendMessage(e) : null}
            onChange={(e)=>setInput(e.target.value)}
            className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400'
          />
          <input onChange={handleSendImage} type="file" id='image' accept='image/png, image/jpeg' hidden />
          <label htmlFor='image'>
            <img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer'/>
          </label>
        </div>
        <img onClick={handleSendMessage} src={assets.send_button} className='w-7 cursor-pointer' alt="" />
      </div>

      

    </div>
  ) : (
    <>
      <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
        <img src={assets.logo_icon} className='max-w-16' alt="" />
        <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
      </div>
    </>
  )
}

export default ChatContainer
