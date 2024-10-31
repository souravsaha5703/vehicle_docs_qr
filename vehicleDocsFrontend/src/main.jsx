import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppContextProvider } from './Context/AppContextProvider';
import AppRouter from './Routes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
      <AppRouter />
    </AppContextProvider>
  </StrictMode>,
)
