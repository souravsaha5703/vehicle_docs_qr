import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './Pages/Authentication/Login';
import VerifyOTP from './Pages/Authentication/VerifyOTP';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='' element={<Login />} />
                    <Route path='verifyotp' element={<VerifyOTP />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter