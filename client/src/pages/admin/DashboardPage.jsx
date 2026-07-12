import React from 'react'
import LogoSyndicat from "../../assets/images/LogoSyndicat.png";
import Card from "../../components/shared/Card";

function DashboardPage() {
  return (
    <div className="flex flex-col">
        <Card />
          <div className="flex justify-center  bg-white rounded-sm p-4 flex-1 border border-gray-200 items-center">
            <img src={LogoSyndicat} width={"900"} />
          </div>
        </div>
  )
}

export default DashboardPage