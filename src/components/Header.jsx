import { useState } from "react";
import { FaBoxOpen, FaWarehouse } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { SiHackthebox } from "react-icons/si";
import { useLocation, Link } from "react-router-dom";
import { HiTemplate } from "react-icons/hi";
import { useAuth } from "../auth/AuthProvider";

export default function Drawer({ open = true, setopen }) {
  const { pathname } = useLocation();
  const [selected, setSelected] = useState(pathname || "/");

  const { role } = useAuth();

  const handleCloseDrawer = () => {
    setopen(false);
  };

  return (
    <nav
      className={`bg-sky-600 max-lg:fixed max-lg:h-full z-50 text-white flex-shrink-0 overflow-hidden 
  transition-all duration-400 ${
    open ? "w-60 opacity-100" : "w-0 opacity-0"
  } overflow-hidden`}
    >
      <div className="w-full py-4 shadow-md px-6 flex justify-between place-items-center">
        <Link to="/">
          <span
            onClick={() => setSelected("/")}
            className="flex justify-center items-center gap-2 text-xl font-medium"
          >
            <FaWarehouse /> StockHouse
          </span>
        </Link>
        <button className=" lg:hidden" onClick={handleCloseDrawer}>
          <IoCloseSharp size={20} />
        </button>
      </div>

      <div className="w-full flex flex-col gap-2 py-4 px-2">
        <Link to="/">
          <span
            onClick={() => setSelected("/")}
            className={`flex items-center gap-1 text-lg font-medium ${
              selected === "/" && "bg-black bg-opacity-45"
            } p-2 rounded-lg`}
          >
            <RiDashboardHorizontalFill /> Dashboard
          </span>
        </Link>

        <Link to="/table">
          <span
            onClick={() => setSelected("/table")}
            className={`flex items-center gap-1 text-lg font-medium ${
              selected === "/table" && "bg-black bg-opacity-45"
            } p-2 rounded-lg`}
          >
            <SiHackthebox /> Tabel Barang
          </span>
        </Link>

        <Link to="/supplier">
          <span
            onClick={() => setSelected("/supplier")}
            className={`flex items-center gap-1 text-lg font-medium ${
              selected === "/supplier" && "bg-black bg-opacity-45"
            } p-2 rounded-lg`}
          >
            <FaBoxOpen /> Tabel Supplier
          </span>
        </Link>
        <Link to="/semuabarang">
          <span
            onClick={() => setSelected("/semuabarang")}
            className={`flex items-center gap-1 text-lg font-medium ${
              selected === "/semuabarang" && "bg-black bg-opacity-45"
            } p-2 rounded-lg`}
          >
            <HiTemplate /> Semua Barang
          </span>
        </Link>
      </div>
    </nav>
  );
}
