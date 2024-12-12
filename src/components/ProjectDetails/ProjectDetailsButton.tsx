import { faEdit, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import AddModel from "./AddTask";
import DeleteModel from "./DeleteProject";
import EditProject from "./EditProject";
import { OnBoarding } from "../../Types/Type";
import { useTranslation } from "react-i18next";

interface ProjectDetailsButtonProps {
  projectName: string;
  projectId: string;
  _id: string;
  getTaskData: () => void;
  speech: string;
  perspective: string;
  handleDelete: () => void;
  firstName: string;
  lastName: string;
  email: string;
  onBoarding: OnBoarding | undefined | null;
  folderLink: string;
}

const ProjectDetailsButton: React.FC<ProjectDetailsButtonProps> = ({
  projectName,
  projectId,
  _id,
  onBoarding,
  getTaskData,
  speech,
  perspective,
  handleDelete,
  firstName,
  lastName,
  email,
  folderLink,
}) => {
  const { t } = useTranslation();
  const [editModel, setEditModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center gap-3">
        <p className="text-xl font-semibold text-black dark:text-white pb-2">
          {projectName}
          {" | "}
          {projectId}
        </p>

        <div className="flex justify-center items-center gap-3">
          <div className="relative group">
            <button
              onClick={() => setEditModel(true)}
              className="w-10 h-10 text-center bg-slate-100 text-blue-500 hover:bg-blue-500 hover:text-white rounded-none my-2 flex justify-center items-center border-none"
            >
              <FontAwesomeIcon icon={faEdit} className="text-sm px-2" />
            </button>
            <div className=" shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-5 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {t("projectDetails.editProject.label")}
            </div>
            {editModel && (
              <EditProject
                onBoarding={onBoarding}
                projectId={_id}
                domain={projectName}
                speech={speech}
                perspective={perspective}
                handleCloseEdit={() => setEditModel(false)}
                handleRefreshData={getTaskData}
              />
            )}
          </div>
          <div className="relative group">
            <button
              onClick={() => setDeleteModel(true)}
              className="w-10 h-10 text-center bg-slate-100 text-slate-600 hover:bg-blue-500 hover:text-white rounded-none my-2 flex justify-center items-center border-none"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <div className=" shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-5 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {t("projectDetails.archiveProject.label")}
            </div>
            {deleteModel && (
              <DeleteModel
                handleDelete={handleDelete}
                handleClose={() => setDeleteModel(false)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        {" "}
        <div className="py-2">
          <h3 className="font-medium text-black dark:text-white">
            {" "}
            {t("projectDetails.client.heading")}
          </h3>
          <p className="text-sm text-black dark:text-white">
            {firstName} {lastName} {"("}
            {email}
            {")"}
          </p>
        </div>
        <div className="py-2">
          <h2 className="font-medium text-black dark:text-white">{t("projectDetails.folder.heading")}</h2>
          <a
            href={folderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 w-max underline-none flex justify-start items-center relative group"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5.5 h-5.5"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>

            <span className="px-1">{projectId}</span>

            {/* Custom Tooltip */}
            <span className=" shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-6 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {t("projectDetails.folder.tooltip")}
            </span>
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsButton;
