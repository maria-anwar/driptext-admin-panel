import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "antd";
import "antd/dist/reset.css";
import "./custompagination.css";
import { useNavigate } from "react-router-dom";
import { Freelancer, Task } from "../../Types/Type";
import getInitials from "../Helpers/UpperCaseName";
import formatDate from "../Helpers/DateFormat";
import { useTranslation } from "react-i18next";

interface PaginatedTableProps {
  tasks: Task[];
  freelancer: Freelancer[];
}

const TasksTable: React.FC<PaginatedTableProps> = ({ tasks, freelancer }) => {
  const { t, i18n } = useTranslation(); // Adding translation hook
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const currentLanguage = i18n.language;

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

  const handleTask = (taskId: string) => {
    localStorage.setItem("taskID", taskId);
    navigate("taskdetails");
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
  const paginatedProjects = tasks.slice(offset, offset + rowsPerPage);

  const statusMap: { [key: string]: string } = {
    "ready to work": "Bereit zu starten",
    "in progress": "In Bearbeitung",
    "ready for rivision (lector)": "Bereit für Revision (Lektor)",
    "in rivision (lector)": "In Revision (Lektor)",
    "ready for rivision (meta lector)": "Bereit für Revision (Meta-Lektor)",
    "in rivision (meta lector)": "In Revision (Meta-Lektor)",
    "ready for proofreading": "Wird lektoriert",
    "proofreading in progress": "Im Lektorat",
    "ready for seo optimization": "Bereit für SEO-Optimierung",
    "seo optimization in progress": "Wird SEO-optimiert",
    "ready for 2nd proofreading": "Im Meta-Lektorat",
    "2nd proofreading in progress": "Im Meta-Lektorat",
    "free trial": "Kostenlose Testversion",
    "final": "Texterstellung abgeschlossen"
  };
  
  const handleStatusGerman = (statusFilter: string): string => {
    return currentLanguage === "de" && statusMap[statusFilter]
      ? statusMap[statusFilter]  
      : statusFilter;           
  };
  

  return (
    <div className="mt-6">
      <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 ">
        <div className="max-w-full overflow-x-auto px-4 py-2">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-3 text-left dark:bg-meta-4">
                <th className="min-w-[200px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("tasksTable.status")}
                </th>
                <th className="min-w-[130px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("tasksTable.googleLink")}
                </th>
                <th className="min-w-[170px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("tasksTable.deadline")}
                </th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("tasksTable.wordCount")}
                </th>
                <th className="min-w-[180px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("tasksTable.keywords")}
                </th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("tasksTable.team")}
                </th>
                <th className="min-w-[100px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("tasksTable.action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.map((task) => (
                <tr className="text-left" key={task?._id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-start items-start flex-col">
                      <p
                        className={`text-xs uppercase text-center py-1.5 px-3 rounded-full
                          ${
                            task?.status.toUpperCase() === "FINAL"
                              ? "bg-green-500/20 text-green-500"
                              : task.status.toUpperCase() === "FREE TRIAL"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : task.status.toUpperCase() === "READY TO WORK"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : task.status.toUpperCase() === "IN PROGRESS"
                              ? "bg-blue-500/20 text-blue-500"
                              : task.status.toUpperCase() ===
                                "READY FOR PROOFREADING"
                              ? "bg-orange-500/20 text-orange-500"
                              : task.status.toUpperCase() ===
                                "PROOFREADING IN PROGRESS"
                              ? "bg-purple-500/20 text-purple-500"
                              : task.status.toUpperCase() ===
                                "READY FOR SEO OPTIMIZATION"
                              ? "bg-indigo-500/20 text-indigo-500"
                              : task.status.toUpperCase() ===
                                "SEO OPTIMIZATION IN PROGRESS"
                              ? "bg-pink-500/20 text-pink-500"
                              : task.status.toUpperCase() ===
                                "READY FOR 2ND PROOFREADING"
                              ? "bg-violet-500/20 text-violet-500"
                              : task.status.toUpperCase() ===
                                "2ND PROOFREADING IN PROGRESS"
                              ? "bg-lime-300/20 text-lime-700"
                              : "bg-red-500/20 text-red-500"
                          }`}
                      >
                        {handleStatusGerman(task?.status.toLowerCase())}
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
                      <span className="px-1">{task?.taskName}</span>
                    </a>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`text-sm text-white px-1 py-1 rounded-full text-center flex justify-center items-center 
                        ${
                          new Date(task?.dueDate).setHours(0, 0, 0, 0) >=
                            new Date().setHours(0, 0, 0, 0) ||
                          task?.status === "Final"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }
                      `}
                    >
                      <span className="px-1">
                        {task.status === "Final"
                          ? t("tasksTable.statusLabels.final")
                          : formatDate(task?.dueDate)}
                      </span>
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white ">
                      {Number(task?.actualNumberOfWords) === 1
                        ? 0
                        : task?.actualNumberOfWords}
                      /{task?.desiredNumberOfWords}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white text-sm">
                      {task?.keywords ?? ""}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-between items-center">
                      <WorkerComponent
                        label="T"
                        name={showAssignedRoles(task?.texter) ?? ""}
                      />
                      <WorkerComponent
                        label="L"
                        name={showAssignedRoles(task?.lector) ?? ""}
                      />
                      <WorkerComponent
                        label="S"
                        name={showAssignedRoles(task?.seo) ?? ""}
                      />
                      <WorkerComponent
                        label="M"
                        name={showAssignedRoles(task?.metaLector) ?? ""}
                      />
                    </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div
                      className={`${
                        task?.lector && task?.seo && task?.texter
                          ? "bg-blue-500 hover:bg-blue-500/90"
                          : "bg-yellow-400/80 hover:bg-yellow-400"
                      } w-26 h-9 flex justify-center items-center rounded cursor-pointer`}
                      onClick={() => handleTask(task?._id)}
                    >
                      <FontAwesomeIcon className="text-white" icon={faEye} />
                      <p className="text-white text-base font-medium text-center py-1 px-2">
                        {t("tasksTable.view")}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 mb-2 flex justify-between items-center">
            <select
              className="p-2 ring-1 ml-2 ring-slate-200 bg-transparent rounded outline-none shadow-2"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option className="dark:text-black" value={5}>
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
              <option className="dark:text-black" value={100}>
                100
              </option>
            </select>
            <Pagination
              current={page}
              pageSize={rowsPerPage}
              total={tasks.length}
              onChange={handlePageChange}
              className="ant-pagination"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksTable;
