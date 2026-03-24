import { useState } from 'react';
import * as authApi from '../api/authApi';
import useAuthStore from '../store/authStore';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setAuth, clearAuth } = useAuthStore();

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.login(credentials);
      if (response.success) {
        setAuth(response.data.user, response.data.token);
        return { success: true, user: response.data.user };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.register(userData);
      if (response.success) {
        setAuth(response.data.user, response.data.token);
        return { success: true, user: response.data.user };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
  };

  return {
    login,
    register,
    logout,
    loading,
    error,
  };
};
