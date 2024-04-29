import React, { useEffect, useState } from 'react'
import { RiAdminLine } from "react-icons/ri"
import { MdOutlineQrCode2 } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiCarProfile } from "react-icons/pi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState('');
  const [userCount,setUserCount]=useState('');
  const [vehicleCount,setVehicleCount]=useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8000')
      .then(res => {
        if (res.data.valid) {
          setUsername(res.data.username);
        } else {
          navigate('/');
        }
      })
      .catch(err => console.log(err))
  }, []);

  useEffect(()=>{
    axios.get('http://localhost:8000/api/countUsers')
    .then(res=>{
      if(res.data.usersCount){
        console.log(res.data.usersCount);
        setUserCount(res.data.usersCount);
      }else{
        setUserCount(0);
      }
    })
  },[userCount]);

  useEffect(()=>{
    axios.get('http://localhost:8000/api/countVehicles')
    .then(res=>{
      if(res.data.vehiclesCount){
        setVehicleCount(res.data.vehiclesCount);
      }else{
        setVehicleCount(0);
      }
    })
  },[vehicleCount]);

  const handleLogout=(e)=>{
    e.preventDefault();
        axios.get("http://localhost:8000/adminlogout")
        .then(res=>{
            if(res.data.logout){
                navigate('/');
            }
        })
        .catch(err=>console.log(err.response.data));
  }

  return (
    <div className='w-full flex items-center justify-center'>
      <div className='w-full h-screen flex flex-col relative'>
        <button className="hover:bg-red-500 text-red-500 font-bold py-2 px-4 border border-red-500 rounded absolute top-4 right-4 z-10 hover:text-white font-noto"
        onClick={handleLogout}>
          Logout
        </button>
        <h2 className='mt-10 ml-10 text-3xl font-poppins font-semibold text-indigo-600 underline text-left'>Dashboard</h2>
        <h2 className='mt-10 ml-10 text-2xl font-poppins font-medium text-indigo-500 text-left'>Hello {username}</h2>
        <div className='w-full p-5 mt-16 flex items-center justify-center gap-5'>
          <div className='w-56 h-32 bg-indigo-400 rounded-xl flex flex-col items-center justify-center gap-4 shadow-lg'>
            <RiAdminLine className='text-4xl text-slate-950 text-center' />
            <h2 className='text-2xl font-noto font-semibold text-slate-950 text-center'>Admin</h2>
          </div>
          <div className='w-56 h-32 bg-indigo-400 rounded-xl flex flex-col items-center justify-center gap-4 shadow-lg'>
            <MdOutlineQrCode2 className='text-4xl text-slate-950 text-center' />
            <h2 className='text-2xl font-noto font-semibold text-slate-950 text-center'>QR Codes</h2>
          </div>
          <div className='w-56 h-32 bg-indigo-400 rounded-xl flex flex-col items-center justify-center gap-4 shadow-lg'>
            <CgProfile className='text-4xl text-slate-950 text-center' />
            <h2 className='text-2xl font-noto font-semibold text-slate-950 text-center'>{userCount} Users</h2>
          </div>
          <div className='w-56 h-32 bg-indigo-400 rounded-xl flex flex-col items-center justify-center gap-4 shadow-lg'>
            <PiCarProfile className='text-4xl text-slate-950 text-center' />
            <h2 className='text-2xl font-noto font-semibold text-slate-950 text-center'> {vehicleCount} Vehicles</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home