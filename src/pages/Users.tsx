import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';


const Users: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      Users
      </div>
    </>
  );
};

export default Users;
