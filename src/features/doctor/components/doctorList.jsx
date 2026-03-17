import React from 'react';
import { useDoctor } from '../hooks/useDoctor';
import doctorCard from './doctorCard';

const doctorList = () => {
  const { doctors, loading, error } = useDoctor();

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="doctor-list">
      {doctors.map((doctor) => (
        <doctorCard key={doctor._id} doctor={doctor} />
      ))}
    </div>
  );
};

export default doctorList;
