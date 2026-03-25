import { useState, useEffect } from 'react';
import { getDoctorAvailability, setDoctorAvailability, updateDoctorAvailability } from '../api/doctorApi';
import { DAYS } from '../types';

const defaultSchedule = DAYS.map((day) => ({
  day,
  isAvailable: false,
  startTime: '09:00',
  endTime: '17:00',
  slotDuration: 15,
}));

export const useAvailability = () => {
  const [availability, setAvailability] = useState(defaultSchedule);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const fetchAvailability = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDoctorAvailability();
      const data = response.data.data;
      if (data && data.length > 0) {
        setIsFirstTime(false);
        // Merge with defaultSchedule so all 7 days always show
        const merged = DAYS.map((day) => {
          const existing = data.find((d) => d.day === day);
          return existing || defaultSchedule.find((d) => d.day === day);
        });
        setAvailability(merged);
      }
    } catch (err) {
      // 404 means no availability set yet — that's fine
      if (err.response?.status !== 404) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const toggleDay = (day) => {
    setAvailability((prev) =>
      prev.map((item) =>
        item.day === day ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const updateDayField = (day, field, value) => {
    setAvailability((prev) =>
      prev.map((item) =>
        item.day === day ? { ...item, [field]: value } : item
      )
    );
  };

  const saveAvailability = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const payload = { schedule: availability };
      if (isFirstTime) {
        await setDoctorAvailability(payload);
        setIsFirstTime(false);
      } else {
        await updateDoctorAvailability(payload);
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return {
    availability,
    loading,
    saving,
    error,
    success,
    toggleDay,
    updateDayField,
    saveAvailability,
  };
};
