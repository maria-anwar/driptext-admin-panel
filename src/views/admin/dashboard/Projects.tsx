import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DarkBtn from "../../../components/buttons/DarkBtn";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Breadcrumb from "../../../components/breeadcrumbs/Breadcrumb";

const Projects: React.FC = () => {
  return (
    <>
      <div className="mx-auto 3xl:px-6">
        <Breadcrumb pageName="Projects" />
      </div>

      <div className="w-full flex flex-col gap-3 2xl:gap-0 2xl:flex-row 2xl:justify-between items-center 4xl:px-14 mb-3 4xl:mb-6 mt-2 lg:mt-1">
        <div className="w-full 2xl:max-w-max"></div>
      </div>
    </>
  );
};

export default Projects;
