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
import format from "date-fns/format";
import useTitle from "../../../hooks/useTitle";
import { useTranslation } from "react-i18next";
import AddModel from "../../../components/ProjectDetails/AddTask";

const ProjectsDetails: React.FC = () => {
  const { t } = useTranslation();
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
  const [addModel, setAddModel] = useState(false);

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
  useTitle(
    `${projectDetails?.projectId ?? ""}${projectDetails?.projectId ? ":" : ""}${
      projectDetails?.projectName ?? ""
    }`
  );
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
          setDeleteModel(false);
          navigate("/dashboard", { replace: true });
        }
      })
      .catch((err) => {
        console.error("Error archiving the project");
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

  const allRoles = ["Texter", "Lector", "SEO-Optimizer", "Meta-lector"];

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

  const formatDate = (dateString: Date | string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "MMMM yyyy"); // "August 2025"
  };

  return (
    <>
      <div>
        <div className="mx-auto">
          <Breadcrumb
            pageName={t("projectDetails.breadcrumb.pageName")}
            link={` ${projectDetails?.projectId ?? ""}${
              projectDetails?.projectId ? ":" : ""
            }${projectDetails?.projectName ?? ""}`}
            linkshift={" / "}
          />

          {loading ? (
            <div className="grid grid-cols-5 gap-8">
              <div className="col-span-5 xl:col-span-3 rounded-sm border border-stroke  pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1   w-full bg-slate-200 h-[350px] animate-pulse"></div>
              <div className=" col-span-5 xl:col-span-2 rounded-sm border border-stroke  pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1   w-full bg-slate-200 h-[350px] animate-pulse"></div>
            </div>
          ) : (
            <>
              {!projectDetails?.onBoarding ? (
                <p className=" text-red-500 pb-6">
                  {t("projectDetails.onboarding.incomplete")}
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
                        onBoarding={onBoarding}
                        getTaskData={getTaskData}
                        speech={projectDetails?.speech}
                        perspective={projectDetails?.prespective}
                        handleDelete={handleDeleteApi}
                        firstName={userData?.firstName}
                        lastName={userData?.lastName}
                        email={userData?.email}
                        folderLink={projectDetails?.folderLink}
                      />
                      <AccordionData
                        speech={projectDetails?.speech}
                        perspective={projectDetails?.prespective}
                        projectName={projectDetails?.projectName}
                        onBoarding={onBoarding}
                      />

                      <progress
                        className="custom-progress mt-4"
                        value={projectDetails.finalTasks}
                        max={plan.totalTexts}
                      ></progress>
                      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-5 py-2">
                        <TaskComponent
                          label={t("projectDetails.taskStatus.status")}
                          name={
                            projectDetails?.projectStatus.toUpperCase() ===
                            "FREE TRIAL"
                              ? "Ready"
                              : projectDetails?.projectStatus
                          }
                        />
                        <TaskComponent
                          label={t("projectDetails.taskStatus.tasks")}
                          name={`${plan?.textsCount}/${plan?.totalTexts}`}
                        />
                        <TaskComponent
                          label={t("projectDetails.taskStatus.maxTasks")}
                          name={plan?.totalTexts}
                        />
                        <TaskComponent
                          label={t("projectDetails.taskStatus.duration")}
                          name={
                            plan?.duration === null
                              ? `${new Date().toLocaleString("default", {
                                  month: "long",
                                })}`
                              : `${plan?.duration} month`
                          }
                        />
                        <TaskComponent
                          label={t("projectDetails.taskStatus.taskPerMonth")}
                          name={plan?.tasksPerMonth}
                        />
                        <div>
                          <p className="text-xs text-slate-700 dark:text-slate-300 ">
                            {t("projectDetails.taskStatus.performancePeriod")}
                          </p>
                          <p className="text-black dark:text-white">
                            {typeof plan?.endDate === "string"
                              ? formatDate(plan?.endDate)
                              : `${new Date().toLocaleString("default", {
                                  month: "long",
                                })} (no subscription)`}
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
                        {t("projectDetails.projectMembers.heading")}
                      </h3>
                      {!(
                        projectDetails.lector &&
                        projectDetails.seo &&
                        projectDetails.texter &&
                        projectDetails.metaLector
                      ) ? (
                        <p
                          className="relative group w-5 h-5 bg-blue-500 text-white flex items-center justify-center cursor-pointer"
                          onClick={handleMembers}
                        >
                          <FontAwesomeIcon icon={faPlus} className="text-sm" />

                          {/* Tooltip */}
                          <div className=" shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-7 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {t(
                              "projectDetails.projectMembers.addFreelancerButton"
                            )}
                          </div>
                        </p>
                      ) : null}
                    </div>
                    <div className="px-7">
                      <TaskMembers
                        label={t(
                          "projectDetails.projectMembers.freelancerRole.texter"
                        )}
                        handleMembers={handleMembers}
                        name={showAssignedRoles(projectDetails.texter) ?? ""}
                      />
                      <TaskMembers
                        label={t(
                          "projectDetails.projectMembers.freelancerRole.lector"
                        )}
                        handleMembers={handleMembers}
                        name={showAssignedRoles(projectDetails.lector) ?? ""}
                      />
                      <TaskMembers
                        label={t(
                          "projectDetails.projectMembers.freelancerRole.seo"
                        )}
                        handleMembers={handleMembers}
                        name={showAssignedRoles(projectDetails?.seo) ?? ""}
                      />
                      <TaskMembers
                        label={t(
                          "projectDetails.projectMembers.freelancerRole.metaLector"
                        )}
                        handleMembers={handleMembers}
                        name={
                          showAssignedRoles(projectDetails?.metaLector) ?? ""
                        }
                      />
                    </div>
                    <div className="px-7 py-2.5"></div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="pt-14">
            <div className="flex justify-end items-center gap-3">
              {/* Import Icon with Tooltip */}
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
                  {t("projectDetails.addTask.label")}
                </div>
                {addModel && (
                  <AddModel
                    projectName={projectDetails?.projectName}
                    projectId={projectDetails?._id}
                    userId={userData?._id}
                    handleCloseAdd={() => setAddModel(false)}
                    getTaskData={getTaskData}
                  />
                )}
              </div>
              <div className="relative group">
                <Import
                  id={projectDetails._id}
                  handleRefreshData={getTaskData}
                />
                <span className=" shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-7 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {t("projectDetails.importExport.importButtonTooltip")}
                </span>
              </div>

              {/* Export Icon with Tooltip */}
              <div className="relative group">
                <Export
                  id={projectDetails._id}
                  taskLength={projectTasks.length}
                />
                <span className=" shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-7 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {t("projectDetails.importExport.exportButtonTooltip")}
                </span>
              </div>
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
