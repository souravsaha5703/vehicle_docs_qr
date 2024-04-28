import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Users from './Components/Users/Users';
import Vehicles from './Components/Vehicles/Vehicles';
import App from './App';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Otp from './Components/OTP/Otp';
import Loginotpverify from './Components/OTP/Loginotpverify';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='' element={<Login />} />
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/verifyotp' element={<Otp/>}/>
                <Route path='/loginotpverify' element={<Loginotpverify/>}/>
                <Route path='/' element={<App />}>
                    <Route path='dashboard' element={<Home />} />
                    <Route path='users' element={<Users />} />
                    <Route path='vehicles' element={<Vehicles />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;