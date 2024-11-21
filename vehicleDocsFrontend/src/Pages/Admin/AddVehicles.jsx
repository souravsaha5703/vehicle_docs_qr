import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Sidebars/Navbar';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from '@/components/Loader/Loader';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';


function AddVehicles() {
    const [vehicleNo, setVehicleNo] = useState('');
    const [vehicleData, setVehicleData] = useState({});
    const [searchError, setSearchError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [phoneValid, setPhoneValid] = useState(true);
    const [licenceValid, setLicenceValid] = useState(true);
    const [validError, setValidError] = useState(false);
    const [additionalInfo, setAdditionalInfo] = useState({
        ownerName: '',
        ownerPhone: '',
        driverName: '',
        driverLicence: ''
    });

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const phoneRegex = /^[6-9]\d{9}$/;
    const licenseRegex = /^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/;

    const handleVehicleSearch = (e) => {
        e.preventDefault();
        setShowResult(true);
        setSearchLoading(true);
        try {
            axios.get(`https://vehicledocs360.onrender.com/searchVehicles/${vehicleNo}`, {
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
        let approveCategory = ["MGV", "HGMV", "HTV", "Trailer", "HGV", "LMV"];

        let checkCategory = approveCategory.some(category => vehicleData.detail.vehicleCategory.includes(category));
        if (checkCategory) {
            setIsDrawerOpen(true);
            setCategoryError(false);
        } else {
            setCategoryError(true);
        }
    }

    const checkPhone = (e) => {
        setPhoneValid(phoneRegex.test(e.target.value));
        setAdditionalInfo({ ...additionalInfo, ownerPhone: e.target.value });
    }

    const checkLicence = (e) => {
        setLicenceValid(licenseRegex.test(e.target.value));
        setAdditionalInfo({ ...additionalInfo, driverLicence: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!phoneValid || !licenceValid) {
            setValidError(true);
        } else {
            setValidError(false);
            setSubmitLoading(true);
            try {
                axios.post("https://vehicledocs360.onrender.com/addVehicleDetails", {
                    ownerName: additionalInfo.ownerName,
                    ownerPhone: additionalInfo.ownerPhone,
                    vehicleNo: vehicleData.detail.registrationNumber,
                    engineNo: vehicleData.detail.engineNo,
                    driverName: additionalInfo.driverName,
                    driverLicence: additionalInfo.driverLicence,
                    chasisNo: vehicleData.detail.chassisNoFull,
                    permitvalidUpto: vehicleData.detail.permit_valid_upto,
                    registrationAt: vehicleData.detail.registeredAt,
                    taxpaidUpto: vehicleData.detail.taxUpTo,
                    insurancepaidUpto: vehicleData.detail.insuranceUpTo,
                    pollutionUpto: vehicleData.detail.pucUpTo,
                    fitUpto: vehicleData.detail.fitnessUpTo
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                })
                    .then(res => {
                        setSubmitLoading(false);
                        navigate("/admin/dashboard");
                    })
                    .catch(err => {
                        console.log(err);
                        setSubmitLoading(false);
                        alert("Something Went Wrong");
                    })
            } catch (error) {
                console.error(error);
            }
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
                                                {categoryError ? (
                                                    <h3 className='text-center mt-3 font-noto text-red-600 text-base font-normal'>Vehicle category not supported</h3>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} >
                        <DrawerContent className='flex flex-col items-center justify-center bg-slate-950 border-none'>
                            <DrawerHeader className='w-full flex flex-col items-center justify-center'>
                                <DrawerTitle className='text-2xl font-noto text-slate-100 underline text-center font-semibold'>Additional Information</DrawerTitle>
                                <DrawerDescription className='text-xl font-noto text-slate-500 text-center font-normal'>Provide some additional details to add this vehicle into our system</DrawerDescription>
                            </DrawerHeader>
                            <form className='flex flex-col gap-2'>
                                <div className='flex gap-5'>
                                    <div>
                                        <Label htmlFor="ownerName" className="text-base font-noto font-normal text-slate-100">Vehicle Owner Name</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Owner Name"
                                            value={additionalInfo.ownerName}
                                            onChange={(e) => setAdditionalInfo({ ...additionalInfo, ownerName: e.target.value })}
                                            className="mt-1 w-64 h-10 font-noto text-base font-normal capitalize text-slate-100"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="ownerPhone" className="text-base font-noto font-normal text-slate-100">Vehicle Owner Phone No</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Owner Phone No"
                                            value={additionalInfo.ownerPhone}
                                            onChange={checkPhone}
                                            maxLength="10"
                                            className="mt-1 w-64 h-10 font-noto text-base font-normal capitalize text-slate-100"
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-5 mt-5'>
                                    <div>
                                        <Label htmlFor="driverName" className="text-base font-noto font-normal text-slate-100">Driver Name</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Driver Name"
                                            value={additionalInfo.driverName}
                                            onChange={(e) => setAdditionalInfo({ ...additionalInfo, driverName: e.target.value })}
                                            className="mt-1 w-64 h-10 font-noto text-base font-normal capitalize text-slate-100"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="driverLicence" className="text-base font-noto font-normal text-slate-100">Driver Licence No</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Driver Licence No"
                                            value={additionalInfo.driverLicence}
                                            onChange={checkLicence}
                                            className="mt-1 w-64 h-10 font-noto text-base font-normal capitalize text-slate-100"
                                        />
                                    </div>
                                </div>
                                {validError ? (
                                    <h3 className='text-center mt-3 font-noto text-red-600 text-base font-normal'>
                                        {!phoneValid && !licenceValid ? (
                                            "Phone and Licence no is invalid"
                                        ) : !phoneValid ? (
                                            "Phone no is invalid"
                                        ) : !licenceValid ? (
                                            "Licence No is invalid"
                                        ) : (
                                            <></>
                                        )}
                                    </h3>
                                ) : (
                                    <></>
                                )}
                                <Button onClick={handleSubmit} className="mt-4 font-noto font-normal text-base" size="lg">
                                    {submitLoading ? (
                                        <Loader />
                                    ) : (
                                        "Add Vehicle"
                                    )}</Button>
                            </form>
                            <DrawerFooter>
                                <DrawerClose>
                                    <Button variant="outline" size="lg">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </>
    )
}

export default AddVehicles