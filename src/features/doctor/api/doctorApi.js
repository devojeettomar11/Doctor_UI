import httpClient from '@/services/httpClient';

export const getDoctors = () => {
  return httpClient.get('/doctors');
};

export const getDoctorById = (id) => {
  return httpClient.get(`/doctors/${id}`);
};
