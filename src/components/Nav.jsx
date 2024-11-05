import React from "react";
import DropdownUser from "./User";
import { useLocation } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { Theme } from "./Theme";

const Nav = ({ setopen }) => {
  const location = useLocation();

  return (
    <div className="bg-cyan-700 h-32 py-5 text-white flex place-items-center justify-between px-10  dark:bg-slate-500">
      <div className="flex place-items-center gap-4">
        <button className=" lg:hidden" onClick={() => setopen((prev) => !prev)}>
          <AiOutlineMenu />
        </button>
        <h2 id="title"></h2>
      </div>
      <Theme />
      <DropdownUser />
    </div>
  );
};

export default Nav;
