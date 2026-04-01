import { useState, useEffect, useCallback } from 'react';
import { getLabTests, createLabTest, updateLabTest, deleteLabTest } from '../api/clinicApi';

export const useLabTests = () => {
  const [labTests, setLabTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchLabTests = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await getLabTests();
      setLabTests(res.data.data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchLabTests(); }, [fetchLabTests]);

  const flash = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(null), 3000); };

  const handleCreate = async (data) => {
    setSaving(true); setError(null);
    try {
      await createLabTest(data);
      await fetchLabTests();
      flash('Lab test created!');
      return true;
    } catch (err) { setError(err.response?.data?.message || err.message); return false; }
    finally { setSaving(false); }
  };

  const handleUpdate = async (id, data) => {
    setSaving(true); setError(null);
    try {
      await updateLabTest(id, data);
      await fetchLabTests();
      flash('Lab test updated!');
      return true;
    } catch (err) { setError(err.response?.data?.message || err.message); return false; }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLabTest(id);
      await fetchLabTests();
      flash('Lab test deleted.');
    } catch (err) { setError(err.message); }
  };

  return { labTests, loading, saving, error, success, handleCreate, handleUpdate, handleDelete, refetch: fetchLabTests };
};