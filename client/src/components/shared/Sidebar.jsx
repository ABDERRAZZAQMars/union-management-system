import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogOut, HiMenuAlt3, HiMenuAlt2, FaTachometerAlt, FaUsers, FaMoneyBillWave, FaExclamationCircle, FaCalendarAlt, FaBullhorn, FaFileAlt, FaVoteYea, FaUserShield, } from "../../assets/icons";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // msah data mn localStorage
    navigate("/");
  };

  const menus = [
    { name: "Dashboard", Link: "/dashboard", icon: FaTachometerAlt },
    { name: "Users Management", Link: "/dashboard/users", icon: FaUserShield, margin: true },
    { name: "Members Management", Link: "/dashboard/members", icon: FaUsers },
    { name: "Contributions", Link: "/dashboard/contributions", icon: FaMoneyBillWave, margin: true },
    { name: "Complaints", Link: "/dashboard/complaints", icon: FaExclamationCircle },
    { name: "Meetings", Link: "/dashboard/meetings", icon: FaCalendarAlt, margin: true },
    { name: "Announcements", Link: "/dashboard/announcements", icon: FaBullhorn },
    { name: "Documents", Link: "/dashboard/documents", icon: FaFileAlt, margin: true },
    { name: "Votes", Link: "/dashboard/votes", icon: FaVoteYea },
  ];

  const [open, setOpen] = useState(true);

  return (
    <div className={`bg-gray-800 h-screen ${open ? "w-56" : "w-16"} duration-500 text-gray-100 px-3`}>
      <div className="pt-1 flex flex-col gap-4 relative">
        <div className="flex justify-start swap swap-rotate">
          <label className="swap swap-rotate">
            <input type="checkbox" onClick={() => setOpen(!open)} />
            <HiMenuAlt3 size={24} className="cursor-pointer swap-off fill-current" />
            <HiMenuAlt2 size={24} className="cursor-pointer swap-on fill-current" />
          </label>
          <p className="btn btn-ghost normal-case text-xl">UNION MANAGEMENT SYSTEM</p>
        </div>
        <hr className="p-0" />

        {menus?.map((menu, i) => (
          <Link
            to={menu?.Link}
            key={i}
            className={`${menu?.margin && "mt-5"} group flex items-center text-sm gap-3 font-medium p-2 hover:bg-color-primary rounded-md`}
          >
            <div>{React.createElement(menu?.icon, { size: "24" })}</div>
            <h2 className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hideen"}`}>
              {menu?.name}
            </h2>
            <h2 className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
              {menu?.name}
            </h2>
          </Link>
        ))}

        {/* Se déconnecter - button ماشي Link */}
        <button
          onClick={handleLogout}
          className="mt-5 group flex items-center text-sm gap-3 font-medium p-2 hover:bg-color-primary rounded-md text-left"
        >
          <div><IoMdLogOut size={24} /></div>
          <h2 className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hideen"}`}>
            Se déconnecter
          </h2>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;