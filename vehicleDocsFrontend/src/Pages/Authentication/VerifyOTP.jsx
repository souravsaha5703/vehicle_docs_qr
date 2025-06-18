import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from '@/components/Loader/Loader';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '@/Context/AppContextProvider';

function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { setAdmin, setLoggedIn } = useContext(AppContext);
  const location = useLocation();
  const { adminEmail } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.post("https://vehicle-docs-qr.vercel.app/sendotp", {
        adminEmail: adminEmail
      }, {
        withCredentials: true
      })
        .then(res => {
          setOtpSent(true);
        })
        .catch(error => {
          console.log(error);
        })
    } catch (error) {
      console.error(error);
    }
  }, [adminEmail])

  const handleSubmit = () => {
    setLoading(true);
    try {
      axios.post("https://vehicle-docs-qr.vercel.app/otpverification", {
        otp: otp,
        email: adminEmail
      }, {
        withCredentials: true
      })
        .then(res => {
          setLoading(false);
          setError(false);
          setAdmin(res.data.response);
          setLoggedIn(true);
          localStorage.setItem("token", res.data.token);
          navigate('/admin/dashboard');
        })
        .catch(error => {
          setLoading(false);
          setError(true);
          setLoggedIn(false);
          setErrorMessage(error.response.data.message);
        })
    } catch (error) {

    }
  }

  const handleResendOtp = (e) => {
    e.preventDefault();
    setResendLoading(true);
    try {
      axios.post("https://vehicle-docs-qr.vercel.app/sendotp", {
        adminEmail: adminEmail
      }, {
        withCredentials: true
      })
        .then(res => {
          setOtpSent(true);
          setResendLoading(false);
        })
        .catch(error => {
          setResendLoading(false);
          console.log(error);
        })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-hero bg-repeat w-full h-screen flex justify-center items-center bg-slate-900">
      <Card className="w-96 bg-slate-950 rounded-xl text-center flex flex-col items-center justify-center overflow-hidden border-none transition-all ease-in duration-200">
        <CardHeader>
          <CardTitle className="text-slate-100 text-3xl font-noto text-center font-semibold">OTP Verification</CardTitle>
          <CardDescription className="text-slate-400 font-medium text-base font-noto">We will send a otp to registered email address for verification</CardDescription>
          {otpSent && <p className="font-noto text-green-500 text-base text-center font-normal mt-2">OTP is sent successfully</p>}
        </CardHeader>
        <CardContent className="flex flex-col w-full items-center justify-center">
          <Input
            className="border-slate-600 w-full rounded-md h-12 px-4 outline-none font-noto font-medium text-slate-200 text-base"
            type="text"
            placeholder="Enter OTP"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="flex items-center gap-5 justify-center mt-5">
            <Button
              className="bg-blue-500 rounded-md font-noto font-medium text-base cursor-pointer transition-all duration-200 ease-linear hover:bg-blue-800 text-slate-100"
              size="lg"
              onClick={handleSubmit}
            >
              {loading ? (
                <Loader />
              ) : (
                "Verify OTP"
              )}
            </Button>
            <Button className="font-noto font-medium text-base text-blue-500 hover:text-blue-800 transition-all duration-200 ease-linear"
              variant="ghost"
              size="lg"
              onClick={handleResendOtp}
            >
              {resendLoading ? (
                <Loader />
              ) : (
                "Resend OTP"
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          {error && <p className="font-noto text-red-500 text-base text-center font-normal transition-all ease-in duration-200 mt-2">{errorMessage}</p>}
        </CardFooter>
      </Card>
    </div>
  )
}

export default VerifyOTP