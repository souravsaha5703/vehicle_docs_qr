import React, { useContext, useState } from 'react';
import { AppContext } from '@/Context/AppContextProvider';
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaTruck } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineLogout } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const { admin } = useContext(AppContext);

    const navigate = useNavigate();

    const handleToggle = () => {
        setToggleSidebar(!toggleSidebar);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        try {
            axios.get("https://vehicledocs360.onrender.com/adminLogout")
                .then(res => {
                    localStorage.removeItem('token');
                    navigate("/");
                })
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <nav className={`w-full px-10 py-2 md:px-auto fixed z-50`}>
                <div className={`h-12 w-full flex items-center justify-between`}>
                    <div
                        onClick={handleToggle}
                        className='size-9 bg-slate-100 rounded-full flex items-center justify-center cursor-pointer'>
                        <RxHamburgerMenu className='text-slate-900 text-2xl' />
                    </div>
                </div>
            </nav>

            <div className={`${!toggleSidebar ? "-translate-x-full" : "translate-x-0"} fixed top-0 left-0 z-50 w-60 h-screen shadow-2xl shadow-slate-200/5 transition-all duration-300`}>
                <div className="h-full px-3 py-4 overflow-y-auto bg-slate-950 w-full flex flex-col items-center justify-start relative">
                    <h1 className="text-slate-50 text-2xl my-5 font-oswald font-semibold text-center">Vehicle Docs 360</h1>
                    <img src="../images/vehicle docs logo.png" alt="profile image" className="size-12 bg-cover bg-center" />
                    <h3 className="text-white text-base mt-2 mb-5 font-noto font-semibold text-center">
                        {admin.username}
                    </h3>
                    <ul className="space-y-2 font-medium font-noto">
                        <li>
                            <NavLink to={'/admin/dashboard'}
                                onClick={() => setToggleSidebar(false)}
                                className="flex items-center p-3 text-slate-50 rounded-lg hover:bg-slate-100 hover:text-slate-950 group">
                                <TbLayoutDashboardFilled className='text-2xl text-orange-500' />
                                <span className="ms-3 capitalize text-base">Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/admin/vehicle_details'}
                                onClick={() => setToggleSidebar(false)}
                                className="flex items-center p-3 text-slate-50 rounded-lg hover:bg-slate-100 hover:text-slate-950 group">
                                <IoDocumentTextOutline className='text-2xl text-teal-500' />
                                <span className="ms-3 capitalize text-base">Vehicle Docs</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/admin/add_vehicles'}
                                onClick={() => setToggleSidebar(false)}
                                className="flex items-center p-3 text-slate-50 rounded-lg hover:bg-slate-100 hover:text-slate-950 group">
                                <FaTruck className='text-2xl text-lime-500' />
                                <span className="flex-1 ms-3 whitespace-nowrap capitalize text-base">Add Vehicle</span>
                            </NavLink>
                        </li>
                    </ul>
                    <Button onClick={handleLogout} className="flex items-center gap-1 absolute bottom-5 left-5 cursor-pointer bg-transparent border-none hover:bg-slate-50"><MdOutlineLogout className='text-2xl text-red-600' /><h5 className="text-red-600 text-xl font-noto font-normal">Logout</h5></Button>
                </div>
            </div>
        </>
    )
}

export default Navbar