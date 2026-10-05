import React, { useState } from 'react'
import {IoSearchSharp} from "react-icons/io5"
import useGetConversation from "../../hooks/useGetConversations"
import useConversation from "../../zustand/useConversation"
import toast from 'react-hot-toast'

const SearchInput = () => {

  const [search,setSearch] = useState("")
  const {setSelectedConversation} = useConversation()
  const {conversations} = useGetConversation()
  const handelSubmit = (e) =>{
    e.preventDefault()
    if(!search) return
    if(search.length < 3){
      return toast.error("Search term must be 3 character long")
    }
    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))

    if(conversation){
      setSelectedConversation(conversation)
      setSearch("")
    }else{
      toast.error("no such user found")
    }
  }
  return (
    <form onSubmit={handelSubmit} className='flex items-center gap-2'>
        <input type="text" placeholder='Search...' className='input input-bordered rounded-full' value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <IoSearchSharp />
        </button>
    </form>
  )
}

export default SearchInput