import React from "react";
import Breadcrumb from "../../../components/breeadcrumbs/Breadcrumb";

const Customers : React.FC = () => {
    return(
        <>
        <div className="mx-auto 3xl:px-6">
          <Breadcrumb pageName="Customers" />
        </div>
      </>
   
    );
};

export default Customers;