import React from 'react'
import { Link } from 'react-router-dom'

function Queues() {
  return (
    <div>
      <div className="p-4 bg-gradient-to-r from-[#c850c0] to-[#4158d0]">
        <Link to={"/dashboard"} className="text-white">
          Home
        </Link> <span className='text-white'> / </span>
        <Link to={"/Queues"} className="text-white">
          Queues
        </Link>
      </div>
    </div>
  )
}

export default Queues
