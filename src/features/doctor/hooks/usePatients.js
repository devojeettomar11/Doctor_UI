import { useState, useEffect } from 'react';
import { getDoctorPatients, getPatientHistory } from '../api/doctorApi';

export const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDoctorPatients();
      setPatients(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientHistory = async (patientId) => {
    setHistoryLoading(true);
    try {
      const response = await getPatientHistory(patientId);
      setPatientHistory(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setHistoryLoading(false);
    }
  };

  const selectPatient = (patient) => {
    setSelectedPatient(patient);
    fetchPatientHistory(patient._id);
  };

  const clearSelectedPatient = () => {
    setSelectedPatient(null);
    setPatientHistory([]);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.phone?.includes(search)
  );

  return {
    patients: filteredPatients,
    selectedPatient,
    patientHistory,
    loading,
    historyLoading,
    error,
    search,
    setSearch,
    selectPatient,
    clearSelectedPatient,
    refetch: fetchPatients,
  };
};
