import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
interface BreadcrumbProps {
  pageName: string;
  link?: string;
  linkshift?: string;
  homeName?: string;
}
const Breadcrumb = ({ pageName ,link,linkshift,homeName}: BreadcrumbProps) => {
  const {t} = useTranslation();
  return (
    <div className="mb-6 flex flex-col gap-6  items-start justify-start">
      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link
              className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
              to="/dashboard"
            >
              {t('projects.dashboard')}
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}{linkshift}{link}</li>
        </ol>
      </nav>
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {link ? `${homeName} zu ${link}` : `${pageName}`}
      </h2>
    </div>
  );
};

export default Breadcrumb;
