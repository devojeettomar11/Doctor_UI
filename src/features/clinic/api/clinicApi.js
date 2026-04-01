import httpClient from '@/services/httpClient';

// ── Packages ──────────────────────────────────────────────
export const getPackages = () => httpClient.get('/clinic/packages');
export const getPackageById = (id) => httpClient.get(`/clinic/packages/${id}`);
export const createPackage = (data) => httpClient.post('/clinic/packages', data);
export const updatePackage = (id, data) => httpClient.put(`/clinic/packages/${id}`, data);
export const deletePackage = (id) => httpClient.delete(`/clinic/packages/${id}`);
export const togglePackageStatus = (id) => httpClient.patch(`/clinic/packages/${id}/toggle`);

// ── Lab Tests ─────────────────────────────────────────────
export const getLabTests = () => httpClient.get('/clinic/lab-tests');
export const getLabTestById = (id) => httpClient.get(`/clinic/lab-tests/${id}`);
export const createLabTest = (data) => httpClient.post('/clinic/lab-tests', data);
export const updateLabTest = (id, data) => httpClient.put(`/clinic/lab-tests/${id}`, data);
export const deleteLabTest = (id) => httpClient.delete(`/clinic/lab-tests/${id}`);

// ── Bookings ──────────────────────────────────────────────
export const getBookings = (status) => {
  const params = status ? { status } : {};
  return httpClient.get('/clinic/bookings', { params });
};
export const getBookingById = (id) => httpClient.get(`/clinic/bookings/${id}`);
export const assignTechnician = (id, data) => httpClient.put(`/clinic/bookings/${id}/assign`, data);
export const updateBookingStatus = (id, status) => httpClient.put(`/clinic/bookings/${id}/status`, { status });
export const uploadReport = (id, formData) =>
  httpClient.post(`/clinic/bookings/${id}/report`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const cancelBooking = (id) => httpClient.put(`/clinic/bookings/${id}/cancel`);

// ── Revenue ───────────────────────────────────────────────
export const getRevenueSummary = () => httpClient.get('/clinic/revenue/summary');
export const getRevenueTransactions = (period) => {
  const params = period ? { period } : {};
  return httpClient.get('/clinic/revenue/transactions', { params });
};

// ── Technicians ───────────────────────────────────────────
export const getTechnicians = () => httpClient.get('/clinic/technicians');