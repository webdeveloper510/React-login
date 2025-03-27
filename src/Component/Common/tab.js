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
    
      <div className="relative">{tabs[activeTab]?.content} </div>
    </div>
  );
};

export default Tabs;
