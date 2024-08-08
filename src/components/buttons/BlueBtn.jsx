import React from 'react'
import { Link } from "react-router-dom";

const BlueBtn = ({name}) => {
  return (
    <Link
    to="#"
    className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary  text-center font-medium text-white hover:bg-opacity-90 py-3.5 px-8 lg:px-8 xl:px-8"
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
  )
}

export default BlueBtn