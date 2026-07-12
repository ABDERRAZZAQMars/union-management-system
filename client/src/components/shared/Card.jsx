import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaMoneyBillWave, FaBullhorn, FaUserShield, } from "../../assets/icons";

const LINK = "http://localhost:8000/user";

function Card() {
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    axios.get(LINK + "/users", {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    })
      .then((res) => setUsersCount(res.data.length))
      .catch((err) => console.log(err));
  }, []);

  const cards = [
    { icon: FaUserShield, name: "Users Management", total: usersCount },
    { icon: FaUsers, name: "Members Management", total: "0" },
    { icon: FaMoneyBillWave, name: "Contributions", total: "0 Dhs" },
    { icon: FaBullhorn, name: "Announcements", total: "0" },
  ];

  return (
    <div className="flex gap-4 justify-between mb-2">
      {cards?.map((card, i) => (
        <div key={i} className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-200">
            {React.createElement(card?.icon, { size: "24" })}
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              {card?.name}
            </span>
            <div className="flex items-center">
              <span className="text-xl text-gray-700 font-semibold">{card.total}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;