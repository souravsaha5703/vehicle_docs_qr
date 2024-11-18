import './App.css';
import { Outlet } from "react-router-dom";
import { AppContext } from './Context/AppContextProvider';
import Loader from './components/Loader/Loader';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(true);
  const { setLoggedIn, setAdmin } = useContext(AppContext);

  const token = localStorage.getItem('token');

  useEffect(() => {
    try {
      axios.get("http://localhost:7000/getAdmin", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          setLoggedIn(true);
          setAdmin(res.data.user);
          console.log(res.data.message);
          setTimeout(() => {
            setLoading(false)
          }, 3000);
        })
        .catch(error => {
          setLoggedIn(false);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
          console.log(error);
        })
    } catch (error) {
      console.error(error);
    }
  }, [])
  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader color="text-blue-600" />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default App
