import httpClient from '@/services/httpClient';

// ─── Doctor ───────────────────────────────────────────────
export const getDoctors = () => {
  return httpClient.get('/doctors');
};

export const getDoctorById = (id) => {
  return httpClient.get(`/doctors/${id}`);
};

export const getDoctorProfile = () => {
  return httpClient.get('/doctors/profile/me');
};

export const updateDoctorProfile = (data) => {
  return httpClient.put('/doctors/profile/me', data);
};

// ─── Onboarding ───────────────────────────────────────────
export const registerDoctor = (data) => {
  return httpClient.post('/doctors/register', data);
};

export const uploadDoctorDocuments = (formData) => {
  return httpClient.post('/doctors/documents', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// ─── Appointments ─────────────────────────────────────────
export const getDoctorAppointments = (status) => {
  const params = status ? { status } : {};
  return httpClient.get('/doctors/appointments', { params });
};

export const confirmAppointment = (appointmentId) => {
  return httpClient.put(`/doctors/appointments/${appointmentId}/confirm`);
};

export const completeAppointment = (appointmentId) => {
  return httpClient.put(`/doctors/appointments/${appointmentId}/complete`);
};

export const cancelAppointment = (appointmentId) => {
  return httpClient.put(`/doctors/appointments/${appointmentId}/cancel`);
};

// ─── Availability ─────────────────────────────────────────
export const getDoctorAvailability = () => {
  return httpClient.get('/doctors/availability');
};

export const setDoctorAvailability = (data) => {
  return httpClient.post('/doctors/availability', data);
};

export const updateDoctorAvailability = (data) => {
  return httpClient.put('/doctors/availability', data);
};

// ─── Earnings ─────────────────────────────────────────────
export const getDoctorEarnings = (period) => {
  const params = period ? { period } : {};
  return httpClient.get('/doctors/earnings', { params });
};

export const getDoctorEarningsSummary = () => {
  return httpClient.get('/doctors/earnings/summary');
};

// ─── Patients ─────────────────────────────────────────────
export const getDoctorPatients = () => {
  return httpClient.get('/doctors/patients');
};

export const getPatientHistory = (patientId) => {
  return httpClient.get(`/doctors/patients/${patientId}/history`);
};
