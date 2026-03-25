import { useState, useEffect } from 'react';
import { getDoctorEarnings, getDoctorEarningsSummary } from '../api/doctorApi';

export const useEarnings = () => {
  const [earnings, setEarnings] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('monthly');

  const fetchEarnings = async (selectedPeriod = period) => {
    setLoading(true);
    setError(null);
    try {
      const [earningsRes, summaryRes] = await Promise.all([
        getDoctorEarnings(selectedPeriod),
        getDoctorEarningsSummary(),
      ]);
      setEarnings(earningsRes.data.data);
      setSummary(summaryRes.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarnings(period);
  }, [period]);

  const changePeriod = (newPeriod) => {
    setPeriod(newPeriod);
  };

  return {
    earnings,
    summary,
    loading,
    error,
    period,
    changePeriod,
    refetch: fetchEarnings,
  };
};
