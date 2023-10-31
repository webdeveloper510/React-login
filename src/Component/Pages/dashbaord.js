import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import Input from "../Common/input";
import DataTable from "react-data-table-component";
import EditCaller from "../Common/editCaller";
import { IoIosCloseCircle } from "@react-icons/all-files/io/IoIosCloseCircle";
import Modal from "../Common/modal";
import { AiOutlineCloseCircle } from "@react-icons/all-files/ai/AiOutlineCloseCircle";
import { toast } from "react-toastify";

function Dashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [list, setList] = useState([]);
  const token = localStorage.getItem("token");
  const [tab_list, setTabList] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState("Home");
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [dtUpdated, setDtUpdated] = useState(false);
  const [status, setStatus] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const expandEdit = (data) => {
    const tabContent = (
      <div>
        <EditCaller
          data={{
            id: data.id,
            name: data.name,
            status: data.status,
            dtUpdated: data.dtUpdated,
          }}
        />
      </div>
    );

    const tabExists = tabs.some((tab) => data.name === tab.label);

    if (!tabExists) {
      const newTab = {
        label: data.name,
        content: tabContent,
      };

      setTabs([...tabs, newTab]);
      setCurrentTab(data.name);
      setActiveTab(tabs.length);
    } else {
      const index = tabs.findIndex((tab) => data.name === tab.label);
      setCurrentTab(data.name);
      setActiveTab(index);
    }
  };

  const fetchData = async () => {
    try {
      const apiUrl = `http://v01.kerne.org:500/pbx/pbx001/webapi/?module=dialprofile&action=list&token=${token}`;
      const response = await axios.get(apiUrl);
      setData(response.data.dialprofile.list);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    {
      name: "S. No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Dt Updated",
      selector: (row) => row.dtUpdated,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button onClick={() => expandEdit(row)}>
            <FaEdit className="w-5 h-5" />{" "}
          </button>
          <button
            onClick={() => {
              handleDelete(row.id);
            }}
          >
            <MdDelete className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      const apiDelete = `http://v01.kerne.org:500/pbx/pbx001/webapi/?module=dialprofile&action=delete&id=${id}&bntOK=1&token=${token}`;
      const response = await axios.get(apiDelete);
      const updatedOffers = Object.values(data).filter(
        (data) => data.id !== id
      );
      setData(updatedOffers);
      toast.success(response.data.message);
      // console.log("Search response", updatedOffers);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchSearch = async () => {
    try {
      const apiSearch = `http://v01.kerne.org:500/pbx/pbx001/webapi/index.php?module=cdr&action=all&order=clid&searchBnt=1&searchText=206&searchType=contain&searchField=dst&searchBnt=1&calldateStart=01/01/2023&pageRecords=99&page=2&token=${token}`;
      const response = await axios.get(apiSearch);
      setSearch(response.data.cdr.list);
      // console.log("Search response", response.data.cdr.list);
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const apiAdd = `http://v01.kerne.org:500/pbx/pbx001/webapi/?module=dialprofile&action=add&name=${name}&dtUpdated=${dtUpdated}&status=${status}&token=${token}&status=A&bntOK=1`;
      const response = await axios.post(apiAdd);
      // setData(response);
      // console.log("add user======>>>", response);
      setIsModalOpen(false);
      toast.success(response.data.message);
      if (
        response.data &&
        response.data.dialprofile &&
        response.data.dialprofile.list
      ) {
        fetchData();
      } else {
        console.error("API response structure is not as expected.");
      }

      // Close the modal
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const savedTabs = localStorage.getItem("tabs");
    if (savedTabs) {
      setTabs(JSON.parse(savedTabs));
    }
    fetchData();
    fetchSearch();
  }, []);

  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs));
  }, [tabs]);

  return (
    <>
      <div className="p-4 bg-gradient-to-r from-[#c850c0] to-[#4158d0]">
        <Link to={"/dashboard"} className="text-white">
          Home
        </Link>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <button onClick={closeModal} className="absolute right-1 top-1">
          <AiOutlineCloseCircle className="w-8 h-8" />
        </button>
        <h2 className="text-2xl">Progress</h2>
        <hr className="my-2" />
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input
                label={"Name"}
                name="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
              />
            </div>

            <div>
              <label> Dt Updated </label>
              <select
                onChange={(e) => setDtUpdated(e.target.value)}
                name="dtUpdated"
                className="w-full bg-white px-4 text-base bg-[#e6e6e6] rounded-[25px] mb-3 border-b-2 mt-1 py-3"
                displayEmpty
              >
                <option value="">Select Dt Updated</option>
                <option value="A">Activated</option>
                <option value="I">Inactivated</option>
                <option value="C">Cancelled</option>
              </select>
            </div>

            <div>
              <label> Status </label>
              <select
                onChange={(e) => setStatus(e.target.value)}
                name="status"
                className="w-full bg-white px-4 text-base bg-[#e6e6e6] rounded-[25px] mb-3 border-b-2 mt-1 py-3"
                displayEmpty
              >
                <option value="">Select Status</option>
                <option value="A">Activated</option>
                <option value="I">Inactivated</option>
                <option value="C">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#57b846] mt-3 text-[#fff] py-3 px-12 text-lg mx-auto rounded-[25px]"
            >
              Add User
            </button>
          </div>
        </form>
      </Modal>
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

      <div className="px-8">
        <div className="grid grid-cols-12 gap-4 ">
          <div className="col-span-6">
            <p className="py-4 text-3xl font-semibold">Call In Progress</p>
          </div>
          <div className="col-span-6 justify-end flex">
            <button
              className="border-b-2 border-black self-center"
              type="button"
              onClick={openModal}
            >
              + Add Record
            </button>
          </div>
        </div>
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

        <DataTable columns={columns} data={Object.values(data)} pagination />
      </div>
    </>
  );
}

export default Dashboard;
