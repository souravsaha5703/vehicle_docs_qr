import React, { useId, useState, useEffect } from 'react'
import VehiclesTable from '../Table/VehiclesTable';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const id = useId();
  const navigate=useNavigate();

  const url = "http://localhost:8000/api/allVehicles";

  useEffect(() => {
    axios.get('http://localhost:8000')
      .then(res => {
        if (res.data.valid) {
          async function vehiclesData() {
            try {
              const response = await fetch(url);
              const resData = await response.json();
              setVehicles(resData);
            }
            catch (error) {
              console.log(error);
            }
          }
          vehiclesData();
        } else {
          navigate('/');
        }
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <div className='w-full p-5 flex justify-center items-center flex-wrap gap-6'>
          {vehicles && vehicles.map((data, index) => (
            <VehiclesTable
              key={index}
              ownerName={data.ownerName}
              ownerPhone={data.ownerPhone}
              vehicleNo={data.vehicleNo}
              engineNo={data.engineNo}
              brand={data.brand}
              regState={data.reg_state}
              chasisNo={data.chasisNo}
              regUpto={data.reg_upto}
              taxPaidUpto={data.taxPaidUpto}
              insuranceUpto={data.insurancePaidUpto}
              puccUpto={data.pucValidUpto}
              fitUpto={data.fit_upto}
              userId={data.userId} 
            />))}
    </div>
  )
}

export default Vehicles