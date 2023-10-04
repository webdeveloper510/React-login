import React, { useState } from "react";
import Input from "../Common/input";
import logins from "../../assets/image/img-01.webp";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate  } from 'react-router-dom';

import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate ();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Construct the API URL with query parameters
      const apiUrl = `http://v01.kerne.org:500/pbx/pbx001/webapi/?module=apiLogin&username=${username}&password=${password}`;

      // Send a GET request to the API using Axios
      const response = await axios.get(apiUrl);
      if (response.data.status == 'OK' ) {
        // Successful login
        toast.success(response.data.message);
        navigate('/dashboard');
      } else {
        // Handle login failure
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
    }
  };
  return (
    <div className=" bg-gradient-to-r from-[#c850c0] to-[#4158d0] h-[100vh] pt-12">
      <div className="grid grid-cols-12 gap-8 w-[960px] mx-auto bg-[#fff] p-10 rounded-lg">
        <div className="col-span-12 md:col-span-6">
          <img src={logins} alt="login page" className="mx-auto my-12" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className=" mx-auto p-8">
            <p className="text-center text-2xl font-semibold my-8">
              Login Form
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  type="text"
                  label="UserName"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder=""
                />
                <Input
                  type="password"
                  label="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=""
                />
              </div>
              <div className="text-end">
                <Link to={"/"}>Forgot Password ? </Link>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#57b846] mt-3 text-[#fff] py-3 px-12 text-lg mx-auto rounded-[25px]"
                >
                  Sign In
                </button>
              </div>
            </form>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
