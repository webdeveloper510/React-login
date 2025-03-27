import React, { useEffect, useState } from "react";
import Input from "../Common/input";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function Login() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {

  //   e.preventDefault();

  //   try {
  //     const apiUrl = `http://v01.kerne.org:500/pbx/pbx001/webapi/?module=apiLogin&username=${username}&password=${password}`;

  //     const response = await axios.get(apiUrl);
  //     if (response.data.status == "OK") {
  //       toast.success(response.data.message);
  //       setToken(response.data.token);
  //       localStorage.setItem("token", response.data.token);
  //       setTimeout(() => {
  //         navigate("/dashboard", { token: response.data.token });
  //       }, 2000);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <div className="min-h-[100vh] h-full  pt-12 bg-custom-gradient">
      <div className="grid grid-cols-12 gap-8 w-[960px] mx-auto bg-[#fff] p-6 rounded-lg">
        <div className="col-span-12 md:col-span-6">
          <img
            src="http://zp04.kerne.org/webpanel/static/media/img-01.4ed7df3a303c99050d13.webp"
            alt="login page"
            className="mx-auto my-12"
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className=" mx-auto p-8">
            <p className="text-center text-2xl font-semibold my-8">
              Login Form
            </p>
            <form >
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
              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full btn_submit"
                >
                  Sign In
                </button>
              </div>
            </form>
            {/* <div className="mt-8 flex">
              <p>Don’t have any account?</p>
              <Link to="/register" className="text-[#57b846] ml-3">
                Sign Up
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
