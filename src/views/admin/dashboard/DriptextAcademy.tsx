import React from "react";
import Breadcrumb from "../../../components/breeadcrumbs/Breadcrumb";
import useTitle from "../../../hooks/useTitle";

const DriptextAcademy : React.FC = () => {
    useTitle("Driptext Academy Overview");
    return(
        <>
        <div className="mx-auto 3xl:px-6">
          <Breadcrumb pageName="Driptext Academy" />
        </div>
      </>
   
    );
};

export default DriptextAcademy;