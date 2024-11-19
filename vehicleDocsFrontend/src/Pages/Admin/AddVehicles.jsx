import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Sidebars/Navbar';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from '@/components/Loader/Loader';

function AddVehicles() {
    const [vehicleNo, setVehicleNo] = useState('');
    const [vehicleData, setVehicleData] = useState({});
    const [searchError, setSearchError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const token = localStorage.getItem('token');

    const handleVehicleSearch = (e) => {
        e.preventDefault();
        setShowResult(true);
        setSearchLoading(true);
        try {
            axios.get(`http://localhost:7000/searchVehicles/${vehicleNo}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }, {
                withCredentials: true
            })
                .then(res => {
                    setVehicleData(res.data.response);
                    setSearchLoading(false);
                })
                .catch(err => {
                    setErrorMessage(err.response.data.message);
                    setSearchLoading(false);
                    setSearchError(true);
                })
        } catch (error) {
            console.error(error);
        }
    }

    const handleProceed = (e) => {
        e.preventDefault();
        let approveCategory = ["MGV","HGMV","HTV","Trailer","HGV","LMV"];

        let checkCategory = approveCategory.some(category => vehicleData.detail.vehicleCategory.includes(category));

        if(checkCategory){
            alert("Vehicle Reg okk")
        }else{
            alert("Vehicle Category not supported");
        }
    }
    return (
        <>
            <Navbar />
            <div className='bg-slate-900 h-screen'>
                <div className='w-full flex flex-col items-center justify-center'>
                    <h1 className="text-slate-50 text-4xl font-poppins font-medium underline text-center mt-10">Add Vehicles Details</h1>
                    <form className='mt-5 w-full flex items-center justify-center gap-2'>
                        <Input
                            type="text"
                            placeholder="Enter Vehicle No"
                            value={vehicleNo}
                            onChange={(e) => setVehicleNo(e.target.value)}
                            className="mt-1 w-96 h-11 font-noto text-base font-normal capitalize text-slate-100"
                        />
                        <Button
                            size="lg"
                            className="font-noto font-medium text-lg h-12"
                            onClick={handleVehicleSearch}>
                            Search Vehicle
                        </Button>
                    </form>
                    {!showResult ? (
                        <></>
                    ) : (
                        <div>
                            {searchLoading ? (
                                <div className='mt-5'>
                                    <Loader />
                                </div>
                            ) : (
                                <div className='w-full flex p-5 items-center justify-center'>
                                    {searchError ? (
                                        <h2 className='text-center font-noto text-base font-normal text-red-600'>{errorMessage}</h2>
                                    ) : (
                                        <div
                                            className="border border-gray-700 p-3 mt-5 rounded-lg transform transition duration-500 w-[450px]">
                                            <div className="bg-gradient-to-tl from-slate-950 to-gray-900 shadow-2xl relative rounded-lg p-7 w-full">
                                                <h4 className="font-noto font-normal text-base text-gray-50 capitalize text-left">
                                                    Vehicle Reg no : {vehicleData.detail.registrationNumber}
                                                </h4>
                                                <h4 className="font-noto font-normal text-base text-gray-50 capitalize text-left">
                                                    Chassis Number : {vehicleData.detail.chassisNoFull}
                                                </h4>
                                                <h4 className="font-noto font-normal text-base text-gray-50 capitalize text-left">
                                                    Engine Number : {vehicleData.detail.engineNo}
                                                </h4>
                                                <h4 className="font-noto font-normal text-base text-gray-50 capitalize text-left">
                                                    vehicle Reg At : {vehicleData.detail.registeredAt}
                                                </h4>
                                                <h4 className="font-noto font-normal text-base text-gray-50 capitalize text-left">
                                                    Tax paid Upto : {vehicleData.detail.taxUpTo}
                                                </h4>
                                                <h4 className="font-noto font-normal text-base text-gray-50 capitalize text-left">
                                                    Insurance paid Upto : {vehicleData.detail.insuranceUpTo}
                                                </h4>
                                                <h4 className="font-noto font-normal text-base text-gray-50 capitalize text-left">
                                                    Puc Valid Upto : {vehicleData.detail.pucUpTo}
                                                </h4>
                                                <h4 className="font-noto font-normal text-base text-gray-50 capitalize text-left">
                                                    Vehicle Fit Upto : {vehicleData.detail.fitnessUpTo}
                                                </h4>
                                                <h4 className="font-noto font-normal text-base text-gray-50 capitalize text-left">
                                                    Vehicle Category : {vehicleData.detail.vehicleCategory}
                                                </h4>
                                                <div className='flex w-full mt-5 gap-3 items-center justify-center'>
                                                    <Button size="lg" className="font-noto text-base font-medium"
                                                    onClick={handleProceed} >Proceed</Button>
                                                    <Button size="lg" className="font-noto text-base font-medium" variant="destructive">Cancel</Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default AddVehicles