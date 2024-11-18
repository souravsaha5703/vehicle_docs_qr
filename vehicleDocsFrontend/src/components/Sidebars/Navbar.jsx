import React, { useContext, useState } from 'react';
import { AppContext } from '@/Context/AppContextProvider';
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaTruck } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineLogout } from "react-icons/md";
import { NavLink } from 'react-router-dom';

function Navbar() {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const { admin } = useContext(AppContext);

    const handleToggle = () => {
        setToggleSidebar(!toggleSidebar);
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

            <div className={`${!toggleSidebar ? "-translate-x-full" : "translate-x-0"} fixed top-0 left-0 z-50 w-48 h-screen shadow-2xl shadow-slate-200/5 transition-all duration-300`}>
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
                            <a href="/allvehicles"
                                className="flex items-center p-3 text-slate-50 rounded-lg hover:bg-slate-100 hover:text-slate-950 group">
                                <IoDocumentTextOutline className='text-2xl text-teal-500' />
                                <span className="ms-3 capitalize text-base">Vehicle Docs</span>
                            </a>
                        </li>
                        <li>
                            <a href="/add_vehicles"
                                className="flex items-center p-3 text-slate-50 rounded-lg hover:bg-slate-100 hover:text-slate-950 group">
                                <FaTruck className='text-2xl text-lime-500' />
                                <span className="flex-1 ms-3 whitespace-nowrap capitalize text-base">Add Vehicle</span>
                            </a>
                        </li>
                        <li>
                            <a href="/update_vehicles"
                                className="flex items-center p-3 text-slate-50 rounded-lg hover:bg-white hover:text-slate-950 group">
                                <GrUpdate className='text-2xl text-emerald-500' />
                                <span className="flex-1 ms-3 whitespace-nowrap capitalize text-base">Update docs</span>
                            </a>
                        </li>
                    </ul>
                    <a href="/adminLogout" className="flex items-center gap-1 absolute bottom-5 left-5 cursor-pointer"><MdOutlineLogout className='text-2xl text-red-500' /><h5 className="text-red-500 text-xl font-noto font-normal">Logout</h5></a>
                </div>
            </div>
        </>
    )
}

export default Navbar