import React from 'react'

function VehiclesTable({ownerName,ownerPhone,vehicleNo,engineNo,brand,regState,chasisNo,regUpto,taxPaidUpto,insuranceUpto,puccUpto,fitUpto,userId}) {
    return (
        <div className="border border-indigo-700 p-3 rounded-lg transform transition duration-500 w-[450px]">
        <div className="bg-gradient-to-tl bg-indigo-600 shadow-2xl relative rounded-lg p-7 w-full">
          <h4 className="font-noto font-normal text-base text-white capitalize text-left">Owner Name : {ownerName}</h4>
          <h4 className="font-noto font-normal text-base text-white capitalize text-left">Owner Phone No : {ownerPhone}</h4>
          <h4 className="font-noto font-normal text-base text-white capitalize text-left">Vehicle No : {vehicleNo}</h4>
          <h4 className="font-noto font-normal text-base text-white capitalize text-left">Engine No : {engineNo}</h4>
          <h4 className="font-noto font-normal text-base text-white capitalize text-left">Brand : {brand}</h4>
          <h4 className="font-noto font-normal text-base text-white capitalize text-left">Reg State : {regState}</h4>
          <h4 className="font-noto font-normal text-base text-white capitalize text-left">Chasis No  : {chasisNo}</h4>
          <h4 className="font-noto font-normal text-base text-white capitalize text-left">Vehicle Reg Upto : {regUpto}</h4>
          <h4 className="font-noto font-normal text-base text-white capitalize text-left">Tax Paid Upto : {taxPaidUpto}</h4>
          <h4 className="font-noto font-normal text-base text-white capitalize text-left">Insurance Paid Upto : {insuranceUpto}</h4>
          <h4 className="font-noto font-normal text-base text-white capitalize text-left">Pucc Valid Upto : {puccUpto}</h4>
          <h4 className="font-noto font-normal text-base text-white capitalize text-left">Vehicle Fit Upto : {fitUpto}</h4>
          <h4 className="font-noto font-normal text-base text-white capitalize text-left">Added By : {userId}</h4>
        </div>
      </div>
    )
}

export default VehiclesTable