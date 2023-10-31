import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import Input from "../Common/input";
import DataTable from "react-data-table-component";
import EditCaller from "../Common/editCaller";

function DashboardUser() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [list, setList] = useState([]);
  const token = localStorage.getItem("token");

  const [tab_list, setTabList] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState("Home");

  const expandEdit = (data) => {
    const newTab = {
      label: data.name, // You can customize this as needed
      content: (
        <div>
          <EditCaller data={data} />
        </div>
      ),
    };

    // Update the tabs state by adding the new tab
    setTabs([...tabs, newTab]);

    // Set the current tab to the newly added tab
    setCurrentTab(data.name); // You can customize this as needed
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

  useEffect(() => {
    fetchData();
    fetchSearch();
  }, []);

  return (
    <>
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

export default DashboardUser;
