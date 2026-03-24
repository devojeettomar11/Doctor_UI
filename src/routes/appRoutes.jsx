import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/mainLayout';
import ModernLayout from '@/layouts/ModernLayout';
import DashboardPage from '@/features/auth/pages/dashboardPage';
import DoctorListPage from '@/features/doctor/pages/doctorListPage';
import AuthPage from '@/features/auth/pages/AuthPage';
import ProtectedRoute from './ProtectedRoute';

// New Shared Pages
import Home from '@/shared/pages/Home';
import About from '@/shared/pages/About';
import Services from '@/shared/pages/Services';
import Careers from '@/shared/pages/Careers';
import Contact from '@/shared/pages/Contact';
import OnlineConsultation from '@/shared/pages/OnlineConsultation';
import LabTests from '@/shared/pages/LabTests';
import OrderTracking from '@/shared/pages/OrderTracking';
import MedicineReminder from '@/shared/pages/MedicineReminder';
import EmergencySupport from '@/shared/pages/EmergencySupport';
import PrivacyPolicy from '@/shared/pages/PrivacyPolicy';
import TermsOfService from '@/shared/pages/TermsOfService';
import CookiePolicy from '@/shared/pages/CookiePolicy';
import RefundPolicy from '@/shared/pages/RefundPolicy';

const appRoutes = () => {
  return (
    <Routes>
      {/* Public Marketing Routes */}
      <Route element={<ModernLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/online-consultation" element={<OnlineConsultation />} />
        <Route path="/lab-tests" element={<LabTests />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/medicine-reminder" element={<MedicineReminder />} />
        <Route path="/emergency-support" element={<EmergencySupport />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
      </Route>

      {/* Auth Routes (Public) */}
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />

      {/* App Routes (Protected & Layout Wrapped) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/doctors" element={<DoctorListPage />} />
          {/* Add more protected routes here */}
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default appRoutes;

