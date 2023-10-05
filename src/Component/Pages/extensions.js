import React from 'react'
import { Link } from 'react-router-dom'

function Extensions() {
  return (
     <div>
     <div className="p-4 bg-gradient-to-r from-[#c850c0] to-[#4158d0]">
       <Link to={"/dashboard"} className="text-white">
         {" "}
         Home
       </Link> <span className='text-white'> / </span>
       <Link to={"/extensions"} className="text-white">
         {" "}
         Extensions
       </Link>
     </div>

     <div className="pl-8">
          <div className='flex justify-between'>
          <p className="py-4 text-3xl font-semibold">Extensions</p> 

          <div className='self-center mr-8'>
               <button className='border-b-2 border-black'>+ Add Extensions</button>
          </div>
          </div>
        <div>
          <table className="table-auto w-[97%]">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Views</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Intro to CSS</td>
                <td className="border px-4 py-2">Adam</td>
                <td className="border px-4 py-2">858</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border px-4 py-2">
                  A Long and Winding Tour of the History of UI Frameworks and
                  Tools and the Impact on Design
                </td>
                <td className="border px-4 py-2">Adam</td>
                <td className="border px-4 py-2">112</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Intro to JavaScript</td>
                <td className="border px-4 py-2">Chris</td>
                <td className="border px-4 py-2">1,280</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
   </div>
  )
}

export default Extensions
