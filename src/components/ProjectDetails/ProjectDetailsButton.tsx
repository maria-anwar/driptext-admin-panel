import { faEdit, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import AddModel from "./AddTask";
import DeleteModel from "./DeleteProject";
import EditProject from "./EditProject";
import { OnBoarding } from "../../Types/Type";

interface ProjectDetailsButtonProps {
  projectName: string;
  projectId: string;
  _id: string;
  userId: string;
  getTaskData: () => void;
  speech: string;
  perspective: string;
  handleDelete: () => void;
  firstName: string;
  lastName: string;
  email: string;
  onBoarding: OnBoarding | undefined | null;
}

const ProjectDetailsButton: React.FC<ProjectDetailsButtonProps> = ({
  projectName,
  projectId,
  _id,
  userId,
  onBoarding,
  getTaskData,
  speech,
  perspective,
  handleDelete,
  firstName,
  lastName,
  email,
}) => {
  const [addModel, setAddModel] = useState(false);
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
          {/* Add Button */}
          <div className="relative group">
            <button
              onClick={() => setAddModel(true)}
              disabled={!onBoarding}
              className="w-10 h-10 text-center bg-blue-500 text-white rounded-none my-2 flex justify-center items-center border-none"
            >
              <FontAwesomeIcon icon={faPlus} className="text-sm px-2" />
            </button>
            {/* Tooltip for Add Icon */}
            <div className=" shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-5 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Add Task
            </div>
            {addModel && (
              <AddModel
                projectName={projectName}
                projectId={_id}
                userId={userId}
                handleCloseAdd={() => setAddModel(false)}
                getTaskData={getTaskData}
              />
            )}
          </div>

          {/* Edit Button */}
          <div className="relative group">
            <button
              onClick={() => setEditModel(true)}
              className="w-10 h-10 text-center bg-slate-100 text-blue-500 hover:bg-blue-500 hover:text-white rounded-none my-2 flex justify-center items-center border-none"
            >
              <FontAwesomeIcon icon={faEdit} className="text-sm px-2" />
            </button>
            {/* Tooltip for Edit Icon */}
            <div className=" shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-5 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Edit Project
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

          {/* Delete Button */}
          <div className="relative group">
            <button
              onClick={() => setDeleteModel(true)}
              className="w-10 h-10 text-center bg-slate-100 text-slate-600 hover:bg-blue-500 hover:text-white rounded-none my-2 flex justify-center items-center border-none"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            {/* Tooltip for Delete Icon */}
            <div className=" shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-5 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Archive Project
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
      <div className="py-2">
        <h3 className="font-medium text-black dark:text-white">Client</h3>
        <p className="text-sm text-black dark:text-white">
          {firstName} {lastName} {"("}
          {email}
          {")"}
        </p>
      </div>
    </>
  );
};

export default ProjectDetailsButton;
