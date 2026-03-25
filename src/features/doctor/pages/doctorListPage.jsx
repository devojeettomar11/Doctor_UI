// ===================== DoctorListPage.jsx =====================
// Fixed: was using lowercase component name (doctorList) which renders as HTML not React component
import React from 'react';
import DoctorList from '../components/DoctorList';

const DoctorListPage = () => {
  return (
    <div className="pb-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Available Doctors</h1>
        <p className="text-slate-500 mt-1 text-sm hidden sm:block">Find and book appointments with verified doctors.</p>
      </div>
      <DoctorList />
    </div>
  );
};

export default DoctorListPage;
