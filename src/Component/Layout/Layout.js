import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import SideBar from "../Sidebar/sidebar";
import Tabs from "../Common/tab";

function Layout() {
  const [tabs, setTabs] = useState([])
  console.log ('tabs in layout ', tabs)
  const updateTabs = (value) => {
    setTabs(value)
  }

  return (
    <div className="w-full flex">
      <div className="w-3/12 h-full	bg-gradient-to-r from-[#c850c0] to-[#4158d0]">
        <SideBar handler={(value)=>updateTabs(value)} data={tabs} />
      </div>
      <div className="w-9/12 h-full">
        <Tabs handler={(value)=>updateTabs(value)} data={tabs} /> 
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
