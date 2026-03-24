import React from 'react';
import { useDoctor } from '../hooks/useDoctor';
import DoctorCard from './DoctorCard';

const DoctorList = ({ onBookClick }) => {
  const { doctors, loading, error } = useDoctor();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-slate-200 rounded-sm h-80 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700 font-medium mb-2">❌ Error loading doctors</p>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!doctors || doctors.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-12 text-center">
        <p className="text-blue-700 font-medium text-lg">No doctors available</p>
        <p className="text-blue-600 text-sm mt-1">Please check back later</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor._id} doctor={doctor} onBookClick={onBookClick} />
      ))}
    </div>
  );
};

export default DoctorList;
