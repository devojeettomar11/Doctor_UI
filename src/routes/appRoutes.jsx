import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/mainLayout';
import ModernLayout from '@/layouts/ModernLayout';
import DashboardPage from '@/features/auth/pages/dashboardPage';
import DoctorListPage from '@/features/doctor/pages/DoctorListPage';
import AuthPage from '@/features/auth/pages/AuthPage';
import ProtectedRoute from './ProtectedRoute';

// Marketing Pages
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

// Medical Store Pages
import StoreDashboardPage from '../features/medicalStore/pages/Dashboard';
import InventoryPage from '../features/medicalStore/pages/inventory';
import StoreSetupPage from '../features/medicalStore/pages/storeSetup';
import StoreSelectorPage from '../features/medicalStore/pages/storeSelector';
import TaxSettingsPage from '../features/medicalStore/pages/taxSettings';
import OrdersPage from '../features/medicalStore/pages/orders';
import OrderAuditPage from '../features/medicalStore/pages/orderAudit';

// Doctor Pages
import DoctorLayout from '@/features/doctor/pages/DoctorLayout';
import DoctorDashboardPage from '@/features/doctor/pages/DoctorDashboardPage';
import AppointmentsPage from '@/features/doctor/pages/AppointmentsPage';
import AvailabilityPage from '@/features/doctor/pages/AvailabilityPage';
import PatientsPage from '@/features/doctor/pages/PatientsPage';
import EarningsPage from '@/features/doctor/pages/EarningsPage';
import OnboardingPage from '@/features/doctor/pages/OnboardingPage';

const AppRoutes = () => {
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
        </Route>
      </Route>

      {/* Medical Store Routes (Scoped) */}
      <Route path="/store">
        <Route index element={<StoreSelectorPage />} />
        <Route path="dashboard" element={<StoreDashboardPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="store-setup" element={<StoreSetupPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/:orderId/audit" element={<OrderAuditPage />} />
        <Route path="taxes" element={<TaxSettingsPage />} />
      </Route>

      {/* Doctor Routes (Scoped) */}
      <Route path="/doctor" element={<ProtectedRoute />}>
        <Route element={<DoctorLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DoctorDashboardPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="availability" element={<AvailabilityPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="earnings" element={<EarningsPage />} />
          <Route path="onboarding" element={<OnboardingPage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
