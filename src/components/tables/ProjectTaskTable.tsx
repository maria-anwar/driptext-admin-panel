import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import "antd/dist/reset.css";

interface Task {
  status: string;
  deadline: string;
  wordCount: number;
  topic: string;
  textType: string;
  googleLink: string;
  worker: Worker;
}

interface StripeLink {
  domain: string;
  subdomain: string;
}

interface Worker {
  texter: string;
  lector: string;
  SEO: string;
  metalector: string;
}

interface Customer {
  name: string;
  email: string;
}

interface Project {
  projectName: string;
  status: string;
  googleLink: string;
  stripeLink: StripeLink;
  onboarding: string;
  performancePeriod: string;
  task: {
    totalTasks: number;
    usedTasks: number;
    openTasks: number;
    finalTasks: number;
  };
  worker: Worker;
  created: string;
  customer: Customer;
}

interface ProjectProps {
  tasks: Task[];
  project: Project;
}

const ProjectTaskTable: React.FC<ProjectProps> = ({ tasks, project }) => {
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [task, setTask] = useState("");

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word[0].toUpperCase())
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
        <p className="text-black w-6 h-6 dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs px-1 py-1 flex justify-center items-center">
          {getInitials(name)}
        </p>
      </div>
    );
  };

  const handleTasks = (task: any) => {
    setTask(task);
    setShowDetailsDialog(true);
  };

  const hanldeCloseAllInfo = () => {
    setShowDetailsDialog(false);
  };

  const TaskMember: React.FC<{ label: string; name: string }> = ({
    label,
    name,
  }) => {
    return (
      <div className="flex justify-between items-center py-2">
        <div className="flex justify-center items-center">
          <p className="text-black w-6 h-6 dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs px-1 py-1 flex justify-center items-center">
            {getInitials(name)}
          </p>
          <p className="pl-4">{name}</p>
        </div>
        <div>{label}</div>
      </div>
    );
  };

  return (
    <div className="mt-16">
      <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto px-4 py-2">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-3 text-left dark:bg-meta-4">
                <th className="min-w-[80px] py-4 px-4 font-semibold text-black dark:text-white">
                  Status
                </th>
                <th className="min-w-[130px] py-4 px-4 font-semibold text-black dark:text-white">
                  Google-Link
                </th>
                <th className="min-w-[100px] py-4 px-4 font-semibold text-black dark:text-white">
                  Deadline
                </th>
                <th className="min-w-[130px] py-4 px-4 font-semibold text-black dark:text-white">
                  Word count
                </th>
                <th className="min-w-[180px] py-4 px-4 font-semibold text-black dark:text-white">
                  Topic
                </th>
                <th className="min-w-[120px] py-4 px-4 font-semibold text-black dark:text-white">
                  Text type
                </th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                  Employess
                </th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr className="text-left" key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-start items-start flex-col">
                      <p className="text-black dark:text-white">
                        {task.status.toUpperCase()}
                      </p>
                    </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <a
                      href={task.googleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline-none"
                    >
                      <FontAwesomeIcon
                        icon={faFolder}
                        className="text-blue-500"
                      />
                      {""} {"MP-g649"}
                    </a>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white bg-red-500 px-2 rounded-full text-center">
                      {task.deadline}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white ">
                      {task.wordCount}/1500
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white text-sm">
                      {task.topic}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {task.textType}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-between items-center">
                      <WorkerComponent label="T" name={task.worker.texter} />
                      <WorkerComponent label="L" name={task.worker.lector} />
                      <WorkerComponent label="S" name={task.worker.SEO} />
                      <WorkerComponent
                        label="M"
                        name={task.worker.metalector}
                      />
                    </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div
                      className={`bg-blue-500 w-24 h-9 flex justify-center items-center rounded cursor-pointer`}
                      onClick={() => handleTasks(task)}
                    >
                      <FontAwesomeIcon className="text-white" icon={faEye} />
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
        <div className="w-auto fixed inset-0 flex items-center justify-center z-[9999] bg-neutral-200 dark:bg-slate dark:bg-opacity-15 bg-opacity-60 px-4">
          <div className="bg-white dark:bg-black p-6 rounded shadow-lg lg:w-6/12 xl:w-6/12 2xl:w-6/12 3xl:w-6/12 max-h-[90vh] overflow-y-auto scrollbar-hide">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold dark:text-white">
                Task Details
              </h2>
              <FontAwesomeIcon
                className="cursor-pointer text-lg dark:text-white text-black"
                onClick={hanldeCloseAllInfo}
                icon={faTimes}
              />
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center w-full ">
                <div className="w-1/2">
                  <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Status
                  </p>
                  <p className="w-ful py-0  text-black dark:text-white">
                    {task.status.toUpperCase()}
                  </p>
                </div>
                <div className="w-1/2 flex justify-between items-center ">
                  <div className="w-1/2 mr-1">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="wordReal"
                    >
                      Word Real
                    </label>
                    <p className="w-ful py-2  text-black dark:text-white">
                      {task.wordCount}
                    </p>
                  </div>
                  <div className="w-1/2 ml-1">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="wordExpected"
                    >
                      Word Expected
                    </label>
                    <input
                      className="w-full rounded border border-transparent bg-gray py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="number"
                      name="wordExpected"
                      id="wordExpected"
                      placeholder="1500"
                      min={0}
                      value={1500}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full ">
                <div className="w-1/2 mr-1">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="dueUntil"
                  >
                    Due until
                  </label>
                  <p className="w-ful py-0  text-black dark:text-white">
                    {task.deadline}
                  </p>
                </div>
                <div className="w-1/2 ml-1">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Document
                  </label>
                  <p className="w-ful py-0  text-black dark:text-white">
                    <a
                      href={task.googleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline-none"
                    >
                      <FontAwesomeIcon
                        icon={faFolder}
                        className="text-blue-500"
                      />
                      {""} {"MP-g649"}
                    </a>
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="w-1/2 mr-1">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="Topic"
                  >
                    Topic
                  </label>
                  <input
                    className="w-full rounded border border-transparent bg-gray py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="Topic"
                    id="Topic"
                    placeholder="Topic"
                    value={task.textType}
                  />
                </div>
                <div className="w-1/2 ml-1">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="dropdown"
                  >
                    Text type
                  </label>
                  <select
                    id="dropdown"
                    className="w-full rounded border border-transparent bg-gray py-2.5 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  >
                    <option>Guide</option>
                    <option>Shop (Category)</option>
                    <option>Shop (Product)</option>
                    <option>Definition/Wiki</option>
                    <option>Shop (Home page)</option>
                    <option>CMS page</option>
                  </select>
                </div>
              </div>
              <div className="w-full">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="Keywords"
                >
                  Keywords
                </label>
                <input
                  className="w-full rounded border border-transparent bg-gray py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name="Keywords"
                  id="Keywords"
                  placeholder="Keywords"
                  defaultValue={""}
                />
              </div>
              <div className="w-full">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="comment"
                >
                  Comment
                </label>
                <textarea
                  id="comment"
                  className="w-full rounded border border-transparent bg-gray py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>
              <div className="w-full pt-6">
                <h2>Members</h2>
                <TaskMember name={task.worker.texter} label="Texter" />
                <TaskMember name={task.worker.lector} label="Lector" />
                <TaskMember name={task.worker.SEO} label="Seo" />
                <TaskMember name={task.worker.metalector} label="Meta-Lector" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTaskTable;