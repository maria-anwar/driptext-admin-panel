import React from "react";
import Breadcrumb from "../../../components/breeadcrumbs/Breadcrumb";

const Users : React.FC = () => {
    return(
        <>
        <div className="mx-auto 3xl:px-6">
          <Breadcrumb pageName="User" />
        </div>
      </>
    );
};

export default Users;