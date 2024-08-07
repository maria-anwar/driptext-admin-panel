import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';


const Products: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Products" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
            Product
      </div>
    </>
  );
};

export default Products;
