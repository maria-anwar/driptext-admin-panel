import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "antd/dist/reset.css";
import TaskDetailModel from "./TaskDetailModel";
import getInitials from "../Helpers/UpperCaseName";;
import "react-toastify/dist/ReactToastify.css";
import { Freelancer, Task } from "../../Types/Type";
import axios from "axios";
import { useSelector } from "react-redux";
import MemberModal from "./MemberModel";
import formatDate from "../Helpers/DateFormat";

interface ProjectProps {
  tasks: Task[];
  userId: string;
  projectId: string;
  projectName: string;
  handleRefreshData: () => void;
  freelancer: Freelancer[];
}

const ProjectTaskTable: React.FC<ProjectProps> = ({
  tasks,
  freelancer,
  userId,
  projectId,
  projectName,
  handleRefreshData,
}) => {
  const user = useSelector<any>((state) => state.user);
  const userToken = user?.user?.token;
  const [showDetailsDialog, setShowDetailsDialog] = useState<boolean>(false);
  const [task, setTask] = useState<Task | null>(null);
  const [showMembersDialog, setShowMembersDialog] = useState<boolean>(false);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [memberModel, setMemberModel] = useState<boolean>(false);
  const allRoles = ["texter", "lector", "seo-optimizer"];

  const showAssignedRoles = (memberId: string | null) => {
    const foundFreelancer = freelancer.find((f) => f._id === memberId);
    if (foundFreelancer) {
      const fullName = `${foundFreelancer.firstName} ${foundFreelancer.lastName}`;
      return fullName;
    } else {
      return "";
    }
  };
  const handleRoleSelect = (role: string, memberId: number) => {
    const token = userToken;
    axios.defaults.headers.common["access-token"] = token;

    const payload = {
      taskId: task._id,
      freelancerId: memberId?.toString(),
      role: role.toString(),
    };
    console.log(payload);

    axios
      .post(
        `${import.meta.env.VITE_DB_URL}/admin/assignFreelancersByTask`,
        payload
      )
      .then((response) => {
        const projectDataArray = response;
        console.log(payload);
        console.log(projectDataArray);
        setDropdownVisible(null);
        handleRefreshData();
        handleCloseMemberModel();
      })
      .catch((err) => {
        console.error(
          "Error fetching project details:",
          err.response || err.message || err
        );
        setDropdownVisible(null);
      });
  };
  const getAvailableRoles = () => {
    return allRoles;
  };

  const handleCloseMemberModel = () => {
    setMemberModel(false);
  };

  const handleTasks = (task: Task) => {
    setTask(task);
    setShowDetailsDialog(true); // Open modal after setting the task
  };

  const handleMembers = (task: Task) => {
    setTask(task);
    setMemberModel(true);
  };

  const hanldeCloseAllInfo = () => {
    setShowDetailsDialog(false);
  };
  const toggleDropdown = (memberId: number) => {
    setDropdownVisible((prev) => (prev === memberId ? null : memberId));
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

  return (
    <div className="mt-3">
      <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                  Team
                </th>
                <th className="min-w-[100px] py-4 px-4 font-semibold text-black dark:text-white">
                  Action
                </th>
                {/* <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                  Members
                </th> */}
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
                            task?.status.toUpperCase() === "FINAL"
                              ? "bg-green-500/20 text-green-500"
                              : task.status.toUpperCase() === "FREE TRIAL"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : task.status.toUpperCase() === "READY TO WORK"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : task.status.toUpperCase() === "IN PROGRESS"
                              ? "bg-blue-500/20 text-blue-500"
                              : task.status.toUpperCase() === "IN RIVISION"
                              ? "bg-red-500/20 text-red-500"
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
                              ? "bg-sky-400/20 text-sky-500" // New color for "READY FOR 2ND PROOFREADING"
                              : task.status.toUpperCase() ===
                                "2ND PROOFREADING IN PROGRESS"
                              ? "bg-lime-300/20 text-lime-700" // Different color for "2ND PROOFREADING IN PROGRESS"
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
                      <span className="px-1">{task.taskName}</span>
                    </a>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`text-sm text-white px-1 py-1 rounded-full text-center flex justify-center items-center 
                        ${new Date(task?.dueDate).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0) || task?.status==='Final' ? 'bg-green-600' : 'bg-red-600'}
                      `}
                    >
                      <span className="px-1">
                      {task.status==='Final' ? "Finished" :formatDate(task?.dueDate)}
                      </span>
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
                        task.lector &&
                        task.seo &&
                        task.texter
                          ? "bg-blue-500"
                          : "bg-yellow-400/80"
                      } w-24 h-9 flex justify-center items-center rounded cursor-pointer`}
                      onClick={() => handleTasks(task)}
                    >
                      <FontAwesomeIcon className="text-white" icon={faEye} />
                      <p className="text-white text-base font-medium text-center py-1 px-2">
                        View
                      </p>
                    </div>
                  </td>
                  {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div
                      className={`${
                        task.lector && task.seo && task.texter
                          ? "bg-blue-500"
                          : "bg-yellow-400/80"
                      }  h-9 flex justify-center items-center rounded cursor-pointer`}
                      onClick={() => handleMembers(task)}
                    >
                      <p className="text-white text-base font-medium text-center py-1 px-1">
                        Add Member
                      </p>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          {showDetailsDialog && task && (
            <TaskDetailModel
              task={task}
              closeModel={hanldeCloseAllInfo}
              freelancer={freelancer}
              userId={userId}
              projectId={projectId}
              projectName={projectName}
              handleRefreshData={() => {
                handleRefreshData();
                hanldeCloseAllInfo();
              }}
            />
          )}
        </div>
        {memberModel && (
          <MemberModal
            isOpen={memberModel}
            freelancer={freelancer}
            handleCloseMemberModel={handleCloseMemberModel}
            toggleDropdown={toggleDropdown}
            dropdownVisible={dropdownVisible}
            getAvailableRoles={getAvailableRoles}
            handleRoleSelect={handleRoleSelect}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectTaskTable;
