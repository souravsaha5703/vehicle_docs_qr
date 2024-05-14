import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import tick_img from '../../public/tick img.svg';
import cross_img from '../../public/cross img.svg';

function VerifyData() {
  const [verified,setVerified]=useState();
  const [afterVerify,setAfterVerify]=useState(false);

  const location = useLocation();
  const receivedData = location.state;
  const jsonData = JSON.parse(receivedData.details);

  const sendForVerification=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:7000/verifyVehicleDetails",jsonData)
    .then(res=>{
      if(res.data.verified){
        axios.post("http://localhost:7000/createEntry",{
          id:jsonData.vehicleId
        })
        .then(res=>{
          if(res.data.done){
            setVerified(true);
            setAfterVerify(true);
          }else{
            setVerified(false);
            setAfterVerify(true);
          }
        })
        .catch(err=>console.log(err.response.data));
      }else{
        setVerified(false);
        setAfterVerify(true);
      }
    })
    .catch(err=>console.log(err.response.data));
    
  }

  return (
    <div className='w-full h-screen flex items-center justify-center flex-col'>
      {!afterVerify ? (
        <div>
          <h1 className='my-5 text-center font-sans text-4xl font-bold text-red-500'>Verify the details fetched from qr code</h1>
      <div className="border border-gray-700 p-3 rounded-lg transform transition duration-500 w-[800px]">
        <div className="bg-slate-200 shadow-2xl relative rounded-lg p-7 w-full">
          <h4 className="font-sans font-medium text-lg text-gray-950 capitalize text-left">Vehicle Reg no : {jsonData.vehicleNo}</h4>
          <h4 className="font-sans font-medium text-lg text-gray-950 capitalize text-left">Owner Name : {jsonData.ownerName}</h4>
          <h4 className="font-sans font-medium text-lg text-gray-950 capitalize text-left">Owner Phone : {jsonData.ownerPhone}</h4>
          <h4 className="font-sans font-medium text-lg text-gray-950 capitalize text-left">Engine No : {jsonData.engineNo}</h4>
          <h4 className="font-sans font-medium text-lg text-gray-950 capitalize text-left">Brand : {jsonData.brand}</h4>
          <h4 className="font-sans font-medium text-lg text-gray-950 capitalize text-left">Reg. State : {jsonData.regState}</h4>
          <h4 className="font-sans font-medium text-lg text-gray-950 capitalize text-left">Chassis Number : {jsonData.chasisNo}</h4>
          <h4 className="font-sans font-medium text-lg text-gray-950 capitalize text-left">Driver Name : {jsonData.driverName}</h4>
          <h4 className="font-sans font-medium text-lg text-gray-950 capitalize text-left">Driver Phone : {jsonData.driverPhone}</h4>
          <h4 className="font-sans font-medium text-lg text-gray-950 capitalize text-left">Driver Licence No : {jsonData.driverLicence}</h4>
          <h4 className="font-sans font-medium text-lg text-gray-950 capitalize text-left">Vehicle Reg Upto : {jsonData.regDate}</h4>
          <h4 className="font-sans font-medium text-lg text-gray-950 capitalize text-left">Tax paid Upto : {jsonData.taxpaidupto}</h4>
          <h4 className="font-sans font-medium text-lg text-gray-950 capitalize text-left">Insurance paid Upto : {jsonData.insuranceupto}</h4>
          <h4 className="font-sans font-medium text-lg text-gray-950 capitalize text-left">Pucc Valid Upto : {jsonData.pucvalid}</h4>
          <h4 className="font-sans font-medium text-lg text-gray-950 capitalize text-left">Fit Upto : {jsonData.fitupto}</h4>
          <h4 className="font-sans font-medium text-lg text-gray-950 capitalize text-left">Permit Valid Upto : {jsonData.permitupto}</h4>
        </div>
      </div>
      <button
        onClick={sendForVerification}
       className="bg-green-600 hover:bg-green-800 text-white font-medium transition-all ease-linear duration-150 font-noto py-2 px-4 rounded-sm mt-6 text-2xl">Verify Details</button>
        </div>
      ) : (
        <div className='w-full h-full flex items-center justify-center flex-col'>
          {verified ? (
            <>
              <img src={tick_img} alt="Tick Image" className='w-48' />
              <h2 className='font-sans font-bold text-4xl mt-10 text-green-500 text-center capitalize'>Vehicle Data Verified Successfully and Entry Accepted</h2>
            </>
          ) : (
            <>
              <img src={cross_img} alt="Cross Image" className='w-48'/>
              <h2 className='font-sans font-bold text-4xl mt-10 text-red-500 text-center capitalize'>Vehicle Data Not Verified Successfully and Entry Denied</h2>
            </>
          )}
        </div>
      )}
      
    </div>
  )
}

export default VerifyData