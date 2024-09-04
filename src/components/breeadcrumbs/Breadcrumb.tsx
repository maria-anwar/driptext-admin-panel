import React from "react";
import { Link } from "react-router-dom";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-6  items-start justify-start">
      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link
              className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
              to="/dashboard"
            >
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>
    </div>
  );
};

export default Breadcrumb;
