import React, { useEffect, useId, useState } from 'react';
import Tablerow from '../Table/Tablerow';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

function Users() {
  const [userData, setUserData] = useState([]);
  const id = useId();
  const navigate=useNavigate();

  const url = "http://localhost:8000/api/allUsers";

  useEffect(() => {
    axios.get('http://localhost:8000')
      .then(res => {
        if (res.data.valid) {
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
        } else {
          navigate('/');
        }
      })
      .catch(err => console.log(err))
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
            <th className='border border-white px-4 text-center text-2xl text-slate-100 font-noto font-medium py-3'>Valid User</th>
          </tr>
        </thead>
        <tbody className='border border-white'>
          {userData && userData.map((data, index) => (
            <Tablerow
              key={index}
              userId={data._id}
              name={data.fullname}
              email={data.email}
              phone={data.phoneno}
              valid={data.validUser.toString()}
            />))}
        </tbody>
      </table>
    </div>
  )
}

export default Users;