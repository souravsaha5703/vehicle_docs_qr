import React from 'react';
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { FaCar } from "react-icons/fa";
import { NavLink } from 'react-router-dom';


function Navbar() {
    return (
        <div className='bg-indigo-600/55 h-screen fixed w-48 top-0 left-0 shadow-lg rounded-e-3xl z-50 flex flex-col items-center justify-start gap-3 overflow-hidden'>
            <h1 className='py-2 w-full text-blue-950 text-2xl font-poppins font-bold mt-10 mb-2 text-center underline'>CarDocs 360</h1>
            <NavLink to='/dashboard' className={({isActive})=>`py-2 w-full font-noto font-medium text-xl cursor-pointer text-center flex duration-150 ease-in-out hover:text-slate-200 hover:bg-slate-950 ${isActive ? 'bg-slate-950 text-white' : 'text-slate-950'}`}><MdDashboard className='text-2xl mx-2' />Dashboard</NavLink>
            <NavLink to='/users' className={({isActive})=>`py-2 w-full font-noto font-medium text-xl cursor-pointer text-center flex duration-150 ease-in-out hover:text-slate-200 hover:bg-slate-950 ${isActive ? 'bg-slate-950 text-white' : 'text-slate-950'}`}><HiUsers className='text-2xl mx-2' /> Total Users</NavLink>
            <NavLink to='/vehicles' className={({isActive})=>`py-2 w-full font-noto font-medium text-xl cursor-pointer text-center flex duration-150 ease-in-out hover:text-slate-200 hover:bg-slate-950 ${isActive ? 'bg-slate-950 text-white' : 'text-slate-950'}`}><FaCar className='text-2xl mx-2' />Vehicles</NavLink>
        </div>
    )
}

export default Navbar