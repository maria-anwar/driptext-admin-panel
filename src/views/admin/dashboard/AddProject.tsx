import React from "react";
import { Link } from "react-router-dom";

const AddProject: React.FC = () => {
  return (
    <div className="mx-auto 3xl:px-6 py-3">
      <ol className="flex items-center gap-2 text-left">
        <li>
          <Link
            className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
            to="/dashboard"
          >
            Dashboard /
          </Link>
        </li>
        <li className="font-medium text-primary">Add Project</li>
      </ol>
      <div className="flex flex-col sm:flex-row items-start justify-between lg:items-center xl:items-center pt-5 pb-3">
        <div className="flex flex-col sm:flex-row gap-2 lg:gap-30 xl:gap-30 items-start lg:items-center xl:items-center">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white py-1">
            Add Project
          </h2>
        </div>

        {/* Dropdown Trigger */}
        <div className="relative">dggdfg</div>
      </div>
    </div>
  );
};

export default AddProject;
