import React, { useEffect, useState } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios';

function Loginotpverify() {
    const [otp,setOtp]=useState('');
    const [otpMessage,setOtpMessage]=useState('');
    const [otpError,setOtpError]=useState('');

    const location=useLocation();
    const receivedData=location.state;

    const navigate=useNavigate();

    useEffect(()=>{
        axios.post('http://localhost:8000/sendotp',{
            userEmail:receivedData.data,
            name:receivedData.name
        })
        .then(res=>{
          if(res.data.sent){
            setOtpMessage('Enter the OTP we just sent to your registered email.');
          }else{
            setOtpMessage('Error in sending otp, please retry.');
          }
        })
        .catch(err=>console.log(err))
      },[]);

      const submitOtp=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/loginotpverification",{
            otp:otp,
            adminEmail:receivedData.data
        })
        .then(res=>{
            if(res.data.verified){
                navigate('/dashboard');
            }else{
                setOtpError('OTP does not matched');
            }
        })
        .catch(err=>console.log(err.response.data));
      }

    return (
        <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md mx-auto mt-24">
            <div className="flex flex-col space-y-2 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-poppins">Confirm OTP</h2>
                <p className="text-md font-noto font-medium md:text-xl">
                    {otpMessage}
                </p>
            </div>
            <div className="flex flex-col max-w-md space-y-5">
                <input type="text" placeholder="Enter otp" maxLength={6} value={otp}
                    onChange={(e)=> setOtp(e.target.value)}
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />
                    <h5 className='text-red-600 font-noto text-lg text-left'>{otpError}</h5>
                <button onClick={submitOtp} className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">
                    Verify otp
                </button>
            </div>
        </div>
    )
}

export default Loginotpverify