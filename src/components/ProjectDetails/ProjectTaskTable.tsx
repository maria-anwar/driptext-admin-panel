import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "antd/dist/reset.css";
import TaskDetailModel from "./TaskDetailModel";
import { format } from "date-fns";
import getInitials from "../Helpers/UpperCaseName";
import {
  faPlus,
  faEdit,
  faDownload,
  faUpload,
  faTimes,
  faCloudUploadAlt,
  faGripLines,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Task {
  actualNumberOfWords: number | null;
  comments: string | null;
  createdAt: string; // ISO 8601 date string
  desiredNumberOfWords: string; // or number, depending on how it is used
  dueDate: string | null; // ISO 8601 date string or null
  googleLink: string | null;
  fileLink: string;
  fileId: string | null;
  isActive: "Y" | "N"; // Assuming 'Y' and 'N' are the only possible values
  keywords: string;
  lector: string | null;
  metaLector: string | null;
  project: string; // or a more specific type if it's an ObjectId
  published: boolean;
  readyToWork: boolean;
  seo: string | null;
  status: string;
  taskId: number;
  taskName: string;
  texter: string | null;
  topic: string | null;
  type: string | null;
  updatedAt: string; // ISO 8601 date string
  __v: number;
  _id: string; // or a more specific type if it's an ObjectId
}

interface ProjectProps {
  tasks: Task[];
  userId: string;
  projectId: string;
  projectName: string;
  handleRefreshData: () => void;
}

const ProjectTaskTable: React.FC<ProjectProps> = ({
  tasks,
  freelancer,
  userId,
  projectId,
  projectName,
  handleRefreshData,
}) => {
  const [showDetailsDialog, setShowDetailsDialog] = useState<boolean>(false);
  const [task, setTask] = useState({});
  const [importModel, setImportModel] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState(
    "Drag files here or click to select files"
  );
  const [file, setFile] = useState(null);
  console.log(tasks);
  const showAssignedRoles = (memberId: number) => {
    const foundFreelancer = freelancer.find((f) => f._id === memberId);
    if (foundFreelancer) {
      const fullName = `${foundFreelancer.firstName} ${foundFreelancer.lastName}`;
      return fullName;
    } else {
      return "";
    }
  };

  const handleTasks = (task: any) => {
    setTask(task);
    setShowDetailsDialog(true);
  };

  const hanldeCloseAllInfo = () => {
    setShowDetailsDialog(false);
  };

  const formatDate = (dateString: Date | string) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return format(date, "MMMM yyyy"); // "August 2025"
  };
  const handleImport = () => {
    setImportModel(true);
  };
  const handleCloseImport = () => {
    setFile(null);
    setFileName("No file chosen");
    setFileData(null);
    setImportModel(false);
  };

  const WorkerComponent: React.FC<{ label: string; name: string }> = ({
    label,
    name,
  }) => {
    return (
      <div className="text-black dark:text-white">
        <p className="dark:text-white text-black text-xs text-center py-1">
          {label}
        </p>
        <p className="text-black w-6 h-6 dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs px-1 py-1 flex justify-center items-center">
          {getInitials(name)}
        </p>
      </div>
    );
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const isExcelFile =
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        selectedFile.type === "application/vnd.ms-excel";

      if (isExcelFile) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        e.target.value = "";
      } else {
        setFileName("Please select a valid Excel file");
        setFile(null);
      }
    } else {
      setFileName("No file chosen");
      setFile(null);
    }
  };
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };
  const handleImportData = async () => {
    if (file) {
      try {
        const data = await readFile(file);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        setFileData(jsonData);
        console.log("Parsed Data:", jsonData);
        toast.success("File imported successfully");
        setFile(null);
        setFileName("Drag files here or click to select files");
        setFileData(null);
        setImportModel(false);
      } catch (error) {
        toast.success("File imported successfully");
        setFileName("Error processing file");
        setImportModel(false);
        setFile(null);
        setFileData(null);
      }
    } else {
      setFileName("No file selected.");
    }
  };
  const handleExportData = (tasks) => {
    const ws = XLSX.utils.json_to_sheet(tasks, {
      header: [
        "actualNumberOfWords",
        "comments",
        "createdAt",
        "desiredNumberOfWords",
        "dueDate",
        "googleLink",
        "isActive",
        "keywords",
        "lector",
        "metaLector",
        "project",
        "published",
        "readyToWork",
        "seo",
        "status",
        "taskId",
        "taskName",
        "texter",
        "topic",
        "type",
        "updatedAt",
        "__v",
        "_id",
      ],
    });
    ws["!cols"] = [
      { wpx: 150 },
      { wpx: 150 },
      { wpx: 150 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 150 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 150 },
      { wpx: 100 },
      { wpx: 150 },
      { wpx: 100 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tasks");
    XLSX.writeFile(wb, "tasks.xlsx");
  };
  const handleGuiColor = () => {};
  return (
    <div className="mt-3">
      <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {/* <div className="flex justify-end items-end pb-2 pr-4">
          <button
            onClick={handleImport}
            className="w-10 h-10 text-center bg-slate-100 text-blue-500 hover:bg-blue-500 hover:text-white rounded-none mr-1.5 flex justify-center items-center border-none"
          >
            <FontAwesomeIcon icon={faDownload} className="text-sm px-2" />
          </button>
          {importModel && (
            <div className="w-auto fixed inset-0 flex items-center justify-center z-[9999] bg-neutral-200 dark:bg-slate dark:bg-opacity-15 bg-opacity-60 px-4">
              <div className="bg-white dark:bg-black p-6 rounded shadow-lg lg:w-3/12 xl:w-3/12 2xl:w-4/12 3xl:w-3/12 max-h-[90vh] overflow-y-auto scrollbar-hide">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-bold dark:text-white pr-12">
                    Import
                  </h2>
                  <FontAwesomeIcon
                    className="cursor-pointer text-lg text-red-500 pl-12"
                    onClick={handleCloseImport}
                    icon={faTimes}
                  />
                </div>
                <div className="relative w-full h-40 cursor-pointer border border-black dark:border-white border-dotted ">
           
                  <input
                    type="file"
                    className="absolute top-0 left-0 opacity-0 w-full h-30 cursor-pointer"
                    onClick={(e) => {
                      handleFileChange(e);
                    }}
                    accept=".xlsx, .xls"
                  />
                  <div className="flex justify-start items-center py-15">
                    <FontAwesomeIcon
                      icon={faCloudUploadAlt}
                      className="text-gray-600 w-12 h-12 px-4"
                    />
                    <p className="mt-2 text-gray-700 ">{fileName}</p>
                  </div>
                </div>
                <button
                  className="w-full mt-4 flex justify-center rounded bg-primary py-1.5 px-6 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                  onClick={handleImportData}
                >
                  Import
                </button>
              </div>
            </div>
          )}
          <button
            onClick={() => {
              handleExportData(projectTasks);
            }}
            className="w-10 h-10 text-center bg-slate-100 text-blue-500 hover:bg-blue-500 hover:text-white rounded-none ml-1.5 flex justify-center items-center border-none"
          >
            <FontAwesomeIcon icon={faUpload} className="text-sm px-2" />
          </button>
        </div> */}
        <div className="max-w-full overflow-x-auto px-4 py-2">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-3 text-left dark:bg-meta-4">
                <th className="min-w-[170px] py-4 px-4 font-semibold text-black dark:text-white">
                  Status
                </th>
                <th className="min-w-[130px] py-4 px-4 font-semibold text-black dark:text-white">
                  Google-Link
                </th>
                <th className="min-w-[170px] py-4 px-4 font-semibold text-black dark:text-white">
                  Deadline
                </th>
                <th className="min-w-[130px] py-4 px-4 font-semibold text-black dark:text-white">
                  Word count
                </th>
                <th className="min-w-[180px] py-4 px-4 font-semibold text-black dark:text-white">
                  Keywords
                </th>
                {/* <th className="min-w-[120px] py-4 px-4 font-semibold text-black dark:text-white">
                  Text type
                </th> */}
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                  Team
                </th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr className="text-left" key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-start items-start flex-col">
                      <p
                        className={`text-xs uppercase text-center py-1.5 px-3 rounded-full
                        ${
                          task.status.toUpperCase() === "FINAL"
                            ? "bg-success/20 text-success"
                            : task.status.toUpperCase() === "FREE TRIAL"
                            ? "bg-danger/20 text-danger"
                            : task.status.toUpperCase() === "READY TO START"
                            ? "bg-warning/20 text-warning"
                            : task.status.toUpperCase() ===
                              "READY FOR PROFEADING"
                            ? "bg-warning/20 text-warning"
                            : "bg-violet-500/20 text-violet-500"
                        }`}
                      >
                        {task.status}
                      </p>
                    </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <a
                      href={task?.fileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline-none flex items-center justify-start"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5.5 h-5.5"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5"
                            stroke="#3b82f6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </g>
                      </svg>
                      <span className="px-1">{task.taskName}</span>
                    </a>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-sm text-white bg-red-500/85 px-1 py-1 rounded-full text-center flex justify-center items-center ">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                          <path
                            d="M12 6V12"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                          <path
                            d="M16.24 16.24L12 12"
                            stroke="#FFFFFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                      <span className="px-1">{formatDate(task.dueDate)}</span>
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white ">
                      {task.actualNumberOfWords}/{task.desiredNumberOfWords}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white text-sm">
                      {task.keywords ?? ""}
                    </p>
                  </td>
                  {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {task.type ?? ""}
                    </p>
                  </td> */}
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-between items-center">
                      <WorkerComponent
                        label="T"
                        name={showAssignedRoles(task.texter) ?? ""}
                      />
                      <WorkerComponent
                        label="L"
                        name={showAssignedRoles(task.lector) ?? ""}
                      />
                      <WorkerComponent
                        label="S"
                        name={showAssignedRoles(task.seo) ?? ""}
                      />
                      <WorkerComponent
                        label="M"
                        name={showAssignedRoles(task.metaLector) ?? ""}
                      />
                    </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div
                      className={`${
                        task?.dueDate &&
                        task?.keywords &&
                        task.lector &&
                        task.seo &&
                        task.texter
                          ? "bg-blue-500"
                          : "bg-warning/90"
                      } w-24 h-9 flex justify-center items-center rounded cursor-pointer`}
                      onClick={() => handleTasks(task)}
                    >
                      {task?.dueDate &&
                      task?.keywords &&
                      task.lector &&
                      task.seo &&
                      task.texter ? (
                        <FontAwesomeIcon className="text-white" icon={faEye} />
                      ) : (
                        <FontAwesomeIcon
                          className="text-white"
                          icon={faEyeSlash}
                        />
                      )}

                      <p className="text-white text-base font-medium text-center py-1 px-2">
                        View
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showDetailsDialog && (
        <TaskDetailModel
          task={task}
          closeModel={hanldeCloseAllInfo}
          freelancer={freelancer}
          userId={userId}
          projectId={projectId}
          projectName={projectName}
          handleRefreshData={handleRefreshData}
        />
      )}
    </div>
  );
};

export default ProjectTaskTable;
