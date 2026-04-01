import { useState, useEffect } from 'react';
import { getRevenueSummary, getRevenueTransactions } from '../api/clinicApi';

export const useRevenue = () => {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('monthly');

  const fetchRevenue = async (p = period) => {
    setLoading(true); setError(null);
    try {
      const [sumRes, txRes] = await Promise.all([
        getRevenueSummary(),
        getRevenueTransactions(p),
      ]);
      setSummary(sumRes.data.data);
      setTransactions(txRes.data.data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchRevenue(period); }, [period]);

  return { summary, transactions, loading, error, period, setPeriod, refetch: fetchRevenue };
};