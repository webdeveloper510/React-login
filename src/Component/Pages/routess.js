import React from "react";
import { Link } from "react-router-dom";

function Routess() {
  return (
    <div>
      <div className="p-4 bg-gradient-to-r from-[#c850c0] to-[#4158d0]">
        <Link to={"/dashboard"} className="text-white">
          Home
        </Link>{" "}
        <span className="text-white"> / </span>
        <Link to={"/Routes"} className="text-white">
          Routess
        </Link>
      </div>
    </div>
  );
}

export default Routess;
