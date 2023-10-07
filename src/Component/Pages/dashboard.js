import  axios  from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import { AiOutlineCloseCircle } from "@react-icons/all-files/ai/AiOutlineCloseCircle";
import Modal from "../Common/modal";
import Input from "../Common/input";

function Dashboard() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  console.log('Store data =======>>> ',data)
  const fetchData = async () => {

    try {
    
      const apiUrl = `http://v01.kerne.org:500/pbx/pbx001/webapi/?module=user&action=list&token=${token}`;

    await axios.get(apiUrl).then(res=>{
       setData(res.data.user.list)
      //  let columns = (res.data.user.list)
          console.log(res)
    })
    } catch (error) {
      console.error("Error:", error);
    }
  };
 

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="p-4 bg-gradient-to-r from-[#c850c0] to-[#4158d0]">
        <Link to={"/dashboard"} className="text-white">
          {" "}
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
            <Input label={'hello'} type='text' />
            <Input label={'hello'} type='text' />
            <Input label={'hello'} type='text' />
            <Input label={'hello'} type='text' />
            <Input label={'hello'} type='text' />
            <Input label={'hello'} type='text' />
            <Input label={'hello'} type='text' />
          </div>
        </form>
        
      </Modal>


      <div className="pl-8">
          <p className="py-4 text-3xl font-semibold">Call In Progress</p>
        <div className="w-full overflow-x-auto">
          <table className="table-auto ">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Queue</th>
                <th className="px-4 py-2">Is Direct Allowed</th>
                <th className="px-4 py-2">Has Voicemail</th>
                <th className="px-4 py-2">Caller Id</th>
                <th className="px-4 py-2">Dt Updated</th>
                <th className="px-4 py-2">Is Fax</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
            {Object.values(data).map((item) => (
              <tr>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.queue}</td>
                <td className="border px-4 py-2">{item.isDirectAllowed}</td>
                <td className="border px-4 py-2">{item.hasVoicemail}</td>
                <td className="border px-4 py-2">{item.callerid}</td>
                <td className="border px-4 py-2">{item.dtUpdated}</td>
                <td className="border px-4 py-2">{item.isFax}</td>
                <td className="border px-4 py-2">
                  <button  onClick={openModal}> <FaEdit className="w-5 h-5"/> </button>
                  <button> <MdDelete className="w-5 h-5" /> </button>
                </td>
              </tr>
              ))}
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
