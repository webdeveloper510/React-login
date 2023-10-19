import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import Input from "../Common/input";
import DataTable from "react-data-table-component";
import DashboardTab from "../Common/dashboardTab";
import EditCaller from "../Common/editCaller";
import { IoIosCloseCircle } from "@react-icons/all-files/io/IoIosCloseCircle";
import DashboardUser from "./dashboardUser";

function Dashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [list, setList] = useState([]);
  const token = localStorage.getItem("token");
  const [tab_list, setTabList] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState("Home");
  const [activeTab, setActiveTab] = useState(0);

  const expandEdit = (data) => {
    const tabContent = (
      <div>
        <EditCaller data={data} />
      </div>
    );

    // Check if a tab with the same label already exists
    const tabExists = tabs.some((tab) => data.name === tab.label);

    if (!tabExists) {
      const newTab = {
        label: data.name,
        content: tabContent,
      };

      setTabs([...tabs, newTab]);
      setCurrentTab(data.name);

      // Set the active tab to the newly added tab
      setActiveTab(tabs.length);
    } else {
      // If the tab already exists, find its index and set it as the current tab
      const index = tabs.findIndex((tab) => data.name === tab.label);
      setCurrentTab(data.name);
      setActiveTab(index);
    }
  };

  const fetchData = async () => {
    try {
      const apiUrl = `http://v01.kerne.org:500/pbx/pbx001/webapi/?module=user&action=list&token=${token}`;
      const response = await axios.get(apiUrl);
      setData(response.data.user.list);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Queue",
      selector: (row) => row.queue,
      sortable: true,
    },
    {
      name: "Is Direct Allowed",
      selector: (row) => row.isDirectAllowed,
      sortable: true,
    },
    {
      name: "Has Voicemail",
      selector: (row) => row.hasVoicemail,
      sortable: true,
    },
    {
      name: "Caller Id",
      selector: (row) => row.callerid,
      sortable: true,
    },
    {
      name: "Dt Updated",
      selector: (row) => row.dtUpdated,
      sortable: true,
    },
    {
      name: "Is Fax",
      selector: (row) => row.isFax,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button onClick={() => expandEdit(row)}>
            <FaEdit className="w-5 h-5" />{" "}
          </button>
          <button>
            {" "}
            <MdDelete className="w-5 h-5" />{" "}
          </button>
        </div>
      ),
    },
  ];

  const fetchSearch = async () => {
    try {
      const apiSearch = `http://v01.kerne.org:500/pbx/pbx001/webapi/index.php?module=cdr&action=all&order=clid&searchBnt=1&searchText=206&searchType=contain&searchField=dst&searchBnt=1&calldateStart=01/01/2023&pageRecords=99&page=2&token=${token}`;
      const response = await axios.get(apiSearch);
      setSearch(response.data.cdr.list);
      console.log("Search response", response.data.cdr.list);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function handleFilter(e) {
    if (e.target.value.length > 0) {
      const filterValue = e.target.value.toLowerCase();
      const filteredData = Object.values(data).filter((row) =>
        columns.some((column) =>
          (row[column.selector] || "")
            .toString()
            .toLowerCase()
            .includes(filterValue)
        )
      );
      setData(filteredData);
    } else {
      setData(list);
    }
  }

  function createCSV() {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "id,calldate,clid,disposition,dst,duration,billsec,src,userfield\n" +
      Object.values(search)
        .map((row) =>
          [
            row.id,
            row.calldate,
            row.clid,
            row.disposition,
            row.dst,
            row.duration,
            row.billsec,
            row.src,
            row.userfield,
          ].join(",")
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  }

  const handleTabClose = (index) => {
    const updatedTabs = tabs.filter((_, i) => i !== index);
    setTabs(updatedTabs);
  };

  useEffect(() => {
    fetchData();
    fetchSearch();
  }, []);

  return (
    <>
      <div className="p-4 bg-gradient-to-r from-[#c850c0] to-[#4158d0]">
        <Link to={"/dashboard"} className="text-white">
          Home
        </Link>
      </div>

      <div className="pr-4">
        <ul className="flex border-b mt-3">
          {tabs.length > 0 &&
            tabs?.map((tab, index) => (
              <li
                key={index}
                className={`${
                  activeTab === index
                    ? "bg-gradient-to-r from-[#c850c0] to-[#4158d0] text-white"
                    : "text-blue-500 hover:bg-blue-100 border-2 border-[#c850c0]"
                } flex-1 text-center p-4 cursor-pointer  max-w-[200px] relative mx-1 rounded-lg`}
                onClick={() => setActiveTab(index)}
              >
                {data.length == 1 ? (
                  <></>
                ) : (
                  <div className="absolute right-[2px] top-[2px]  z-[999]">
                    <IoIosCloseCircle
                      className="w-6 h-6 text-[#c850c0] bg-[#fff] rounded-[50%]"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the tab click event from firing
                        handleTabClose(index);
                      }}
                    />
                  </div>
                )}

                {tab.label}
              </li>
            ))}
        </ul>
      </div>

      <div className="">{tabs[activeTab]?.content}</div>
      {/* <DashboardTab
        data={tabs}
        activeTab={currentTab}
        handler={(value) => updateTabs(value)}
        setActiveTab={setCurrentTab}
      /> */}
      <div className="px-8">
        <p className="py-4 text-3xl font-semibold">Call In Progress</p>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5"></div>
          <div className="col-span-4">
            <Input
              type="search"
              placeholder="Search ...."
              onChange={handleFilter}
            />
          </div>
          <div className="col-span-3 text-end self-center">
            <button
              className="bg-gradient-to-r from-[#c850c0] to-[#4158d0] text-white py-2 px-4 rounded-md"
              onClick={createCSV}
            >
              Download CSV
            </button>
          </div>
        </div>

        <div></div>
        <DataTable columns={columns} data={Object.values(data)} pagination />
      </div>
    </>
  );
}

export default Dashboard;
