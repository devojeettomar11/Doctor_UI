import { useState, useEffect, useCallback } from 'react';
import {
  getDoctorAppointments,
  confirmAppointment,
  completeAppointment,
  cancelAppointment,
} from '../api/doctorApi';
import { APPOINTMENT_STATUS } from '../types';

export const useAppointments = (initialStatus = '') => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeStatus, setActiveStatus] = useState(initialStatus);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchAppointments = useCallback(async (status = activeStatus) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDoctorAppointments(status);
      setAppointments(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [activeStatus]);

  useEffect(() => {
    fetchAppointments(activeStatus);
  }, [activeStatus]);

  const handleConfirm = async (appointmentId) => {
    setActionLoading(appointmentId);
    try {
      await confirmAppointment(appointmentId);
      await fetchAppointments(activeStatus);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleComplete = async (appointmentId) => {
    setActionLoading(appointmentId);
    try {
      await completeAppointment(appointmentId);
      await fetchAppointments(activeStatus);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (appointmentId) => {
    setActionLoading(appointmentId);
    try {
      await cancelAppointment(appointmentId);
      await fetchAppointments(activeStatus);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const filterByStatus = (status) => {
    setActiveStatus(status);
  };

  const counts = {
    all: appointments.length,
    upcoming: appointments.filter((a) => a.status === APPOINTMENT_STATUS.UPCOMING).length,
    today: appointments.filter((a) => a.status === APPOINTMENT_STATUS.TODAY).length,
    completed: appointments.filter((a) => a.status === APPOINTMENT_STATUS.COMPLETED).length,
    cancelled: appointments.filter((a) => a.status === APPOINTMENT_STATUS.CANCELLED).length,
  };

  return {
    appointments,
    loading,
    error,
    activeStatus,
    actionLoading,
    counts,
    filterByStatus,
    handleConfirm,
    handleComplete,
    handleCancel,
    refetch: fetchAppointments,
  };
};
