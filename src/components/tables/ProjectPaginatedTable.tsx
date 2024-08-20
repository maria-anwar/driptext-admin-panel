import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import "./custompagination.css";
import {
  faCheck,
  faTimes,
  faFolder,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface Task {
  totalTasks: number;
  usedTasks: number;
  openTasks: number;
  finalTasks: number;
}

interface Worker {
  texter: string;
  lector: string;
  SEO: string;
  metalector: string;
}

interface Project {
  status: string;
  googleLink: string;
  stripeLink: {
    domain: string;
    subdomain: string;
  };
  onboarding: string;
  performancePeriod: string;

  task: Task;
  worker: Worker;
  created:string;
}

interface PaginatedTableProps {
  projects: Project[];
}

const ProjectPaginatedTable: React.FC<PaginatedTableProps> = ({ projects }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate()

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset to first page when rows per page changes
  };

  const handleProject = (project: Project) => {
    navigate('project-details', { state: { project: project } });

  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word: string) => word[0].toUpperCase())
      .join("");
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
        <p className="text-black w-6 h-6  dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs px-1 py-1 flex justify-center items-center">
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
                <th className="min-w-[80px]  py-4 px-4 font-semibold text-black dark:text-white ">
                  Status
                </th>
                <th className="min-w-[130px] py-4 px-4 font-semibold  text-black dark:text-white">
                  Google-Link
                </th>
                <th className="min-w-[100px] py-4 px-4 font-medsemiboldium text-black dark:text-white">
                  Onboarded
                </th>
                <th className="min-w-[130px] py-4 px-4 font-medsemiboldium text-black dark:text-white">
                  Stripe-Link
                </th>
                <th className="min-w-[120px] py-4 px-4 font-semibold text-black dark:text-white">
                  Date
                </th>
                <th className="min-w-[230px] py-4 px-4 font-semibold text-black dark:text-white">
                  Tasks
                </th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                  Worker
                </th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.map((project, index) => (
                <tr className="text-left" key={index}>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-start items-start flex-col">
                      <p className="text-black dark:text-white text-xs">
                        {project.status}
                      </p>
                      <p className="text-sm">OPEN</p>
                    </div>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <a
                      href={project.googleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline-none"
                    >
                      <FontAwesomeIcon
                        icon={faFolder}
                        className="text-blue-500"
                      />
                      {""} {project.status}
                    </a>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black  dark:text-white">
                      {project.onboarding.toUpperCase() === "YES" ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} />
                      )}
                    </p>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black  dark:text-white text-sm">
                      Domain: {""}
                      <a
                        href={project.stripeLink.domain}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline-none"
                      >
                        {project.stripeLink.domain}
                      </a>
                    </p>
                    <p className="text-black  dark:text-white text-sm">
                      <a
                        href={project.stripeLink.domain}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline-none"
                      >
                        {project.stripeLink.subdomain}
                      </a>
                    </p>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black  dark:text-white text-sm">
                      {project.performancePeriod}
                    </p>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black  dark:text-white text-xs">
                      {project.task.finalTasks}/{project.task.totalTasks}
                    </p>
                    <p className="text-black  dark:text-white text-xs">
                      open: {project.task.openTasks} | final:{" "}
                      {project.task.usedTasks} | total:{" "}
                      {project.task.finalTasks}
                    </p>
                    <div className="flex h-3 bg-gray-200 rounded pt-1">
                      <progress
                        className=" h-3 bg-gray-200 rounded-full "
                        value={project.task.finalTasks}
                        max={project.task.totalTasks}
                      ></progress>
                    </div>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-between items-center">
                      <WorkerComponent label="T" name={project.worker.texter} />
                      <WorkerComponent label="L" name={project.worker.lector} />
                      <WorkerComponent label="S" name={project.worker.SEO} />
                      <WorkerComponent
                        label="M"
                        name={project.worker.metalector}
                      />
                    </div>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div
                      className={` bg-blue-500 w-24 h-9 flex justify-center items-center rounded cursor-pointer`}
                      onClick={() => handleProject(project)}
                    >
                      <FontAwesomeIcon
                        className={`
                         text-white
                        `}
                        icon={faEye}
                      />
                      <p className="text-white text-base font-medium text-center py-1 px-2">
                        View
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
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
