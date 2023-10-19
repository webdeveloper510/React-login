import React, { useEffect, useState } from "react";
import Radio from "../Common/radio";
import Input from "./input";

function EditCaller(props) {
  const [user, setUser] = useState({
    name: "",
    queue: "",
    status: "",
    isFax: "",
    isDirectAllowed: "",
    callerid: "",
    dtUpdated: "",
    hasVoicemail: "",
  });

  const handleDataChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  console.log(user);

  console.log("user in array", props.data);

  useEffect(() => {
    setUser(props.data);
  }, [props.data]);
  return (
    <>
      <div className="my-8 px-8">
        <p className="py-4 text-3xl font-semibold text-center">
          {" "}
          Edit Call In Progress
        </p>
        <form>
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
              <label> Queue :</label>
            </div>
            <div className="col-span-8">
              <Input
                type="text"
                label=""
                name="queue"
                onChange={handleDataChange}
                defaultValue={user.queue}
                placeholder=""
              />
            </div>

            <div className="col-span-3">
              <label> Is Direct Allowed :</label>
            </div>
            <div className="col-span-8">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <Radio
                    label="No"
                    checked={user.isDirectAllowed === "no"}
                    name="isDirectAllowed"
                    id="radioOption1"
                    value="no"
                    onChange={handleDataChange}
                  />
                </div>
                <div className="col-span-6">
                  <Radio
                    label="Yes"
                    checked={user.isDirectAllowed === "yes"}
                    name="isDirectAllowed"
                    id="radioOption2"
                    value="yes"
                    onChange={handleDataChange}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-3">
              <label> Has Voicemail :</label>
            </div>
            <div className="col-span-8">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <Radio
                    label="No"
                    checked={user.hasVoicemail === "no"}
                    name="hasVoicemail"
                    id="radioOption1"
                    value="no"
                    onChange={handleDataChange}
                  />
                </div>
                <div className="col-span-6">
                  <Radio
                    label="Yes"
                    checked={user.hasVoicemail === "yes"}
                    name="hasVoicemail"
                    id="radioOption2"
                    value="yes"
                    onChange={handleDataChange}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-3">
              <label> Caller Id :</label>
            </div>
            <div className="col-span-8">
              <Input
                type="number"
                name="callerid"
                defaultValue={user.callerid}
                onChange={handleDataChange}
                label=""
                placeholder=""
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
              <label> Is Fax :</label>
            </div>
            <div className="col-span-8">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <Radio
                    label="No"
                    checked={user.isFax === "no"}
                    name="isFax"
                    id="radioOption1"
                    value="no"
                    onChange={handleDataChange}
                  />
                </div>
                <div className="col-span-6">
                  <Radio
                    label="Yes"
                    checked={user.isFax === "yes"}
                    name="isFax"
                    id="radioOption2"
                    value="yes"
                    onChange={handleDataChange}
                  />
                </div>
              </div>
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
