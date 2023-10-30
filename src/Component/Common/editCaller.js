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
    try {
      const apiUrl = `http://v01.kerne.org:500/pbx/pbx001/webapi/?module=dialprofile&action=update&id=${user.id}&bntOK=1&name=${user.name}&dtUpdated=${user.dtUpdated}&status=${user.status}&token=${token}`;
      const response = await axios.post(apiUrl);
      // setData(response.data.dialprofile.list);
      console.log(response);
      toast.success(response.data.message);
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

            <div className="col-span-3">
              <label> Dt Updated :</label>
            </div>
            <div className="col-span-8">
              <Input
                type="text"
                name="dtUpdated"
                defaultValue={user.dtUpdated}
                onChange={handleDataChange}
                label=""
                placeholder=""
              />
            </div>

            <div className="col-span-3">
              <label> Status :</label>
            </div>
            <div className="col-span-8">
              <Input
                type="text"
                name="status"
                defaultValue={user.status}
                onChange={handleDataChange}
                label=""
                placeholder=""
              />
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
