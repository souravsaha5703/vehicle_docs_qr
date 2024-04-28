import React, { useEffect, useId, useState } from 'react';
import Tablerow from '../Table/Tablerow';

function Users() {
  const [userData, setUserData] = useState([]);
  const id = useId();
  const url = "http://localhost:8000/api/users";

  useEffect(() => {
    async function usersData() {
      try {
        const response = await fetch(url);
        const resData = await response.json();
        setUserData(resData);
      }
      catch (error) {
        console.log(error);
      }
    }
    usersData();
  }, []);

  return (
    <div className='w-full p-5 flex justify-center items-center'>
      <table className="table-auto w-full bg-indigo-500 rounded-md border border-white">
        <thead className='border border-white'>
          <tr>
            <th className='border border-white px-4 text-center text-2xl text-slate-100 font-noto font-medium py-3'>ID</th>
            <th className='border border-white px-4 text-center text-2xl text-slate-100 font-noto font-medium py-3'>Full Name</th>
            <th className='border border-white px-4 text-center text-2xl text-slate-100 font-noto font-medium py-3'>Email</th>
            <th className='border border-white px-4 text-center text-2xl text-slate-100 font-noto font-medium py-3'>Phone No</th>
          </tr>
        </thead>
        <tbody className='border border-white'>
          {userData && userData.map((data, index) => (
            <Tablerow
              key={id}
              id={data.id}
              name={data.fullname}
              email={data.email}
              phone={data.phone}
            />))}
        </tbody>
      </table>
    </div>
  )
}

export default Users;