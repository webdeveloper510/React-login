import React from "react";
import Input from "../Common/input";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div>
      <div className=" bg-gradient-to-r from-[#c850c0] to-[#4158d0] h-[100vh] pt-12">
      <div className="grid grid-cols-12 gap-8 w-[700px] mx-auto bg-[#fff] p-10 rounded-lg">
        <div className="col-span-12">
          <div className=" mx-auto p-8">
            <p className="text-center text-2xl font-semibold my-8">Register Form</p>
            <form>
              <div className="grid grid-cols-2 gap-4">
                  <Input type="text" label="Name" placeholder="" />
                  <Input type="email" label="Email Address" placeholder="" />
                  <Input type="password" label="Password" placeholder="" />
                  <Input type="password" label="Confirm Password" placeholder="" />
                    
              </div>
              <div className="text-center">
                  <button type="button" className="bg-[#57b846] mt-3 text-[#fff] py-3 px-12 text-lg mx-auto rounded-[25px]">Sign Up</button>
              </div>
            </form>
            <div className="mt-8 flex justify-center">
              <p>Already have any account?</p>
              <Link to='/' className="text-[#57b846] ml-3">Sign In</Link>
             </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Register
