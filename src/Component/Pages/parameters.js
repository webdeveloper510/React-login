import React from 'react'
import { Link } from 'react-router-dom'

function Parameters() {
  return (
    <div>
     <div className="p-4 bg-gradient-to-r from-[#c850c0] to-[#4158d0]">
        <Link to={"/dashboard"} className="text-white">
          Home
        </Link> <span className='text-white'> / </span>
        <Link to={"/Parameters"} className="text-white">
          Parameters
        </Link>
      </div>
    </div>
  )
}

export default Parameters
