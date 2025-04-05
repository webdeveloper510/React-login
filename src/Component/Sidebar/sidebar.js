import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../assets/image/better_logo.png";
import Dashboard from "../Pages/dashbaord";
import AddMedia from "../Pages/addmedia";


function SideBar({ handler, data, tabs, setTabs, setActiveTab }) {
  const [active, setActive] = useState("");
  const [expandedItem, setExpandedItem] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://v01.kerne.org:500/pbx/pbx001/webapi/?module=apiLogout",
        {
          method: "GET",
        }
      );

      if (response.ok) {
        toast.success("User is logged out!");
        console.log(response);
        localStorage.removeItem("token");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred while logging out:", error);
    }
  };

  const Lists = [
    {
      name: "Home",
      url: "/dashboard",
      component: <Dashboard />,
    },
    {
      name: "Addmedia",
      url: "/addmedia",
      component: <AddMedia />,
    },
    // {
    //   name: "Addwebsite",
    //   url: "/Addwebsite",
    //   component: <AddWebsite />,
    // },
  ];

  // console.log(Lists)

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

  const handleTab = (item) => {
    if (item.component !== undefined) {
      let does_exist = null;
      let currentIndex = tabs.length;
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].label === item.name) {
          does_exist = true;
          currentIndex = i;
        }
      }
      if (does_exist === null) {
        setTabs([
          ...tabs,
          {
            label: item.name,
            content: item.component,
            url: item.url,
          },
        ]);
      }
      setActiveTab(currentIndex);
    }
  };

  return (
    <div className="h-full">
      <div className="min-h-[100vh] h-full bg-custom-gradient">
        <img src={Logo} className="mx-auto py-4" alt="logo" />
        {/* <h2 className="mx-auto py-4 logo_text">Medical Logo</h2> */}
      
        <div className="shadow-sm min-h-[93vh] h-full">
          <div className="w-[280px] mx-auto pt-8">
            <ul>
              {Lists.map((bar, index) => (
                <li key={index}>
                  <Link
                    to={bar.url}
                    className={`flex cursor-pointer rounded-[25px] p-1 mb-3 ${
                      active === bar.url || active === bar.name
                        ? "bg-[#FFF] text-[#000]"
                        : " text-white"
                    }`}
                    onClick={() => {
                      handleTab(bar);
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
                                ? "bg-[#FFF] text-[#000]"
                                : " text-white"
                            }`}
                            onClick={() => {
                              handleClick(item.url);
                              handleTab(item);
                            }}
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
