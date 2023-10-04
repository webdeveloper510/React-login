import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom';

import { toast } from "react-toastify";
function Landing() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate ();
  const handleLogout = async () => {
    try {
      const response = await fetch('http://v01.kerne.org:500/pbx/pbx001/webapi/?module=apiLogout', {
        method: 'GET', 
      });

      if (response.ok) {
        setIsLoggedOut(true);
        toast.success('User is logged out!');
        console.log(response)
        navigate('/');
        // You can also perform any other actions here upon successful logout
      } else {
        // Handle errors if the logout request was not successful
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred while logging out:', error);
    }
  };

  return (
    <div>
       <h1>Landing</h1>
       <div>
       <div className="text-end">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-[#57b846] text-[#fff] py-3 px-12 text-lg mx-auto rounded-[25px]"
                >
                  Logout
                </button>
              </div>
       </div>
    </div>
  )
}

export default Landing
