import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import SideBar from "../Sidebar/sidebar";
import Tabs from "../Common/tab";
import Dashboard from "../Pages/dashboard";

function Layout() {
  const [tabs, setTabs] = useState([
    {
      label: 'Home',
      content : <Dashboard/>,
    }])
  const [currentTab, setCurrentTab] = useState(0);
  
  const updateTabs = (value) => {
    setTabs(value)
  }

  return (
    <div className="w-full flex">
      <div className="w-3/12 h-full	bg-gradient-to-r from-[#c850c0] to-[#4158d0] sidebar">
        <SideBar  data={tabs} tabs={tabs} setTabs={setTabs}  setActiveTab={setCurrentTab}/>
      </div>
      <div className="w-9/12 h-full">
        <Tabs handler={(value)=>updateTabs(value)} activeTab={currentTab} setActiveTab={setCurrentTab} data={tabs} /> 
        {/* <Outlet /> */}
      </div>
    </div>
  );
}

export default Layout;
