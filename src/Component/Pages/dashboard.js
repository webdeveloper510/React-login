import  axios  from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  console.log('Store data =======>>> ',data)

  const fetchList = async () => {
   let res =  await axios.get(`http://v01.kerne.org:500/pbx/pbx001/webapi/?module=${'dialprofile'}&action=${'list'}`).then(res=>{
    return res
   })
   return res
  }
  const fetchData = async () => {

    try {
    
      const apiUrl = `http://v01.kerne.org:500/pbx/pbx001/webapi/?module=apiLogin&username=webapi&password=2j9k4p5t7q`;

    await axios.get(apiUrl).then(res=>{
      if(res.status === 200){
        fetchList().then(res=>{
          console.log(res)
        })
      }
    })
    } catch (error) {
      console.error("Error:", error);
    }
  };
 
  return (
    <div>
      <div className="p-4 bg-gradient-to-r from-[#c850c0] to-[#4158d0]">
        <Link to={"/dashboard"} className="text-white">
          {" "}
          Home
        </Link>
      </div>

      <div className="pl-8">
          <p className="py-4 text-3xl font-semibold">Call In Progress</p>

          {/* <ul>
        {data.map((item, index) => (
          <li key={index}>{item.dialprofile}</li>
        ))}
      </ul> */}
        <div>
          <table className="table-auto">
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
  );
}

export default Dashboard;
