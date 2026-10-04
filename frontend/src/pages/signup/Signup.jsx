import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const Signup = () => {
  const [inputs,setInputs] = useState({
    fullName:"",
    userName:"",
    password:"",
    confirmPassword:"",
    gender:"male"
  })

  const {loading,signup} = useSignup()

  const handelCheckboxChange = (gender) =>{
    setInputs({...inputs,gender})
  }

  const handelSubmit = async(e) =>{
    e.preventDefault()
    console.log(inputs);
    await signup(inputs)

    // form submit logic

    
  }
  return (
    <div className="flex flex-col justify-center items-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/20 backdrop-blur-lg ">
        <h1 className="text-3xl font-semibold text-center text-gray-300 ">
          Signup
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <form onSubmit={handelSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter fullname"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={(e) => setInputs({...inputs,fullName:e.target.value})}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              value={inputs.userName}
              onChange={(e)=> setInputs({...inputs,userName:e.target.value})}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input type="password" placeholder="Enter Password"
            className="w-full input input-bordered h-10"
            value={inputs.password} 
            onChange={(e)=> setInputs({...inputs,password:e.target.value})} />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input type="password" placeholder="Enter Confirm Password"
            value={inputs.confirmPassword}
            onChange={(e)=> setInputs({...inputs,confirmPassword:e.target.value})}
            className="w-full input input-bordered h-10" />
          </div>
          <GenderCheckBox onCheckboxChange = {handelCheckboxChange} selectedGender={inputs.gender}/>
          <Link to="/signin" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            Already have an account
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              { loading ? <span className='loading loading-spinner'></span> : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup