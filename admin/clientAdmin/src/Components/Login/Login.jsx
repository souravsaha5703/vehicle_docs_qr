import React, { useState,useEffect } from 'react';
import loginPic from '../../assets/register page pic.jpg';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [loginError,setLoginError]=useState('');

    const navigate=useNavigate();

    axios.defaults.withCredentials=true;

    useEffect(()=>{
        axios.get('http://localhost:8000')
        .then(res=>{
          if(res.data.valid){
            navigate('/dashboard');
          }else{
            navigate('/');
          }
        })
        .catch(err=>console.log(err))
      },[])
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/adminLogin",{
            username,
            password
        })
        .then(res=>{
            if(res.data.adminFound){
                if(res.data.passMatch){
                  const sendEmailData={data:res.data.email,name:res.data.name}
                  navigate('/loginotpverify',{state:sendEmailData});
                }else{
                  setLoginError('Password does not match');
                }
            }else{
              setLoginError('Username does not match');
            }
        })
        .catch(err=>console.log(err.response.data));
    }

  return (
    <div className='w-full flex items-center justify-between slate-200'>
            <div className='w-3/5 flex flex-col items-center justify-center p-5'>
                <h1 className='text-4xl font-poppins font-bold text-center text-indigo-600 mt-5'>Administrator Login</h1>
                <div className='w-3/4 h-full p-5 bg-white mt-10 rounded-lg flex items-center justify-center drop-shadow-xl shadow-2xl flex-col'>
                <h1 className='text-xl font-noto font-medium text-center text-indigo-500 mt-5'>Login to access details</h1>
                    <form onSubmit={handleSubmit} className='w-4/5 p-2 flex flex-col items-start justify-center gap-2'>
                        <label className='inline-block my-2 text-lg font-noto font-semibold text-left text-slate-950'>Enter Your Username</label>
                        <input 
                        type="text"
                        className='outline-none w-full h-12 px-3 py-1 border-2 focus:border-slate-950 font-noto font-medium text-lg text-slate-950 rounded-md duration-200 ease-linear placeholder:font-medium bg-slate-200 placeholder:text-black placeholder:text-base'
                        placeholder='Enter Username'
                        required
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                        />
                        <label className='inline-block my-2 text-lg font-noto font-semibold text-left text-slate-950'>Enter Your Username</label>
                        <input
                        type="password" 
                        className='outline-none w-full h-12 px-3 py-1 border-2 focus:border-slate-950 font-noto font-medium text-lg text-slate-950 rounded-md duration-200 ease-linear placeholder:font-medium bg-slate-200 placeholder:text-black placeholder:text-base'
                        placeholder='Enter Password'
                        required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        <h5 className='text-red-600 font-noto text-lg text-left'>{loginError}</h5>
                        <button className='px-5 py-2 border-2 border-slate-950 text-xl font-noto mt-2 text-center rounded-md font-medium text-slate-950 duration-150 ease-in-out hover:text-white hover:bg-slate-950 flex items-center justify-center' type='submit' >Sign In <FaArrowRight className='text-lg ml-2 mt-1' /></button>
                    </form>
                </div>
            </div>
            <div className='w-1/2 h-screen flex items-center justify-center'>
                <img src={loginPic} alt="" className='w-3/4 object-cover object-center' />
            </div>
        </div>
  )
}

export default Login