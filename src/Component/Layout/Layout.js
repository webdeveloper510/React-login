import React from "react";
import { Outlet, useNavigate } from "react-router";
import SideBar from "../Sidebar/sidebar";

function Layout() {
  return (
    <div className="w-full flex">
      <div className="w-3/12	">
        <SideBar />
      </div>
      <div className="w-9/12">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
