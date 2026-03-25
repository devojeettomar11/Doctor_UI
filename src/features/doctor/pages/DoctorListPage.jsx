import React from 'react';
import DoctorList from '../components/DoctorList';

const DoctorListPage = () => {
  return (
    <div className="doctor-list-page">
      <h1>Available Doctors</h1>
      <DoctorList />
    </div>
  );
};

export default DoctorListPage;
