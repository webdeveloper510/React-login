import React from "react";
import Input from "../Common/input";
import logins from "../../assets/image/img-01.webp"
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className=" bg-gradient-to-r from-[#c850c0] to-[#4158d0] h-[100vh] pt-12">
      <div className="grid grid-cols-12 gap-8 w-[960px] mx-auto bg-[#fff] p-10 rounded-lg">
      <div className="col-span-12 md:col-span-6">
          <img src={logins} alt="login page" className="mx-auto my-12" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className=" mx-auto p-8">
            <p className="text-center text-2xl font-semibold my-8">Login Form</p>
            <form>
              <div className="grid grid-cols-1 gap-4">
                  <Input type="text" label="UserName" placeholder="" />
                  <Input type="password" label="Password" placeholder="" />
                    
              </div>
              <div className="text-end">
              <Link to={'/'} >Forgot Password ? </Link>
              </div>
              <div className="text-center">
                  <button type="button" className="bg-[#57b846] mt-3 text-[#fff] py-3 px-12 text-lg mx-auto rounded-[25px]">Sign In</button>
              </div>
            </form>
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default Login;
