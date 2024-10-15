import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import getInitials from "../../../components/Helpers/UpperCaseName";

const TaskDetails: React.FC = () => {
  const user = useSelector<any>((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [taskdetails, setTaskDetails] = useState(null);
  const [project, setproject] = useState(null);
  const taskId = localStorage.getItem("taskID");

  useEffect(() => {
    getTaskData();
  }, [taskId]);

  const getTaskData = async () => {
    setLoading(true);
    let token = user?.user?.token;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      taskId: taskId,
    };
    await axios
      .post(`${import.meta.env.VITE_DB_URL}/admin/getTaskDetail`, payload)
      .then((response) => {
        const task = response?.data?.data;
        setTaskDetails(task);
        setproject(task.project);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project details:", err);
      });
  };

  const FreelancerInfo = ({ label, name }) => {
    return (
      <div>
        <p className="text-sm">{label}</p>
        <div className="flex justify-between items-center py-1.5">
          <div className="flex justify-start items-center">
            <p className="text-black h-6 w-6  dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs px-1 py-1 flex justify-center items-center">
              {getInitials(name)}
            </p>
            <p className="px-2.5 text-black dark:text-white">{name}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto 3xl:px-4">
      <div className="flex items-center justify-between space-x-4 mb-6 mt-2">
        <ol className="flex items-center gap-2 text-left">
          <li>
            <Link
              className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
              to="/dashboard"
            >
              Dashboard /{" "}
              <Link
                className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
                to="/dashboard/tasks"
              >
                Tasks /
              </Link>
            </Link>
          </li>
          <li className="font-medium text-primary">Task Detail</li>
        </ol>
      </div>
      <h2 className="text-title-md2 font-semibold text-black dark:text-white pb-2 lg:pb-0">
        Task Detail
      </h2>
      {loading ? (
        <div className="grid grid-cols-5 gap-8 mt-6">
          <div className="col-span-5 xl:col-span-3 rounded-sm border border-stroke  pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1   w-full bg-slate-200 h-[350px] animate-pulse"></div>
          <div className=" col-span-5 xl:col-span-2 rounded-sm border border-stroke  pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1   w-full bg-slate-200 h-[350px] animate-pulse"></div>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-8 mt-6">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="py-6 px-7 dark:border-strokedark">
                <p className="text-xl font-semibold text-black dark:text-white pb-2">
                  {project?.projectName}
                  {" | "}
                  {project?.projectId}
                </p>
                <div className="py-2">
                  <h3 className="font-medium text-black dark:text-white">
                    Client
                  </h3>
                  <p className="text-sm text-black dark:text-white">
                    {taskdetails?.user?.firstName} {taskdetails?.user?.lastName}{" "}
                    {"("}
                    {taskdetails?.user?.email}
                    {")"}
                  </p>
                </div>

                <div className="pt-1 pb-3">
                  <h2>Folder</h2>
                  <a
                    href={project?.folderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline-none flex justify-start items-center py-1"
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

                    <span className="px-1">{project?.projectId}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="pt-8 pb-4 px-7 dark:border-strokedark flex justify-between items-center">
                <h3 className="font-medium text-black dark:text-white">
                  Task Freelancer
                </h3>
              </div>
              <div className="px-7">
                {taskdetails?.texter && (
                  <FreelancerInfo
                    label={"Texter"}
                    name={`${taskdetails.texter.firstName ?? ""} ${
                      taskdetails.texter.lastName ?? ""
                    }`}
                  />
                )}
                {taskdetails?.lector && (
                  <FreelancerInfo
                    label={"Lector"}
                    name={`${taskdetails.lector.firstName ?? ""} ${
                      taskdetails.lector.lastName ?? ""
                    }`}
                  />
                )}
                {taskdetails?.seo && (
                  <FreelancerInfo
                    label={"Seo"}
                    name={`${taskdetails.seo.firstName ?? ""} ${
                      taskdetails.seo.lastName ?? ""
                    }`}
                  />
                )}
                {taskdetails?.metaLector && (
                  <FreelancerInfo
                    label={"Meta-Lector"}
                    name={`${taskdetails.metaLector.firstName ?? ""} ${
                      taskdetails.metaLector.lastName ?? ""
                    }`}
                  />
                )}
              </div>

              <div className="px-7 py-2.5"></div>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <div className="grid grid-cols-5 gap-8 mt-6">
          <div className="col-span-5 rounded-sm border border-stroke  pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1   w-full bg-slate-200 h-[350px] animate-pulse"></div>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-8 mt-6">
          <div className="col-span-5 ">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="py-6 px-7 dark:border-strokedark">
                sdfsdfsdfsd
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
