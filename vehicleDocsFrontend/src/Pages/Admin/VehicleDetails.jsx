import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Sidebars/Navbar';
import axios from 'axios';
import Loader from '@/components/Loader/Loader';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { formatToIndianTime } from "@/utils/dateFormatter";
import { MdOutlineQrCodeScanner } from "react-icons/md";


function VehicleDetails() {
    const [vehiclesData, setVehiclesData] = useState([]);
    const [resultLoading, setResultLoading] = useState(true);
    const [resultError, setResultError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogLoading, setDialogLoading] = useState(true);
    const [singleVehicleData, setSingleVehicleData] = useState({});
    const [qrImg, setQrImg] = useState('');
    const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
    const [qrDialogLoading, setQrDialogLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const token = localStorage.getItem('token');

    function getData() {
        setResultLoading(true);
        try {
            axios.get("https://vehicledocs360.onrender.com/allVehiclesData", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            })
                .then(res => {
                    setVehiclesData(res.data.response);
                    setResultLoading(false);
                })
                .catch(err => {
                    setErrorMessage(err.response.data.message);
                    setResultLoading(false);
                    setResultError(true);
                })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleDetailsBtn = (vehicleId) => {
        let id = vehicleId;
        setDialogLoading(true);
        try {
            axios.get(`https://vehicledocs360.onrender.com/vehicleData/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            })
                .then(res => {
                    setSingleVehicleData(res.data.response);
                    setDialogLoading(false);
                })
        } catch (error) {
            console.error(error);
        }
        setIsDialogOpen(true);
    }

    const handleQRBtn = (vehicleId) => {
        let id = vehicleId;
        setQrDialogLoading(true);
        try {
            axios.get(`https://vehicledocs360.onrender.com/getqr/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            })
                .then(res => {
                    setQrImg(res.data.img_url);
                    setQrDialogLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setQrDialogLoading(false);
                    alert("ERROR IN GENERATING QR CODE");
                })
        } catch (error) {
            console.error(error);
        }
        setIsQRDialogOpen(true);
    }

    const handleDeleteBtn = (vehicleId) => {
        let id = vehicleId;
        setDeleteLoading(true);
        try {
            axios.delete(`https://vehicledocs360.onrender.com/removeVehicle/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            })
                .then(res => {
                    setDeleteLoading(false);
                    setIsDialogOpen(false);
                    getData();
                })
                .catch(err => {
                    console.log(err);
                    setDeleteLoading(false);
                    alert("Something Went Wrong");
                })
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <Navbar />
            <div className='w-full h-screen bg-slate-900 overflow-hidden'>
                <div className='w-full flex flex-col items-center justify-center'>
                    <h1 className="text-slate-50 text-4xl font-poppins font-medium underline text-center mt-10">All Vehicle Details</h1>
                    {resultLoading ? (
                        <div className='mt-5'>
                            <Loader />
                        </div>
                    ) : (
                        <div className='w-full h-[calc(100vh-100px)] mt-2 flex flex-wrap items-center justify-center gap-2 overflow-y-auto'>
                            {!resultError ? (
                                vehiclesData.map((data, index) => {
                                    return (
                                        <div className="border border-gray-700 p-3 mt-5 rounded-lg transform transition duration-500 w-[425px]"
                                            key={index}>
                                            <div className="bg-gradient-to-tl from-slate-950 to-gray-900 shadow-2xl relative rounded-lg p-7 w-full">
                                                <h4 className="font-noto font-normal text-base text-gray-50 capitalize text-left">
                                                    Owner Name : {data.ownerName}
                                                </h4>
                                                <h4 className="font-noto font-normal text-base text-gray-50 capitalize text-left">
                                                    Vehicle No : {data.vehicleNo}
                                                </h4>
                                                <h4 className="font-noto font-normal text-base text-gray-50 capitalize text-left">
                                                    Driver Name : {data.driverName}
                                                </h4>
                                                <h4 className="font-noto font-normal text-base text-gray-50 capitalize text-left">
                                                    Driver License No : {data.driver_licence_no}
                                                </h4>
                                                <h4 className="font-noto font-normal text-base text-gray-50 capitalize text-left">
                                                    Chassis Number : {data.chasisNo}
                                                </h4>
                                                <h4 className="font-noto font-normal text-base text-gray-50 capitalize text-left">
                                                    Engine Number : {data.engineNo}
                                                </h4>
                                                <div className='flex w-full mt-5 gap-3 items-center justify-between'>
                                                    <Button size="lg" className="font-noto text-base font-medium" onClick={() => handleDetailsBtn(data._id)}>All Details</Button>
                                                    <div onClick={() => handleQRBtn(data._id)} className='border border-blue-500 px-2 py-2 rounded-sm cursor-pointer'>
                                                        <MdOutlineQrCodeScanner className='text-slate-100' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <h3 className='text-center mt-3 font-noto text-red-600 text-base font-normal'>{errorMessage}</h3>
                            )}
                        </div>
                    )}
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogContent className="bg-slate-950 border-none">
                            <DialogHeader>
                                <DialogTitle className="text-slate-50 font-noto text-xl font-normal text-left">Vehicle Details</DialogTitle>
                                <DialogDescription className="text-slate-500 font-noto text-base font-normal text-left">
                                    All details related to this vehicle
                                </DialogDescription>
                            </DialogHeader>
                            {dialogLoading ? (
                                <div className='w-full flex items-center justify-center'>
                                    <Loader />
                                </div>
                            ) : (
                                <div className="flex flex-col items-start gap-1">
                                    <h5 className="text-slate-300 font-noto text-base font-normal text-left">Owner Name : {singleVehicleData.ownerName}</h5>
                                    <h5 className="text-slate-300 font-noto text-base font-normal text-left">Owner Phone Number : {singleVehicleData.ownerPhone}</h5>
                                    <h5 className="text-slate-300 font-noto text-base font-normal text-left">Vehicle Registered Number : {singleVehicleData.vehicleNo}</h5>
                                    <h5 className="text-slate-300 font-noto text-base font-normal text-left">Vehicle Engine Number : {singleVehicleData.engineNo}</h5>
                                    <h5 className="text-slate-300 font-noto text-base font-normal text-left">Driver Name : {singleVehicleData.driverName}</h5>
                                    <h5 className="text-slate-300 font-noto text-base font-normal text-left">Driver Licence Number : {singleVehicleData.driver_licence_no}</h5>
                                    <h5 className="text-slate-300 font-noto text-base font-normal text-left">Chasis Number : {singleVehicleData.chasisNo}</h5>
                                    <h5 className="text-slate-300 font-noto text-base font-normal text-left">Vehicle Registered At :
                                        {singleVehicleData.reg_at == null ? (
                                            "NA"
                                        ) : (
                                            formatToIndianTime(singleVehicleData.reg_at)
                                        )}</h5>
                                    <h5 className="text-slate-300 font-noto text-base font-normal text-left">Tax Paid upto :
                                        {singleVehicleData.taxPaidUpto == null ? (
                                            "NA"
                                        ) : (
                                            formatToIndianTime(singleVehicleData.taxPaidUpto)
                                        )}</h5>
                                    <h5 className="text-slate-300 font-noto text-base font-normal text-left">Insurance Paid upto :
                                        {singleVehicleData.insurancePaidUpto == null ? (
                                            "NA"
                                        ) : (
                                            formatToIndianTime(singleVehicleData.insurancePaidUpto)
                                        )}</h5>
                                    <h5 className="text-slate-300 font-noto text-base font-normal text-left">Pollution Certificate Valid upto :
                                        {singleVehicleData.pucValidUpto == null ? (
                                            "NA"
                                        ) : (
                                            formatToIndianTime(singleVehicleData.pucValidUpto)
                                        )}</h5>
                                    <h5 className="text-slate-300 font-noto text-base font-normal text-left">Vehicle Fit upto :
                                        {singleVehicleData.fit_upto == null ? (
                                            "NA"
                                        ) : (
                                            formatToIndianTime(singleVehicleData.fit_upto)
                                        )}</h5>
                                    <h5 className="text-slate-300 font-noto text-base font-normal text-left">Vehicle Permit Valid upto :
                                        {singleVehicleData.permitValidupto == null ? (
                                            "NA"
                                        ) : (
                                            formatToIndianTime(singleVehicleData.permitValidupto)
                                        )}</h5>
                                </div>
                            )}
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                                <Button type="button" variant="destructive" onClick={() => handleDeleteBtn(singleVehicleData._id)}>
                                    {deleteLoading ? (
                                        <Loader />
                                    ) : "Remove Vehicle"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={isQRDialogOpen} onOpenChange={setIsQRDialogOpen}>
                        <DialogContent className="bg-slate-950 border-none">
                            <DialogHeader>
                                <DialogTitle className="text-slate-50 font-noto text-xl font-normal text-left">Vehicle QR CODE</DialogTitle>
                                <DialogDescription className="text-slate-500 font-noto text-base font-normal text-left">
                                    Generated QR Code of this Vehicle
                                </DialogDescription>
                            </DialogHeader>
                            {qrDialogLoading ? (
                                <div className='w-full flex items-center justify-center'>
                                    <Loader />
                                </div>
                            ) : (
                                <img src={qrImg} alt="Vehicle QR CODE" />
                            )}
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    )
}

export default VehicleDetails