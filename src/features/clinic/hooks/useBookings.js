import { useState, useEffect, useCallback } from 'react';
import {
  getBookings, assignTechnician, updateBookingStatus,
  uploadReport, cancelBooking, getTechnicians,
} from '../api/clinicApi';

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeStatus, setActiveStatus] = useState('');

  const flash = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(null), 3000); };

  const fetchBookings = useCallback(async (status = activeStatus) => {
    setLoading(true); setError(null);
    try {
      const [bookRes, techRes] = await Promise.all([
        getBookings(status),
        getTechnicians(),
      ]);
      setBookings(bookRes.data.data);
      setTechnicians(techRes.data.data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, [activeStatus]);

  useEffect(() => { fetchBookings(activeStatus); }, [activeStatus]);

  const handleAssignTechnician = async (bookingId, technicianId) => {
    setActionLoading(bookingId);
    try {
      await assignTechnician(bookingId, { technicianId });
      await fetchBookings(activeStatus);
      flash('Technician assigned!');
    } catch (err) { setError(err.message); }
    finally { setActionLoading(null); }
  };

  const handleStatusUpdate = async (bookingId, status) => {
    setActionLoading(bookingId);
    try {
      await updateBookingStatus(bookingId, status);
      await fetchBookings(activeStatus);
      flash('Status updated!');
    } catch (err) { setError(err.message); }
    finally { setActionLoading(null); }
  };

  const handleUploadReport = async (bookingId, file) => {
    setActionLoading(bookingId);
    try {
      const fd = new FormData();
      fd.append('report', file);
      await uploadReport(bookingId, fd);
      await fetchBookings(activeStatus);
      flash('Report uploaded successfully!');
    } catch (err) { setError(err.message); }
    finally { setActionLoading(null); }
  };

  const handleCancel = async (bookingId) => {
    setActionLoading(bookingId);
    try {
      await cancelBooking(bookingId);
      await fetchBookings(activeStatus);
      flash('Booking cancelled.');
    } catch (err) { setError(err.message); }
    finally { setActionLoading(null); }
  };

  const filterByStatus = (status) => setActiveStatus(status);

  const counts = {
    '': bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    assigned: bookings.filter((b) => b.status === 'assigned').length,
    sample_collected: bookings.filter((b) => b.status === 'sample_collected').length,
    in_analysis: bookings.filter((b) => b.status === 'in_analysis').length,
    report_ready: bookings.filter((b) => b.status === 'report_ready').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
  };

  return {
    bookings, technicians, loading, actionLoading, error, success,
    activeStatus, counts, filterByStatus,
    handleAssignTechnician, handleStatusUpdate, handleUploadReport, handleCancel,
    refetch: fetchBookings,
  };
};