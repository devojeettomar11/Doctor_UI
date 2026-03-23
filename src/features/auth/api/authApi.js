import httpClient from '@/services/httpClient';

/**
 * Auth API Service
 */
export const login = async (credentials) => {
  const { data } = await httpClient.post('/auth/login', credentials);
  return data;
};

export const register = async (userData) => {
  const { data } = await httpClient.post('/auth/register', userData);
  return data;
};
