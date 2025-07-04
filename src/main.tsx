import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./components/AnimatedMeshBg.css";
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactRoute from './routes/Contact.tsx';
import Layout from './components/Layout.tsx';
import CertificatesRoute from './routes/Certificates.tsx';
import CertificateRoute from './routes/Certificate.tsx';
import FourOFour from './routes/FourOFour.tsx';
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="book" element={<ContactRoute />} />
          <Route path="certs" element={<CertificatesRoute />}>
            <Route path=":id" element={<CertificateRoute />} />
          </Route>
          <Route path="*" element={<FourOFour />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </StrictMode>
)
