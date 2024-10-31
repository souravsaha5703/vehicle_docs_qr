import React, { useState } from 'react';
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
import axios from 'axios';
import Loader from '@/components/Loader/Loader';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            axios.post("http://localhost:7000/adminLogin", {
                username: username,
                password: password
            }, {
                withCredentials: true
            })
                .then(res => {
                    console.log(res.data.response);
                    setLoading(false);
                    setError(false);
                    let dataToSend = { adminEmail: res.data.response.admin_email }
                    navigate('/verifyotp', { state: dataToSend });
                })
                .catch(error => {
                    setError(true);
                    setLoading(false);
                    setErrorMessage(error.response.data.message);
                    console.log(error.response.data.message);
                })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="bg-hero bg-repeat w-full h-screen flex justify-center items-center bg-slate-950">
            <Card className="w-96 bg-slate-950 rounded-xl text-center flex flex-col items-center justify-center p-5 overflow-hidden border-none transition-all ease-in duration-200">
                <CardHeader>
                    <CardTitle className="text-slate-100 text-3xl font-noto text-center font-semibold">Admin Login</CardTitle>
                    <CardDescription className="text-slate-400 font-medium text-base font-noto">Login into system to manage vehicles, codes and more</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col w-full items-center justify-center">
                    <Input
                        type="text"
                        placeholder="Enter Your Username"
                        value={username}
                        autoComplete="off"
                        required
                        className="border-slate-600 rounded-md h-12 px-4 mb-4 outline-none font-noto font-medium text-slate-200 text-base"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Enter Your Password"
                        value={password}
                        autoComplete="off"
                        required
                        className="border-slate-600 rounded-md h-12 px-4 outline-none font-noto font-medium text-slate-200 text-base"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        className="bg-blue-500 w-full rounded-md mt-8 font-noto font-medium text-lg cursor-pointer transition-all duration-200 ease-linear hover:bg-blue-800 text-slate-100"
                        size="lg"
                        onClick={handleLogin}>
                        {loading ? (
                            <Loader />
                        ) : (
                            "Get OTP"
                        )}
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <a href="/guestlogin" className="font-noto text-blue-50 font-light text-lg transition-all ease-in-out duration-150 hover:text-blue-400 text-center">Login as Guest</a>
                    {error && <p className="font-noto text-red-500 text-base text-center font-normal transition-all ease-in duration-200 mt-2">{errorMessage}</p>}
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login