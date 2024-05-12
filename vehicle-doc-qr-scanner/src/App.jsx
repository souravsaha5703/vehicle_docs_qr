import { useState } from 'react';
import qrScannerPic from '../public/qr scanner image.jpg';
import { Scanner } from '@yudiel/react-qr-scanner';

function App() {
  const [qrScanner,setQrScanner]=useState(false);
  const [verifyActive,setVerifyActive]=useState(false);
  const [qrData,setQrData]=useState({});

  const handleClickBtn=(e)=>{
    e.preventDefault();
    setQrScanner(true);
  }

  const handleScan=(result,text)=>{
      console.log(result);
      let jsondata=JSON.parse(result);
      setQrData(jsondata);
      console.log(qrData);
      setQrScanner(false);
  }

  return (
    <>
      <div className='w-full h-screen flex justify-center items-center flex-col'>
        <h1 className="font-poppins text-slate-950 text-4xl my-3 font-semibold text-center">Vehicle Doc 360</h1>
        <h3 className="font-noto text-red-500 text-3xl font-medium mb-5 text-center">Scan a qr code to verify details of trucks during entry.</h3>
        {!qrScanner ? (
          <div className="container mx-auto text-center flex items-center justify-center flex-col" id="before-scan">
          <img src={qrScannerPic} alt="Qr Code Scanner" className="w-52 h-44 object-cover rounded-sm" />
          <button className="bg-blue-400 hover:bg-blue-700 text-white font-semibold transition-all ease-linear duration-150 font-noto py-2 px-4 rounded-sm mt-6" onClick={handleClickBtn}>
            Click here to Scan a QR Code
          </button>
        </div>
        ) : (
          <Scanner
          onResult={handleScan}
          onError={(error) => console.log(error?.message)}
          />
        )}
        {/* {verifyActive ? (
          <h1>hehe</h1>
        ) : (
          <h2>lol</h2>
        )} */}
      </div>
    </>
  )
}

export default App
