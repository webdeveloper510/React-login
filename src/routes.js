import React from 'react';
import Landing from './Component/Pages/landing';
import Login from './Component/Login/login';
import Register from './Component/Register/register';
import Page404 from './Component/Pages/page404';
import Dashboard from './Component/Pages/dashboard';
import Layout from './Component/Layout/Layout';
import Extensions from './Component/Pages/extensions';


const routes = [
     {
       path: '/',
       children: [
         { index: true, element: <Login /> },
         { path: 'register', element: <Register /> },
         { path: 'Landing', element: <Landing /> },
         { path: '*', element: <Page404 /> },
       ]
     },
     {
       path: '/',
       element: <Layout />,
       children: [
         { index: true, path:'/dashboard', element: <Dashboard /> },
         { path: 'extensions', element: <Extensions /> },
       ]
     }
   ]

export default routes