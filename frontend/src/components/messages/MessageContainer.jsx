import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import {TiMessages} from "react-icons/ti"
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'

const MessageContainer = () => {
  const {selectedConversation,setSelectedConversation} = useConversation()

  useEffect(()=>{
    // clean up
    return ()=>{
      setSelectedConversation(null)
    }
  },[setSelectedConversation])

  return (
    <div className='md:min-w-112.5 flex flex-col'>

      {!selectedConversation ? (
        <NoChatSelected/>
      ) : (
        <>
          <div className='bg-slate-500 px-4 py-2 mb-2'>
            <span className='label-text'>To: </span>
            <span className='text-gray-700 font-bold'>{selectedConversation.userName}</span>
          </div>
          <Messages/>
          <MessageInput/>
        </>
      )}
    </div>
  )
}
  


export default MessageContainer


const NoChatSelected = () =>{
  const {authUser} = useAuthContext()
  return (

    <div className=' w-full h-full flex item-center justify-center '>
      <div className='px-4 text-center sm:text-xl text-gray-200 font-semibold flex flex-col items-center justify-center gap-2 '>
        <p>Welcome {authUser.fullName} * </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>

  )
  
}
