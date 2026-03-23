import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import OnlineConsultation from './pages/OnlineConsultation';
import LabTests from './pages/LabTests';
import OrderTracking from './pages/OrderTracking';
import MedicineReminder from './pages/MedicineReminder';
import EmergencySupport from './pages/EmergencySupport';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="online-consultation" element={<OnlineConsultation />} />
          <Route path="lab-tests" element={<LabTests />} />
          <Route path="order-tracking" element={<OrderTracking />} />
          <Route path="medicine-reminder" element={<MedicineReminder />} />
          <Route path="emergency-support" element={<EmergencySupport />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
