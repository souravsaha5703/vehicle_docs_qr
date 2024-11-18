import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Sidebars/Navbar';
import axios from 'axios';
import { formatToIndianTime } from "@/utils/dateFormatter"

function Dashboard() {
  const [allEntries, setAllEntries] = useState([]);
  const [todaysEntries, setTodaysEntries] = useState([]);
  const [time, setTime] = useState(new Date());

  const token = localStorage.getItem('token');
  const today = new Date();

  useEffect(() => {
    axios.get("http://localhost:7000/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setAllEntries(res.data.response);
      let entries = res.data.response;
      let matchingDates = entries.filter(date => date.time == today);
      setTodaysEntries(matchingDates);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className='bg-slate-900 w-full'>
      <Navbar />
      <div className="w-full flex p-6 flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between gap-5 mt-10">
          <h1 className="text-slate-50 text-4xl font-poppins font-medium underline">Dashboard</h1>
          <div
            className="flex items-center justify-center gap-1 font-noto text-4xl text-slate-50 font-medium">
            {time.toLocaleTimeString()}
          </div>
        </div>
        <h1 className="text-slate-50 text-2xl font-noto font-normal mt-10 text-left">Today's Report :-</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-11/12 mt-5">
          <table className="w-full text-base text-left font-noto text-gray-400">
            <thead className="text-slate-100 uppercase bg-gray-700 font-normal">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Vehicle No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Owner Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Driver Licence No
                </th>
                <th scope="col" className="px-6 py-3">
                  In Time
                </th>
              </tr>
            </thead>
            {todaysEntries.length > 0 ? (
              <tbody>
                {todaysEntries.map((entry, index) => {
                  return (
                    <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600" key={index}>
                      <td className="px-6 py-4">
                        {entry.vno}
                      </td>
                      <td className="px-6 py-4">
                        {entry.owner}
                      </td>
                      <td className="px-6 py-4">
                        {entry.driverLicence}
                      </td>
                      <td className="px-6 py-4">
                        {formatToIndianTime(entry.time)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            ) : (
              <tbody className='w-full'>
                <tr>
                  <td>NO ENTRY FOUND</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        <h1 className="text-slate-50 text-2xl font-noto font-normal mt-10 text-left">All Reports :-</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-11/12 mt-5">
          <table className="w-full text-base text-left font-noto text-gray-400">
            <thead className="text-slate-100 uppercase bg-gray-700 font-normal">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Vehicle No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Owner Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Driver Licence No
                </th>
                <th scope="col" className="px-6 py-3">
                  In Time
                </th>
              </tr>
            </thead>
            {allEntries.length > 0 ? (
              <tbody>
                {allEntries.map((entry, index) => {
                  return (
                    <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600" key={index}>
                      <td className="px-6 py-4">
                        {entry.vno}
                      </td>
                      <td className="px-6 py-4">
                        {entry.owner}
                      </td>
                      <td className="px-6 py-4">
                        {entry.driverLicence}
                      </td>
                      <td className="px-6 py-4">
                        {formatToIndianTime(entry.time)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            ) : (
              <tbody className='w-full'>
                <tr>
                  <td>NO ENTRY FOUND</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard