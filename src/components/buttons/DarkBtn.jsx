import React from "react";
import { Link } from "react-router-dom";

const DarkBtn = ({name,url}) => {
  return (
    <Link
      to={url}
      className="inline-flex items-center justify-center gap-2.5 bg-black py-4 text-sm xl:text-base  text-center font-medium text-white hover:bg-opacity-90 px-5 lg:px-8 5xl:px-10"
    >
      <span>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </span>
      {name}
    </Link>
  );
};

export default DarkBtn;
