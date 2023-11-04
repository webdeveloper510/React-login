import React, { useEffect, useState } from "react";
import Input from "./input";
import axios from "axios";
import { toast } from "react-toastify";

function EditCaller(props) {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [user, setUser] = useState({
    id: "",
    name: "",
    status: "",
    dtUpdated: "",
  });

  const handleDataChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    if (user.status === "Cancelled") {
      user.status = "C";
    } else if (user.status === "Activated") {
      user.status = "A";
    } else {
      user.status = "I";
    }
    try {
      const apiUrl = `http://v01.kerne.org:500/pbx/pbx001/webapi/?module=dialprofile&action=update&id=${user.id}&bntOK=1&name=${user.name}&description=${user.description}&status=${user.status}&token=${token}`;
      const response = await axios.post(apiUrl);
      // setData(response.data.dialprofile.list);
      console.log(response);
      toast.success(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchData = async () => {
    try {
      const apiUrl = `http://v01.kerne.org:500/pbx/pbx001/webapi/?module=dialprofile&action=list&token=${token}`;
      const response = await axios.get(apiUrl);
      setData(response.data.dialprofile.list);
      console.log("Update response:", response);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (props.data) {
      setUser(props.data);
    }
    fetchData();
  }, [props.data]);

  return (
    <>
      <div className="my-8 px-8">
        <p className="py-4 text-3xl font-semibold text-center">
          {" "}
          Edit Call In Progress
        </p>
        <form onSubmit={handleUserUpdate}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3 self-center">
              <label> Name :</label>
            </div>
            <div className="col-span-8">
              <Input
                type="text"
                defaultValue={user.name}
                label=""
                name="name"
                onChange={handleDataChange}
                placeholder="Enter Name"
              />
            </div>

            {/* <div className="col-span-3 self-center">
              <label> Description :</label>
            </div>
            <div className="col-span-8">
               <select
                value={user.dtUpdated}
                onChange={handleDataChange}
                name="dtUpdated"
                className="w-full bg-white px-4 text-base bg-[#e6e6e6] rounded-[25px] mb-3 border-b-2 mt-1 py-3"
              >
                <option value="">Select Dt Updated</option>
                <option value="A">Activated</option>
                <option value="I">Inactivated</option>
                <option value="C">Cancelled</option>
              </select> */}
            {/* <Input
                type="text"
                name="description"
                defaultValue={user.description}
                onChange={handleDataChange}
                label=""
                placeholder=""
              />
            </div> */}

            <div className="col-span-3 self-center">
              <label> Status :</label>
            </div>
            <div className="col-span-8">
              <select
                value={user.status}
                onChange={handleDataChange}
                name="status"
                className="bg-white px-4 w-full text-base bg-[#e6e6e6] rounded-[25px] mb-3 border-b-2 mt-1 pr-10 py-3"
              >
                <option value="">Select Status</option>
                <option value="Activated">Activated</option>
                <option value="Inactivated">Inactivated</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="col-span-12 text-center">
              <button
                className="bg-gradient-to-r from-[#c850c0] to-[#4158d0] text-white py-2 px-4 rounded-md"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditCaller;
