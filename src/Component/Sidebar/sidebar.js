import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../../assets/image/logo.png'


function SideBar() {
  const [active, setActive] = useState('');
  const [expandedItem, setExpandedItem] = useState(null); // Store the expanded main object
  const location = useLocation();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

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

  const Lists = [
    {
      name: 'Home ',
      url: '/dashboard',
    },
    {
      name: 'Administration',
      items: [
        {
          name: 'Extensions',
          url: '/extensions',
        },
        {
          name: 'Queues',
          url: '/Queues',
        },
        {
          name: 'Routes',
          url: '/Routes',
        },
      ],
    },
    {
      name: 'Monitoring ',
      url: '/Monitoring ',
    },
    {
      name: 'Reports',
      items: [
        {
          name: 'Call Detail Records',
          url: '/call',
        },
      ],
    },
    {
      name: 'Advanced',
      items: [
        {
          name: 'Parameters',
          url: '/Parameters',
        },
      ],
    },
  ];

  useEffect(() => {
    // Find the active URL and set it in the state
    const activeItem = Lists.find((bar) =>
      location.pathname.startsWith(bar.url)
    );
    if (activeItem) {
      setActive(activeItem.url);
    }
  }, [location.pathname]);

  const handleClick = (urlOrName) => {
    setActive(urlOrName);
  };

  const toggleItem = (url) => {
    setExpandedItem((prevExpandedItem) =>
      prevExpandedItem === url ? null : url
    );
  };

  return (
    <div className="">
      <div className="bg-gradient-to-r from-[#c850c0] to-[#4158d0] h-[100vh]">
        <img src={Logo} className='mx-auto py-4' alt='logo'/>
        <div className="shadow-sm h-[93vh]">
          <div className="w-[280px] mx-auto pt-8">
            <ul>
              {Lists.map((bar, index) => (
                <li key={index}>
                  <Link
                    to={bar.url}
                    className={`flex cursor-pointer rounded-[25px] p-1 mb-3 ${
                      active === bar.url || active === bar.name
                        ? 'bg-[#FFF] text-[#000]'
                        : ' text-white'
                    }`}
                    onClick={() => {
                      toggleItem(bar.name);
                      handleClick(bar.url || bar.name);
                    }}
                  >
                    <span className="self-center text-left w-full pl-12">
                      {bar.name}
                    </span>
                  </Link>
                  {/* Render sub-items if the item is expanded */}
                  {expandedItem === bar.name && bar.items && (
                    <ul>
                      {bar.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Link
                            to={item.url}
                            className={`rounded-[25px] flex p-1 mb-3 ml-3 mt-3 ${
                              active === item.url
                                ? 'bg-[#FFF] text-[#000]'
                                : ' text-white'
                            }`}
                            onClick={() => handleClick(item.url)}
                          >
                            <span className="self-center text-left w-full pl-12">
                              {item.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li onClick={handleLogout} className="cursor-pointer">
                <span className="self-center text-left w-full pl-12 text-white ml-1">
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;