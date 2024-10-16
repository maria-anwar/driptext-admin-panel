import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import ProjectTaskTable from "../../../components/ProjectDetails/ProjectTaskTable";
import Breadcrumb from "../../../components/breeadcrumbs/Breadcrumb";
import axios from "axios";
import { useSelector } from "react-redux";
import TaskComponent from "../../../components/ProjectDetails/TaskComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemberModal from "../../../components/ProjectDetails/MemberModel";
import TaskMembers from "../../../components/ProjectDetails/TaskMembers";
import { useNavigate } from "react-router-dom";
import Import from "../../../components/ProjectDetails/Import";
import Export from "../../../components/ProjectDetails/Export";
import ProjectDetailsButton from "../../../components/ProjectDetails/ProjectDetailsButton";
import AccordionData from "../../../components/ProjectDetails/AccordionData";
import {
  Freelancer,
  Project,
  OnBoarding,
  Plan,
  User,
} from "../../../Types/Type";

const ProjectsDetails: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector<any>((state) => state.user);
  const projectId = localStorage.getItem("projectID");
  const [loading, setLoading] = useState<boolean>(true);
  const [memberModel, setMemberModel] = useState<boolean>(false);
  const [deleteModel, setDeleteModel] = useState<boolean>(false);
  const [projectDetails, setProjectDetails] = useState([]);
  const [projectTasks, setProjectTasks] = useState([]);
  const [onBoarding, setOnBoarding] = useState<OnBoarding>();
  const [freelancer, setFreelancer] = useState<Freelancer[]>([]);
  const [plan, setPlan] = useState<Plan>();
  const [userData, setUserData] = useState({});
  const [userId, setUserID] = useState(user.user.data.user._id);
  const [userToken, setUserToken] = useState(user.user.token);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [editManager, setEditManager] = useState<boolean>(false);

  useEffect(() => {
    getTaskData();
    getFreelancerData();
    getWordCount();
  }, [projectId, userId]);

  const getTaskData = () => {
    let token = userToken;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      projectId: projectId,
    };
    axios
      .post(`${import.meta.env.VITE_DB_URL}/admin/getProjectDetail`, payload)
      .then((response) => {
        const projectDataArray = response.data.project;
        const allProjects = projectDataArray;
        setProjectDetails(allProjects);
        console.log("Project Details:", allProjects);
        setPlan(allProjects.plan);
        setUserData(allProjects.user);
        setProjectTasks(allProjects.projectTasks);
        setOnBoarding(allProjects.onBoardingInfo);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project details:", err);
        setLoading(false);
      });
  };
  const getWordCount = () => {
    let token = userToken;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      projectId: projectId,
    };
    axios
      .post(`${import.meta.env.VITE_DB_URL}/admin/wordCountProject`, payload)
      .then((response) => console.log("Word count updated for all tasks"))
      .catch((err) => {
        console.error("Error updating word count of project:", err);
      });
  };
  const getFreelancerData = () => {
    let token = userToken;
    axios.defaults.headers.common["access-token"] = token;

    axios
      .get(`${import.meta.env.VITE_DB_URL}/admin/getFreelancers`)
      .then((response) => {
        const projectDataArray = response.data.freelancers;
        const allProjects = projectDataArray;
        setFreelancer(allProjects);
      })
      .catch((err) => {
        console.error("Error fetching project details:", err);
      });
  };
  
  const handleRoleSelect = (role: string, memberId: number) => {
    const token = userToken;
    axios.defaults.headers.common["access-token"] = token;

    const payload = {
      projectId: projectId,
      freelancerId: memberId.toString(),
      role: role.toString(),
    };

    axios
      .post(
        `${import.meta.env.VITE_DB_URL}/admin/assignFreelancersByProject`,
        payload
      )
      .then((response) => {
        getTaskData();
        setDropdownVisible(null);
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
  const handleDeleteApi = () => {
    let token = userToken;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      projectId: projectId,
      isArchived: true,
    };

    axios
      .post(`${import.meta.env.VITE_DB_URL}/admin/archiveProject`, payload)
      .then((response) => {
        if (response.status === 200) {
          console.log("Project archived successfully:", response);
          setDeleteModel(false);
          navigate("/dashboard", { replace: true });
        }
      })
      .catch((err) => {
        console.error("Error archiving the project:", err);
        setLoading(false);
      });
  };

  const showAssignedRoles = (memberId: string) => {
    if (!freelancer) return "";
    const foundFreelancer = freelancer.find((f) => f._id === memberId);
    if (foundFreelancer) {
      const fullName = `${foundFreelancer?.firstName} ${foundFreelancer?.lastName}`;
      return fullName;
    } else {
      return "";
    }
  };

  const allRoles = ["texter", "lector", "seo-optimizer", "meta-lector"];

  const handleMembers = () => {
    setMemberModel(true);
    setDropdownVisible(null);
  };

  const handleCloseMemberModel = () => {
    setMemberModel(false);
  };

  const getAvailableRoles = () => {
    return allRoles;
  };

  const toggleDropdown = (memberId: number) => {
    setDropdownVisible((prev) => (prev === memberId ? null : memberId));
  };

  function formatDateString(dateString: string): string | null {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return null;
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };

    return date.toLocaleDateString("en-US", options);
  }
  const handleManager = () => {
    setEditManager(!editManager);
  };

  return (
    <>
      <div>
        <div className="mx-auto">
          <Breadcrumb pageName={"Project Details"} />
          <ToastContainer />

          {loading ? (
            <div className="grid grid-cols-5 gap-8">
              <div className="col-span-5 xl:col-span-3 rounded-sm border border-stroke  pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1   w-full bg-slate-200 h-[350px] animate-pulse"></div>
              <div className=" col-span-5 xl:col-span-2 rounded-sm border border-stroke  pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1   w-full bg-slate-200 h-[350px] animate-pulse"></div>
            </div>
          ) : (
            <>
              {!projectDetails?.onBoarding ? (
                <p className=" text-red-500 pb-6">
                  Onboarding is not completed for this project, you can't add
                  task
                </p>
              ) : (
                <p></p>
              )}
              <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-3">
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="py-6 px-7 dark:border-strokedark">
                      <ProjectDetailsButton
                        projectId={projectDetails?.projectId}
                        projectName={projectDetails?.projectName}
                        _id={projectDetails?._id}
                        userId={userData?._id}
                        onBoarding={onBoarding}
                        getTaskData={getTaskData}
                        speech={projectDetails?.speech}
                        perspective={projectDetails?.prespective}
                        handleDelete={handleDeleteApi}
                        firstName={userData?.firstName}
                        lastName={userData?.lastName}
                        email={userData?.email}
                      />
                      <AccordionData
                        speech={projectDetails?.speech}
                        perspective={projectDetails?.prespective}
                        projectName={projectDetails?.projectName}
                        onBoarding={onBoarding}
                      />

                      <div className="pt-1 pb-3">
                        <h2>Folder</h2>
                        <a
                          href={projectDetails?.folderLink}
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
                              strokeLinecap="round" // Updated to camelCase
                              strokeLinejoin="round" // Updated to camelCase
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5"
                                stroke="#3b82f6"
                                strokeWidth="1.5"
                                strokeLinecap="round" // Updated to camelCase
                                strokeLinejoin="round" // Updated to camelCase
                              ></path>
                            </g>
                          </svg>

                          <span className="px-1">
                            {projectDetails.projectId}
                          </span>
                        </a>
                      </div>
                      <progress
                        className="custom-progress"
                        value={projectDetails.finalTasks}
                        max={plan.totalTexts}
                      ></progress>
                      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-5 py-2">
                        <TaskComponent
                          label="Status"
                          name={
                            projectDetails?.projectStatus.toUpperCase() ===
                            "FREE TRIAL"
                              ? "Ready"
                              : projectDetails?.projectStatus
                          }
                        />
                        <TaskComponent
                          label="Tasks"
                          name={`${plan?.textsCount}/${plan?.totalTexts}`}
                        />
                        <TaskComponent
                          label="Max Tasks"
                          name={plan?.totalTexts}
                        />
                        <TaskComponent label="Duration" name={plan?.duration} />
                        <TaskComponent
                          label="Task per month"
                          name={plan?.tasksPerMonth}
                        />
                        <div>
                          <p className="text-xs text-slate-700 dark:text-slate-300 ">
                            Performance Period
                          </p>
                          <p className="text-black dark:text-white">
                            {typeof plan?.endDate === "string"
                              ? formatDateString(plan?.endDate)
                              : null}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-5 xl:col-span-2">
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="pt-8 pb-4 px-7 dark:border-strokedark flex justify-between items-center">
                      <h3 className="font-medium text-black dark:text-white">
                        Project members
                      </h3>
                      <p
                        className="w-5 h-5 bg-blue-500 text-white flex items-center justify-center cursor-pointer"
                        onClick={handleMembers}
                      >
                        <FontAwesomeIcon icon={faPlus} className="text-sm" />
                      </p>
                    </div>
                    <div className="px-7">
                      {/* <div>
                        <p className="text-sm">Project Manager</p>
                        <div className="flex justify-between items-center py-2">
                          <div className="flex justify-start flex-row items-center">
                            <p className="text-black w-6 h-6 dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs px-1 py-1 flex justify-center items-center">
                              {getInitials(
                                `${user?.user?.data?.user?.firstName} ${user?.user?.data?.user?.lastName}`
                              )}
                            </p>
                            <p className="px-2.5 text-black dark:text-white">
                              {user?.user?.data?.user?.firstName}{" "}
                              {user?.user?.data?.user?.lastName}
                            </p>
                          </div>
                          <div onClick={handleManager}>
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="text-sm px-1 text-blue-500"
                            />
                          </div>
                          {editManager && <EditManager editUser={''} handleClose={handleManager}  />}
                        </div>
                      </div> */}
                      <TaskMembers
                        label={"Texter"}
                        handleMembers={handleMembers}
                        name={showAssignedRoles(projectDetails.texter) ?? ""}
                      />
                      <TaskMembers
                        label={"Lector"}
                        handleMembers={handleMembers}
                        name={showAssignedRoles(projectDetails.lector) ?? ""}
                      />
                      <TaskMembers
                        label={"SEO"}
                        handleMembers={handleMembers}
                        name={showAssignedRoles(projectDetails?.seo) ?? ""}
                      />
                      <TaskMembers
                        label={"Meta-lector"}
                        handleMembers={handleMembers}
                        name={showAssignedRoles(projectDetails?.metaLector) ?? ""}
                      />
                    </div>
                    <div className="px-7 py-2.5"></div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="pt-14">
            <div className="flex justify-end items-end">
              <Import id={projectDetails._id} handleRefreshData={getTaskData} />
              <Export
                id={projectDetails._id}
                taskLength={projectTasks.length}
              />
            </div>

            {loading ? (
              <div className="mt-4 rounded-sm border border-stroke  pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1   w-full bg-slate-200 h-[350px] animate-pulse"></div>
            ) : (
              <ProjectTaskTable
                tasks={projectTasks}
                freelancer={freelancer}
                userId={userData?._id}
                projectId={projectDetails?._id}
                projectName={projectDetails?.projectName}
                handleRefreshData={getTaskData}
              />
            )}
          </div>
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
    </>
  );
};

export default ProjectsDetails;
