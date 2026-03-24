import httpClient from '@/services/httpClient';

export const getDoctors = () => httpClient.get('/doctors');
export const getDoctorById = (id) => httpClient.get('/doctors/' + id);
export const getDoctorProfile = () => httpClient.get('/doctors/profile/me');
export const updateDoctorProfile = (data) => httpClient.put('/doctors/profile/me', data);

export const registerDoctor = (data) => httpClient.post('/doctors/register', data);
export const uploadDoctorDocuments = (formData) => httpClient.post('/doctors/documents', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const getDoctorAppointments = (status) => {
  const params = status ? { status } : {};
  return httpClient.get('/doctors/appointments', { params });
};
export const confirmAppointment = (id) => httpClient.put('/doctors/appointments/' + id + '/confirm');
export const completeAppointment = (id) => httpClient.put('/doctors/appointments/' + id + '/complete');
export const cancelAppointment = (id) => httpClient.put('/doctors/appointments/' + id + '/cancel');
export const updateAppointmentStatus = (id, status) => httpClient.put('/doctors/appointments/' + id + '/status', { status });

export const getDoctorAvailability = () => httpClient.get('/doctors/availability');
export const setDoctorAvailability = (data) => httpClient.post('/doctors/availability', data);
export const updateDoctorAvailability = (data) => httpClient.put('/doctors/availability', data);

export const getDoctorEarnings = (period) => {
  const params = period ? { period } : {};
  return httpClient.get('/doctors/earnings', { params });
};
export const getDoctorEarningsSummary = () => httpClient.get('/doctors/earnings/summary');

export const getDoctorPatients = () => httpClient.get('/doctors/patients');
export const getPatientHistory = (id) => httpClient.get('/doctors/patients/' + id + '/history');
