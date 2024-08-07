import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';


const Customers: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Customers" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
            Customers
      </div>
    </>
  );
};

export default Customers;
