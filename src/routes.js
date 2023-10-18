import React from "react";
import Login from "./Component/Login/login";
import Register from "./Component/Register/register";
import Dashboard from "./Component/Pages/dashboard";
import Layout from "./Component/Layout/Layout";
import Extensions from "./Component/Pages/extensions";
import Queues from "./Component/Pages/queues";
import Routess from "./Component/Pages/routess";
import Monitoring from "./Component/Pages/monitoring";
import Call from "./Component/Pages/call";
import Parameters from "./Component/Pages/parameters";
import { Navigate } from "react-router-dom";

const errorRoute = () => {
  if (!localStorage.getItem("token")) {
    return "/login";
  } else {
    return "/dashboard";
  }
};

const routes = [
  {
    path: "/",
    children: [
      { path: "/login", index: true, element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "*", element: <Navigate to={errorRoute()} /> },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/extensions", element: <Extensions /> },
      { path: "/Queues", element: <Queues /> },
      { path: "/Routes", element: <Routess /> },
      { path: "/Monitoring", element: <Monitoring /> },
      { path: "/call", element: <Call /> },
      { path: "/Parameters", element: <Parameters /> },
    ],
  },
];

export default routes;
