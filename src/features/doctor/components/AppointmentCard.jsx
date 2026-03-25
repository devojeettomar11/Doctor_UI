import React from 'react';
import { APPOINTMENT_STATUS } from '../types';

const AppointmentCard = ({ appointment, onConfirm, onComplete, onCancel, actionLoading }) => {
  if (!appointment) return null;

  const isLoading = actionLoading === appointment._id;
  const patientName = appointment.patient?.name || 'Unknown';
  const patientPhone = appointment.patient?.phone || 'N/A';
  const fee = appointment.consultationFee || 0;

  const Spinner = () => (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 hover:shadow-md transition border border-slate-200">

      <div className="flex justify-between items-start mb-3 md:mb-4">
        <div className="min-w-0 mr-2">
          <p className="font-semibold text-slate-800 truncate text-sm md:text-base">{patientName}</p>
          <p className="text-xs text-slate-400 mt-0.5">{patientPhone}</p>
        </div>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium flex-shrink-0">
          {appointment.status}
        </span>
      </div>

      <div className="text-sm text-slate-500 mb-3 md:mb-4 space-y-1">
        <p className="font-medium text-slate-600">{appointment.date}</p>
        <p className="text-slate-500">{appointment.time}</p>
        <p className="font-semibold text-blue-600">₹{fee.toLocaleString('en-IN')}</p>
      </div>

      <div className="flex gap-2">
        {appointment.status === APPOINTMENT_STATUS.UPCOMING && (
          <button
            onClick={() => onConfirm?.(appointment._id)}
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-2 md:py-2.5 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? <><Spinner /><span>Confirming...</span></> : 'Confirm'}
          </button>
        )}

        {appointment.status === APPOINTMENT_STATUS.TODAY && (
          <button
            onClick={() => onComplete?.(appointment._id)}
            disabled={isLoading}
            className="flex-1 bg-green-600 text-white py-2 md:py-2.5 rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? <><Spinner /><span>Completing...</span></> : 'Complete'}
          </button>
        )}

        <button
          onClick={() => onCancel?.(appointment._id)}
          disabled={isLoading}
          className="flex-1 bg-red-50 text-red-600 py-2 md:py-2.5 rounded-xl font-medium hover:bg-red-100 border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm"
        >
          {isLoading ? <><Spinner /><span>Cancelling...</span></> : 'Cancel'}
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
