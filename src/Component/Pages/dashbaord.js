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
import deleteImage from "../../assets/image/x-button.png";

function Dashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [list, setList] = useState([]);
  const token = localStorage.getItem("token");
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState("Home");
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState(null);
  const [status, setStatus] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [selectedData, setSelectedData] = useState("");

  const handleDataChange = (event) => {
    // if (selectedData.status === "Cancelled") {
    //   selectedData.status = "C";
    // } else if (selectedData.status === "Activated") {
    //   selectedData.status = "A";
    // } else {
    //   selectedData.status = "I";
    // }
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = `http://v01.kerne.org:500/pbx/pbx001/webapi/?module=dialprofile&action=update&id=${selectedData.id}&bntOK=1&name=${selectedData.name}&description=${selectedData.description}&status=${selectedData.status}&token=${token}`;
      const response = await axios.post(apiUrl);
      console.log(response);
      toast.success(response.data.message);
      fetchData();
      localStorage.removeItem("modalEdit");
      editClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    localStorage.setItem("modalOpen", true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    localStorage.removeItem("modalOpen");
  };

  const editOpen = (data) => {
    setIsEditOpen(true);
    console.log(data.dtUpdated);
    console.log(data);
    setSelectedData(data);
    localStorage.setItem("modalEdit", true);
    localStorage.setItem("modalData", JSON.stringify(data));
  };

  const editClose = () => {
    setIsEditOpen(false);
    localStorage.removeItem("modalEdit");
  };

  const openModal1 = (id) => {
    setIsModalOpen1(true);
    setSelectedDeleteId(id);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };

  // const expandEdit = (data) => {
  //   const tabContent = (
  //     <div>
  //       <EditCaller
  //         data={{
  //           id: data.id,
  //           name: data.name,
  //           status: data.status,
  //           description: data.description,
  //         }}
  //       />
  //     </div>
  //   );

  //   const tabExists = tabs.some((tab) => data.name === tab.label);

  //   if (!tabExists) {
  //     const newTab = {
  //       label: data.name,
  //       content: tabContent,
  //     };

  //     setTabs([...tabs, newTab]);
  //     setCurrentTab(data.name);
  //     setActiveTab(tabs.length);
  //   } else {
  //     const index = tabs.findIndex((tab) => data.name === tab.label);
  //     setCurrentTab(data.name);
  //     setActiveTab(index);
  //   }
  // };

  const fetchData = async () => {
    try {
      const apiUrl = `http://v01.kerne.org:500/pbx/pbx001/webapi/?module=dialprofile&action=list&token=${token}`;
      const response = await axios.get(apiUrl);
      setData(response.data.dialprofile.list);
      setList(response.data.dialprofile.list)
      console.log("get data =====>>", response.data.dialprofile.list);
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
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button onClick={() => editOpen(row)}>
            <FaEdit className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              openModal1(row.id);
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
      setIsModalOpen1(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchSearch = async () => {
    try {
      const apiSearch = `http://v01.kerne.org:500/pbx/pbx001/webapi/index.php?module=cdr&action=all&order=clid&searchBnt=1&searchText=206&searchType=contain&searchField=dst&searchBnt=1&calldateStart=01/01/2023&pageRecords=99&page=2&token=${token}`;
      const response = await axios.get(apiSearch);
      setSearch(response.data.cdr.list);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function handleFilter(e) {
    if (e.target.value.length > 0) {
      const filterValue = e.target.value.toLowerCase();
      const filteredData = Object.values(data).filter((row) =>
        columns.some((column) =>
       // console.log(column.name)
       // console.log(row)
          (row['name'] || "")
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

  // const handleTabClose = (index) => {
  //   const updatedTabs = tabs.filter((_, i) => i !== index);
  //   setTabs(updatedTabs);
  // };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const apiAdd = `http://v01.kerne.org:500/pbx/pbx001/webapi/?module=dialprofile&action=add&name=${name}&description=${description}&status=${status}&token=${token}&status=A&bntOK=1`;
      const response = await axios.post(apiAdd);
      setIsModalOpen(false);
      toast.success(response.data.message);
      fetchData();
      localStorage.removeItem("modalOpen");
      // if (
      //   response.data &&
      //   response.data.dialprofile &&
      //   response.data.dialprofile.list
      // ) {
      //   fetchData();
      // } else {
      //   console.error("API response structure is not as expected.");
      // }
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
    const isOpen1 = localStorage.getItem("modalEdit") === "true";
    const data = JSON.parse(localStorage.getItem("modalData"));
    setSelectedData(data);
    setIsEditOpen(isOpen1);
    const isOpen = localStorage.getItem("modalOpen") === "true";
    setIsModalOpen(isOpen);
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

      <Modal isOpen={isModalOpen1} onClose={closeModal1}>
        <button onClick={closeModal1} className="absolute right-1 top-1">
          <AiOutlineCloseCircle className="w-8 h-8" />
        </button>
        <img
          src={deleteImage}
          alt="Delete Icons"
          className="text-center mt-4 h-[120px] mx-auto"
        />
        <div className="text-center text-4xl my-8">Are you Sure ?</div>
        <div className="text-center mb-4">
          <button
            type="button"
            onClick={closeModal1}
            className="bg-[#fff] border-2 mr-3 border-[#57b846] mt-3 text-[#57b846] py-3 px-12 text-lg mx-auto rounded-[25px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              handleDelete(selectedDeleteId);
            }}
            className="bg-[#57b846] border-2 border-[#57b846] mt-3 text-[#fff] py-3 px-12 text-lg mx-auto rounded-[25px]"
          >
            Yes
          </button>
        </div>
      </Modal>

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
            <div className="col-span-2">
              <label> Status </label>
              <select
                onChange={(e) => setStatus(e.target.value)}
                name="status"
                className="w-full bg-white px-4 text-base bg-[#e6e6e6] rounded-[25px] mb-3 border-b-2 mt-1 py-3"
              >
                <option value="A" selected>
                  Activated
                </option>
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

      <Modal isOpen={isEditOpen} onClose={editClose}>
        <button onClick={editClose} className="absolute right-1 top-1">
          <AiOutlineCloseCircle className="w-8 h-8" />
        </button>
        <h2 className="text-2xl">Edit Call In Progress</h2>
        <hr className="my-2" />
        <form onSubmit={handleUserUpdate}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input
                label={"Name"}
                name="name"
                defaultValue={selectedData ? selectedData.name : ""}
                type="text"
                onChange={handleDataChange}
                placeholder="Enter Name"
              />
            </div>
            <div className="col-span-2">
              <label> Status </label>
              <select
                defaultValue={selectedData?.status}
                onChange={handleDataChange}
                name="status"
                className="w-full bg-white px-4 text-base bg-[#e6e6e6] rounded-[25px] mb-3 border-b-2 mt-1 py-3"
              >
                <option value="">Select Status</option>
                <option value="Activated">Activated</option>
                <option value="Inactivated">Inactivated</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#57b846] mt-3 text-[#fff] py-3 px-12 text-lg mx-auto rounded-[25px]"
            >
              Edit Call In Progress
            </button>
          </div>
        </form>
      </Modal>
      {/* <div className="pr-4">
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

      <div className="">{tabs[activeTab]?.content}</div> */}

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
              className="bg-gradient-to-r from-[#c850c0] to-[#4158d0] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white py-2 px-4 rounded-md"
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
