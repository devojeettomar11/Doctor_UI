// ===================== DoctorCard.jsx =====================
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ doctor, onBookClick }) => {
  const navigate = useNavigate();

  if (!doctor) return null;

  const handleBookClick = () => {
    if (onBookClick) {
      onBookClick(doctor);
    } else {
      navigate(`/doctor/${doctor._id}/book`, { state: { doctor } });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 hover:shadow-md transition border border-slate-200 group overflow-hidden">
      <div className="relative mb-3 md:mb-4 overflow-hidden rounded-xl bg-slate-100 h-36 md:h-40">
        {doctor.image ? (
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <span className="text-4xl">👨‍⚕️</span>
          </div>
        )}
      </div>

      <h3 className="font-semibold text-slate-800 truncate text-sm md:text-base">{doctor.name || 'Dr. Unknown'}</h3>
      <p className="text-xs md:text-sm text-slate-500 truncate mt-0.5">{doctor.specialization || 'General'}</p>

      <p className="mt-2 text-blue-600 font-semibold text-base md:text-lg">
        ₹{doctor.consultationFee?.toLocaleString('en-IN') || 0}
      </p>

      <button
        onClick={handleBookClick}
        className="mt-3 md:mt-4 w-full bg-blue-600 text-white py-2 md:py-2.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all font-medium text-sm"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;
