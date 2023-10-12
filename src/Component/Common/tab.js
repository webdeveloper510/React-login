import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "@react-icons/all-files/io/IoIosCloseCircle";
import { useNavigate } from "react-router-dom";
const Tabs = ({ data, activeTab, setActiveTab, handler }) => {
  const [tabs, setTabs] = useState([]);
  const navigate = useNavigate();
  // const [closedTabs, setClosedTabs] = useState([]); // Keep track of closed tabs

  const handleTabClose = (index) => {
    const updated_list = [];
    for (let i = 0; i < data.length; i++) {
      if (i !== index) {
        updated_list.push(data[i]);
      }
    }
    handler(updated_list);
    if (updated_list.length > 1) {
      if (index === activeTab) {
        let last_index = updated_list.length - 1;
        setActiveTab(last_index);
      } else if (index < activeTab) {
        setActiveTab(Number(activeTab) - 1);
      }
    }
    // const updatedTabs = tabs.filter((_, i) => i !== index);
    // setTabs(updatedTabs);
    // setClosedTabs([...closedTabs, closedTab])
    // if (index === activeTab) {
    //   setActiveTab(Math.min(activeTab, updatedTabs.length - 1));
    // }
  };

  useEffect(() => {
    if (data.length !== 0) {
      setTabs(data);
    }
  }, [data]);

  return (
    <div>
      <div className="pr-4">
        <ul className="flex border-b mt-3">
          {tabs.length > 0 &&
            tabs?.map((tab, index) => (
              <li
                key={index}
                className={`${
                  activeTab === index
                    ? "bg-gradient-to-r from-[#c850c0] to-[#4158d0] text-white"
                    : "text-blue-500 hover:bg-blue-100 "
                } flex-1 text-center p-4 cursor-pointer  max-w-[200px] relative`}
                onClick={() => setActiveTab(index)}
              >
                {data.length == 1 ? (
                  <></>
                ) : (
                  <div className="absolute right-[-12px] top-[-12px]  z-[999]">
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

      <div className="">{tabs[activeTab]?.content} </div>
    </div>
  );
};

export default Tabs;
