import React from "react";
import { Navigate } from "react-router-dom";

import Login from "./Component/Login/login";
import Layout from "./Component/Layout/Layout";
import Dashboard from "./Component/Pages/dashbaord";
import AddMedia from "./Component/Pages/addmedia";

// import Register from "./Component/Register/register";
// import Extensions from "./Component/Pages/extensions";
// import Queues from "./Component/Pages/queues";
// import Routess from "./Component/Pages/routess";
// import Monitoring from "./Component/Pages/monitoring";
// import Call from "./Component/Pages/call";
// import Parameters from "./Component/Pages/parameters";

const routes = [
  {
    path: "/",
    children: [
      { path: "/", index: true, element: <Login /> },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/addmedia", element: <AddMedia /> },
      // { path: "/extensions", element: <Extensions /> },
      // { path: "/Queues", element: <Queues /> },
      // { path: "/Routes", element: <Routess /> },
      // { path: "/Monitoring", element: <Monitoring /> },
      // { path: "/call", element: <Call /> },
      // { path: "/Parameters", element: <Parameters /> },
    ],
  },
];

export default routes;
