import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
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
        <div>
          <table class="table-auto">
            <thead>
              <tr>
                <th class="px-4 py-2">Title</th>
                <th class="px-4 py-2">Author</th>
                <th class="px-4 py-2">Views</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Intro to CSS</td>
                <td class="border px-4 py-2">Adam</td>
                <td class="border px-4 py-2">858</td>
              </tr>
              <tr class="bg-gray-100">
                <td class="border px-4 py-2">
                  A Long and Winding Tour of the History of UI Frameworks and
                  Tools and the Impact on Design
                </td>
                <td class="border px-4 py-2">Adam</td>
                <td class="border px-4 py-2">112</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Intro to JavaScript</td>
                <td class="border px-4 py-2">Chris</td>
                <td class="border px-4 py-2">1,280</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
