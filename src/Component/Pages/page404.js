import React from "react";
import {links, NavLink, useNavigate} from 'react-router-dom';
import notfound from '../../assets/image/error.webp';

const Page404 = () =>{
    return(
        <>
         <div className='text-center'>
            <div className='notfound-section'>
            <div className="mx-auto">
                <img src={notfound} alt="404error" className="mx-auto" />
                </div>

            <h1 className="text-4xl">OOPS !</h1>
            <p className="text-2xl">We can't seem to find the page you are looking for !</p>

            <NavLink className='text-[#FDC101] my-3' to="/">Go to Homepage</NavLink>
            </div>
            </div>
        
        </>
    )
}


export default Page404;