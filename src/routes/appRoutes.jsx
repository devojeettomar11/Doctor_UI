import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardPage from '../features/medicalStore/pages/Dashboard';
import InventoryPage from '../features/medicalStore/pages/inventory';
import StoreSetupPage from '../features/medicalStore/pages/storeSetup';
import StoreSelectorPage from '../features/medicalStore/pages/storeSelector';
import TaxSettingsPage from '../features/medicalStore/pages/taxSettings';
import OrdersPage from '../features/medicalStore/pages/orders';
import OrderAuditPage from '../features/medicalStore/pages/orderAudit';

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<StoreSelectorPage />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/inventory" element={<InventoryPage />} />
				<Route path="/store-setup" element={<StoreSetupPage />} />
				<Route path="/orders" element={<OrdersPage />} />
				<Route path="/orders/:orderId/audit" element={<OrderAuditPage />} />
				<Route path="/taxes" element={<TaxSettingsPage />} />
				<Route path="*" element={<StoreSelectorPage />} />
			</Routes>
		</BrowserRouter>
	);
}
