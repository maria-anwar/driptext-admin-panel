import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faEye } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "antd";
import "antd/dist/reset.css";
import "./custompagination.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Freelancer, Project } from "../../Types/Type";
import getInitials from "../Helpers/UpperCaseName";
import { format } from "date-fns"; // 2. import format from date-fns
import { useTranslation } from "react-i18next";
const formatDate = (dateString: Date | string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return format(date, "dd.MM.yyyy"); // "August 2025"
};

interface PaginatedTableProps {
  projects: Project[];
  handleRefreshData?: () => void;
  freelancer: Freelancer[];
}

const ProjectPaginatedTable: React.FC<PaginatedTableProps> = ({
  projects,
  freelancer,
  handleRefreshData,
}) => {
  const { t } = useTranslation();
  const user = useSelector<any>((state) => state.user);
  const [userToken, setUserToken] = useState(user?.user?.token);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const handleRevert = (projectId: string) => {
    let token = userToken;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      projectId: projectId,
      isArchived: false,
    };

    axios
      .post(`${import.meta.env.VITE_DB_URL}/admin/archiveProject`, payload)
      .then((response) => {
        if (response.status === 200) {
          handleRefreshData();
        }
      })
      .catch((err) => {
        console.error("Error archiving the project:", err);
      });
  };

  const showAssignedRoles = (memberId: string | null) => {
    const foundFreelancer = freelancer.find(
      (freelance) => freelance._id === memberId
    );
    if (foundFreelancer) {
      const fullName = `${foundFreelancer.firstName} ${foundFreelancer.lastName}`;
      return fullName;
    } else {
      return "";
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleProject = (projectId: string) => {
    localStorage.setItem("projectID", projectId);
    navigate("project-details");
  };

  const formatDate = (dateString: Date | string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "MMMM yyyy"); // "August 2025"
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
        <p className="text-black uppercase w-7 h-7 text-center dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs  flex justify-center items-center">
        {getInitials(name)}
        </p>
      </div>
    );
  };

  const offset = (page - 1) * rowsPerPage;
  const paginatedProjects = projects.slice(offset, offset + rowsPerPage);

  return (
    <div className="mt-6">
      <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 ">
        <div className="max-w-full overflow-x-auto px-4 py-2">
          <table className="w-full table-auto  ">
            <thead>
              <tr className="bg-gray-3 text-left dark:bg-meta-4 ">
                <th className="min-w-[190px]  py-4 px-4 font-semibold text-black dark:text-white ">
                  {t("projects.status")}
                </th>
                <th className="min-w-[130px] py-4 px-4 font-semibold  text-black dark:text-white">
                  {t("projects.googleLink")}
                </th>

                <th className="min-w-[120px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("projects.domain")}
                </th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("projects.performancePeriod")}
                </th>
                <th className="min-w-[230px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("projects.tasks")}
                </th>
                <th className="min-w-[160px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("projects.team")}
                </th>
                <th className="min-w-[100px] py-4 px-4 font-medsemiboldium text-black dark:text-white">
                  {t("projects.onboarded")}
                </th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("projects.action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.length === 0 ? (
                <tr></tr>
              ) : (
                paginatedProjects.map((project) => (
                  <tr className="text-left" key={project?._id}>
                    <td
                      className={`border-b border-[#eee] py-5 px-4 dark:border-strokedark`}
                    >
                      <p
                        className={`text-sm uppercase text-center px-3 rounded-full py-1 ${
                          project?.projectStatus.toUpperCase() === "FINAL"
                            ? "bg-green-500/20 text-green-500"
                            : project?.projectStatus.toUpperCase() ===
                              "FREE TRIAL"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : project?.projectStatus.toUpperCase() === "READY"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : project?.projectStatus.toUpperCase() ===
                              "IN PROGRESS"
                            ? "bg-blue-500/20 text-blue-500"
                            : project?.projectStatus.toUpperCase() ===
                              "READY FOR PROOFREADING"
                            ? "bg-orange-500/20 text-orange-500"
                            : project?.projectStatus.toUpperCase() ===
                              "PROOFREADING IN PROGRESS"
                            ? "bg-purple-500/20 text-purple-500"
                            : project?.projectStatus.toUpperCase() ===
                              "READY FOR SEO OPTIMIZATION"
                            ? "bg-indigo-500/20 text-indigo-500"
                            : project?.projectStatus.toUpperCase() ===
                              "SEO OPTIMIZATION IN PROGRESS"
                            ? "bg-pink-500/20 text-pink-500"
                            : "bg-violet-500/20 text-violet-500"
                        }`}
                      >
                        {project?.projectStatus.toUpperCase() === "FREE TRIAL"
                          ? "Ready"
                          : project?.projectStatus.toUpperCase() ===
                            "NOT INITALIZED"
                          ? "Waiting for onboarding"
                          : project?.projectStatus.toUpperCase()}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <a
                        href={project?.folderLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline-none flex justify-start items-center"
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

                        <span className="px-1">{project?.projectId}</span>
                      </a>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white text-sm">
                        {project?.projectName}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`rounded-full text-center py-1 px-1 text-white text-sm ${
                          project?.plan?.endDate === null
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      >
                        {project?.plan?.endDate === null
                          ? "No Subscription"
                          : `${formatDate(project?.plan?.endDate)}`}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white text-xs">
                        {project?.plan?.textsCount}/{project?.plan?.totalTexts}
                      </p>
                      <p className="text-black dark:text-white text-xs">
                        open: {project?.openTasks} | final:{" "}
                        {project?.finalTasks} | total:{" "}
                        {project?.plan?.textsCount}
                      </p>
                      <div className="flex h-3 bg-gray-200 rounded pt-1">
                        <progress
                          className="custom-progress"
                          value={project?.finalTasks}
                          max={project?.plan?.totalTexts}
                        ></progress>
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex justify-between items-center">
                        <WorkerComponent
                          label="T"
                          name={showAssignedRoles(project?.texter) ?? ""}
                        />
                        <WorkerComponent
                          label="L"
                          name={showAssignedRoles(project?.lector) ?? ""}
                        />
                        <WorkerComponent
                          label="S"
                          name={showAssignedRoles(project?.seo) ?? ""}
                        />
                        <WorkerComponent
                          label="M"
                          name={showAssignedRoles(project?.metaLector) ?? ""}
                        />
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white flex justify-center items-center">
                        {project?.onBoarding === true ? (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-green-500"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="text-red-600"
                          />
                        )}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {project?.isActive === "Y" ? (
                        <div
                          className={` ${
                            project?.lector && project?.seo && project?.texter
                               ? "bg-blue-500 hover:bg-blue-500/90"
                              : "bg-yellow-400/80 hover:bg-yellow-400"
                          } w-28 h-9 flex justify-center items-center rounded cursor-pointer`}
                          onClick={() => handleProject(project._id)}
                        >
                          {project?.lector &&
                          project?.seo &&
                          project?.texter ? (
                            <FontAwesomeIcon
                              className="text-white pl-2"
                              icon={faEye}
                            />
                          ) : (
                            <img
                              width={18}
                              height={6}
                              src={"/eye_exclamation.svg"}
                              alt={"Eye"}
                            />
                          )}
                          <p className="text-white text-base font-medium text-center py-1 px-2">
                            {t("projects.view")}
                          </p>
                        </div>
                      ) : (
                        <div
                          className={` ${
                            project?.lector && project?.seo && project?.texter
                              ? "bg-blue-500 hover:bg-blue-500/90"
                              : "bg-yellow-400/80 hover:bg-yellow-400"
                          } w-24 h-9 flex justify-center items-center rounded cursor-pointer`}
                          onClick={() => handleRevert(project?._id)}
                        >
                          <svg
                            viewBox="0 0 21 21"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#FFFFFF"
                            width="20"
                            height="20"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <g
                                fill="none"
                                fill-rule="evenodd"
                                stroke="#FFFFFF"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                transform="matrix(0 1 1 0 2.5 2.5)"
                              >
                                <path d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8"></path>
                                <path
                                  d="m4 1v4h-4"
                                  transform="matrix(1 0 0 -1 0 6)"
                                ></path>
                              </g>
                            </g>
                          </svg>
                          <p className="text-white text-base font-medium text-center py-1 px-2">
                            Revert
                          </p>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="mt-4 mb-2 flex justify-between items-center">
            <select
              className="p-2 ring-1 ml-2  ring-slate-200 bg-transparent rounded outline-none shadow-2 "
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option className="dark:text-black " value={5}>
                5
              </option>
              <option className="dark:text-black" value={10}>
                10
              </option>
              <option className="dark:text-black" value={25}>
                25
              </option>
              <option className="dark:text-black" value={50}>
                50
              </option>
            </select>
            <Pagination
              current={page}
              pageSize={rowsPerPage}
              total={projects.length}
              onChange={handlePageChange}
              className="ant-pagination"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPaginatedTable;
