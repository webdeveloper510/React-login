import React from 'react';
import Login from './Component/Login/login';
import Register from './Component/Register/register';
import Page404 from './Component/Pages/page404';
import Dashboard from './Component/Pages/dashboard';
import Layout from './Component/Layout/Layout';
import Extensions from './Component/Pages/extensions';
import Queues from './Component/Pages/queues';
import Routess from './Component/Pages/routess';
import Monitoring from './Component/Pages/monitoring';
import Call from './Component/Pages/call';
import Parameters from './Component/Pages/parameters';


const routes = [
     {
       path: '/',
       children: [
         { index: true, element: <Login /> },
         { path: '/register', element: <Register /> },
         { path: '*', element: <Page404 /> },
       ]
     },
     {
       path: '/',
       element: <Layout />,
       children: [
         { index: true, path:'/dashboard', element: <Dashboard /> },
         { path: '/extensions', element: <Extensions /> },
         { path: '/Queues', element: <Queues /> },
         { path: '/Routes', element: <Routess /> },
         { path: '/Monitoring', element: <Monitoring /> },
         { path: '/call', element: <Call /> },
         { path: '/Parameters', element: <Parameters /> },
       ]
     }
   ]

export default routes