import Navbar from './Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <Navbar />
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='w-56'></div>
        <div className='w-full'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
