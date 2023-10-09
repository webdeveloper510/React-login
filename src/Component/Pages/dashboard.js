import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import { AiOutlineCloseCircle } from "@react-icons/all-files/ai/AiOutlineCloseCircle";
import Modal from "../Common/modal";
import Input from "../Common/input";
import DataTable from "react-data-table-component";

function Dashboard() {
  const [data, setData] = useState([]);
  const [list, setList] = useState([])
  const token = localStorage.getItem('token');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const apiUrl = `http://v01.kerne.org:500/pbx/pbx001/webapi/?module=user&action=list&token=${token}`;
      const response = await axios.get(apiUrl);
      setData(response.data.user.list);
      setList(response.data.user.list)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true
    },
    {
      name: 'Queue',
      selector: 'queue',
      sortable: true
    },
    {
      name: 'Is Direct Allowed',
      selector: 'isDirectAllowed',
      sortable: true
    },
    {
      name: 'Has Voicemail',
      selector: 'hasVoicemail',
      sortable: true
    },
    {
      name: 'Caller Id',
      selector: 'callerid',
      sortable: true
    },
    {
      name: 'Dt Updated',
      selector: 'dtUpdated',
      sortable: true
    },
    {
      name: 'Is Fax',
      selector: 'isFax',
      sortable: true
    },
    {
      name: 'Action',
      cell: (row) => (
        <div>
          <button onClick={openModal}> <FaEdit className="w-5 h-5"/> </button>
          <button> <MdDelete className="w-5 h-5" /> </button>
        </div>
      ),
    },
  ];


function handleFilter(e) {
  if (e.target.value.length > 0) {
    const filterValue = e.target.value.toLowerCase();
    const filteredData = Object.values(data).filter((row) =>
      columns.some((column) =>
        (row[column.selector] || "").toString().toLowerCase().includes(filterValue)
      )
    );
    setData(filteredData);
  } else {
    setData(list);
  }
}

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="p-4 bg-gradient-to-r from-[#c850c0] to-[#4158d0]">
        <Link to={"/dashboard"} className="text-white">
          Home
        </Link>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <button onClick={closeModal} className="absolute right-1 top-1">
          <AiOutlineCloseCircle className="w-8 h-8"/>
        </button>
        <h2 className="text-2xl">Progress Edit</h2>
        <hr className="my-2"/>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input label={'Name'} type='text' placeholder='Enter Name' />
            </div>
            <Input label={'Queue'} type='text' placeholder='Enter Queue'  />
            <Input label={'Is Direct Allowed'} type='text' placeholder='Enter Is Direct Allowed'  />
            <Input label={'Has Voicemail'} type='text' placeholder='Enter Has Voicemail'  />
            <Input label={'Caller Id'} type='text' placeholder='Enter Caller Id'  />
            <Input label={'Dt Updated'} type='text' placeholder='Enter Dt Updated'  />
            <Input label={'Is Fax'} type='text' placeholder='Enter Is Fax'  />
           
          </div>
          <div className="text-center">
            <button type="submit" className="bg-[#57b846] mt-3 text-[#fff] py-3 px-12 text-lg mx-auto rounded-[25px]">Update</button>
          </div>
        </form>
      </Modal>

      <div className="pl-8">
        <p className="py-4 text-3xl font-semibold">Call In Progress</p>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8"></div>
          <div className="col-span-4">
            <Input type='search' placeholder='Search ....' onChange={handleFilter}/>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={Object.values(data)}
          pagination
        />
      </div>
    </div>
  );
}

export default Dashboard;
