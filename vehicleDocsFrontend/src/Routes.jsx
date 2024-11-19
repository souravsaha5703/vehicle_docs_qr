import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './Pages/Authentication/Login';
import VerifyOTP from './Pages/Authentication/VerifyOTP';
import ProtectedRoutes from './ProtectedRoutes';
import Dashboard from './Pages/Admin/Dashboard';
import AddVehicles from './Pages/Admin/AddVehicles';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='' element={<Login />} />
                    <Route path='verifyotp' element={<VerifyOTP />} />
                    <Route path='/admin' element={<ProtectedRoutes />}>
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route path='add_vehicles' element={<AddVehicles/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter