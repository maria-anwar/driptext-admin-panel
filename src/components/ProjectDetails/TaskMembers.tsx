import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import getInitials from "../Helpers/UpperCaseName";

const TaskMembers: React.FC<{ label: string; name: string,removeDelete?:boolean,handleMembers:()=>void }> = ({
  label,
  name,
  removeDelete,
  handleMembers
}) => {

  return name === "" ? (
    <></>
  ) : (
    <div>
      <p className="text-sm">{label}</p>
      <div className="flex justify-between items-center py-1.5">
        <div className="flex justify-start items-center">
          <p className="text-black h-6 w-6  dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs px-1 py-1 flex justify-center items-center">
            {getInitials(name)}
          </p>
          <p className="px-2.5 text-black dark:text-white">{name}</p>
        </div>
        <div className="flex justify-start items-center">
          <svg
            fill="#3CB371"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-3.5 h-3.5 text-blue-500  cursor-pointer mx-6"
            onClick={() => handleMembers()}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M447.1,86.2C400.3,33.4,332.2,0,256,0C114.6,0,0,114.6,0,256h64c0-106.1,85.9-192,192-192c58.5,0,110.4,26.5,145.5,67.8L341.3,192H512V21.3L447.1,86.2z M256,448c-58.5,0-110.4-26.5-145.5-67.8l60.2-60.2H0v170.7l64.9-64.9c46.8,52.8,115,86.2,191.1,86.2c141.4,0,256-114.6,256-256h-64C448,362.1,362.1,448,256,448z M298.7,256c0-23.6-19.1-42.7-42.7-42.7s-42.7,19.1-42.7,42.7s19.1,42.7,42.7,42.7S298.7,279.6,298.7,256z"></path>
            </g>
          </svg>

          {!removeDelete && (
          <FontAwesomeIcon
            icon={faTimes}
            className="text-lg text-red-500 cursor-pointer"
            onClick={() => alert(`Delete ${label}`)}
          />)}
        </div>
      </div>
    </div>
  );
};

export default TaskMembers;