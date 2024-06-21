import {BrowserRouter, Route, Routes} from 'react-router-dom'
import App from "./App";
import QrScanner from "./Components/QrScanner";
import VerifyData from './Components/VerifyData';
import GuestQrScanner from './GuestComponents/GuestQrScanner';
import GuestVerifyData from './GuestComponents/GuestVerifyData';

const AppRouter=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App/>}>
                    <Route path='' element={<QrScanner/>}/>
                    <Route path='verifydata' element={<VerifyData/>}/>
                    <Route path='guestqrscanner' element={<GuestQrScanner/>}/>
                    <Route path='guestverifydetails' element={<GuestVerifyData/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;