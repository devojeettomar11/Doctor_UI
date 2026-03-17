import React from 'react';

// Using camelCase for component filename as requested
const doctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <img src={doctor.image} alt={doctor.name} />
      <h3>{doctor.name}</h3>
      <p>{doctor.specialization}</p>
      <p>Fee: ₹{doctor.consultationFee}</p>
      <button>Book Appointment</button>
    </div>
  );
};

export default doctorCard;
