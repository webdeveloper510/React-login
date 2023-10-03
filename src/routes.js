import React from 'react';
import Landing from './Component/Pages/landing';
import Login from './Component/Login/login';
import Register from './Component/Register/register';
import Page404 from './Component/Pages/page404';

const routes = [
     {
       path: '/',
       children: [
         { index: true, element: <Landing /> },
         { path: 'login', element: <Login /> },
         { path: 'register', element: <Register /> },
         { path: '*', element: <Page404 /> },
       ]
     }
   ]

export default routes