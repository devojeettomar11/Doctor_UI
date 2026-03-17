import React from 'react';
import doctorList from '../components/doctorList';

const doctorListPage = () => {
  return (
    <div className="doctor-list-page">
      <h1>Available Doctors</h1>
      <doctorList />
    </div>
  );
};

export default doctorListPage;
