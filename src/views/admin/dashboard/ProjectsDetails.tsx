import React, { useEffect, useState } from "react";
import { google } from "googleapis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProjectTaskTable from "../../../components/ProjectDetails/ProjectTaskTable";
import * as XLSX from "xlsx";
import Breadcrumb from "../../../components/breeadcrumbs/Breadcrumb";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import TaskComponent from "../../../components/ProjectDetails/TaskComponent";
import DeleteModel from "../../../components/ProjectDetails/DeleteModel";
import Loading from "../../../components/Helpers/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemberModal from "../../../components/ProjectDetails/MemberModel";
import AddModel from "../../../components/ProjectDetails/AddModel";
import TaskMembers from "../../../components/ProjectDetails/TaskMembers";
import getInitials from "../../../components/Helpers/UpperCaseName";
import EditProject from "../../../components/ProjectDetails/EditProject";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import GroupTextArea from "../../../components/FormFields/GroupTextArea";
import EditManager from "../../../components/FormFields/EditManager";

const ProjectsDetails: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector<any>((state) => state.user);
  const projectId = localStorage.getItem("projectID");
  const [loading, setLoading] = useState(true);
  const [memberModel, setMemberModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [importModel, setImportModel] = useState(false);
  const [addModel, setAddModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [date, setDate] = useState("");
  const [projectDetails, setProjectDetails] = useState([]);
  const [projectTasks, setProjectTasks] = useState([]);
  const [onBoarding, setOnBoarding] = useState({});
  const [freelancer, setFreelancer] = useState([]);
  const [plan, setPlan] = useState({});
  const [userData, setUserData] = useState({});
  const [userId, setUserID] = useState(user.user.data.user._id);
  const [userToken, setUserToken] = useState(user.user.token);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [fileData, setFileData] = useState(null);
  const [modalKey, setModalKey] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [importLoader, setImportLoader] = useState(false);
  const [editManager, setEditManager] = useState(false);

  const [fileName, setFileName] = useState(
    "Drag files here or click to select files"
  );
  const [file, setFile] = useState(null);

  useEffect(() => {
    getTaskData();
    getFreelancerData();
    let token = userToken;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      projectId: projectId,
    }; 
    axios
      .post(`${import.meta.env.VITE_DB_URL}/admin/wordCountProject`, payload)
      .then((response) => {
       
      })
      .catch((err) => {
        console.error("Error updating word count of project:", err);
      });
    axios
      .post(`${import.meta.env.VITE_DB_URL}/admin/wordCountProject`, payload)
      .then((response) => {
       
      })
      .catch((err) => {
        console.error("Error updating word count of project:", err);
      });
    
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
      })
      .catch((err) => {
        console.error(
          "Error fetching project details:",
          err.response || err.message || err
        );
        setDropdownVisible(null);
      });
  };

  const showAssignedRoles = (memberId: number) => {
    if (!freelancer) return "";
    const foundFreelancer = freelancer.find((f) => f._id === memberId);
    if (foundFreelancer) {
      const fullName = `${foundFreelancer.firstName} ${foundFreelancer.lastName}`;
      return fullName;
    } else {
      return "";
    }
  };

  const allRoles = ["texter", "lector", "seo-optimizer"];

  const handleDelete = () => {
    setDeleteModel(true);
  };
  const handleImport = () => {
    setImportModel(true);
  };
  const handleAdd = () => {
    setAddModel(true);
  };
  const handleEdit = () => {
    setEditModel(true);
  };

  const handleCloseDelete = () => {
    setDeleteModel(false);
  };

  const handleCloseAdd = () => {
    setAddModel(false);
  };
  const handleCloseEdit = () => {
    setEditModel(false);
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

  const handleMembers = () => {
    setMemberModel(true);
    setDropdownVisible(null);
  };

  const handleCloseMemberModel = () => {
    setMemberModel(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile((prv) => selectedFile);
      setFileName(selectedFile.name);
      setModalKey((prevKey) => prevKey + 1); // Change key to force re-render
    }
  };

  const handleImportData = async (e, id) => {
    e.preventDefault();
    setImportLoader(true);

    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectId", id);

    try {
      const response = await axios.post(
        `https://driptext-api.malhoc.com/api/admin/importTasks`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response);
      setImportModel(false);
      toast.success("Tasks imported successfully");
      setFile(null);
      setFileName("Drag files here or click to select files");
      setError(false);
      setImportLoader(false);
    } catch (error) {
      console.error("Error importing tasks:", error);
      const err =
        error.response.data.message ||
        error.message ||
        "Failed to import tasks.";
      setError(true);
      setErrorMessage(err);
      setImportLoader(false);
    }
  };

  const handleCloseImport = () => {
    setFile(null);
    setFileName("No file chosen");
    setFileData(null);
    setImportModel(false);
    setError(false);
    setErrorMessage("");
  };

  const getAvailableRoles = () => {
    return allRoles;
  };

  const toggleDropdown = (memberId: number) => {
    setDropdownVisible((prev) => (prev === memberId ? null : memberId));
  };

  const handleExportData = (id) => {
    if (projectTasks.length == 0) {
      toast.error("No tasks to export");
      return;
    }
    const token = userToken;
    axios.defaults.headers.common["access-token"] = token;

    const payload = {
      projectId: id,
    };

    console.log("Payload:", payload);
    axios
      .post(`${import.meta.env.VITE_DB_URL}/admin/exportTasks`, payload)
      .then((response) => {
        console.log("Export URL:", response);
        const exportUrl = response.data.exportUrl;
        window.open(exportUrl, "_blank");
        const link = document.createElement("a");
        link.href = exportUrl;
        link.setAttribute("download", "");
        link.download = exportUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.error(
          "Error fetching project details:",
          err.response || err.message || err
        );
      });
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
  }

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
                      <div className="flex justify-between items-center gap-3">
                        <p className="text-xl font-semibold text-black dark:text-white pb-2">
                          {projectDetails.projectName}
                          {" | "}
                          {projectDetails.projectId}
                        </p>

                        <div className="flex justify-center items-center gap-3">
                          <button
                            onClick={handleAdd}
                            disabled={!projectDetails?.onBoarding}
                            className="w-10 h-10 text-center bg-blue-500 text-white rounded-none my-2 flex justify-center items-center border-none"
                          >
                            <FontAwesomeIcon
                              icon={faPlus}
                              className="text-sm px-2"
                            />
                          </button>
                          {addModel && (
                            <AddModel
                              projectName={projectDetails.projectName}
                              projectId={projectDetails._id}
                              userId={userData._id}
                              handleCloseAdd={handleCloseAdd}
                              getTaskData={getTaskData}
                            />
                          )}
                          <button
                            onClick={handleEdit}
                            className="w-10 h-10 text-center bg-slate-100 text-blue-500 hover:bg-blue-500 hover:text-white rounded-none my-2 flex justify-center items-center border-none"
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="text-sm px-2"
                            />
                          </button>
                          {editModel && (
                            <EditProject
                              projectId={projectDetails._id}
                              domain={projectDetails?.projectName}
                              speech={projectDetails?.speech}
                              perspective={projectDetails?.prespective}
                              handleCloseEdit={handleCloseEdit}
                              handleRefreshData={getTaskData}
                            />
                          )}
                          <button
                            onClick={handleDelete}
                            className="w-10 h-10 text-center bg-slate-100 text-slate-600 hover:bg-blue-500 hover:text-white rounded-none my-2 flex justify-center items-center border-none"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                          {deleteModel && (
                            <DeleteModel
                              handleDelete={handleDeleteApi}
                              handleClose={handleCloseDelete}
                            />
                          )}
                        </div>
                      </div>
                      <div className="py-2">
                        <h3 className="font-medium text-black dark:text-white">
                          Client
                        </h3>
                        <p className="text-sm text-black dark:text-white">
                          {userData.firstName} {userData.lastName} {"("}
                          {userData.email}
                          {")"}
                        </p>
                      </div>
                      <Accordion
                        allowToggle
                        className={`appearance-none border-none py-4 `}
                      >
                        <AccordionItem
                          className={`border-none bg-slate-100 dark:bg-meta-4 rounded`}
                        >
                          {({ isExpanded }) => (
                            <>
                              <h2>
                                <AccordionButton className="flex justify-between items-center bg-slate-200 dark:bg-meta-4 ">
                                  <p className="font-semibold text-black dark:text-white ">
                                    OnBoarding
                                  </p>
                                  {isExpanded ? (
                                    <MinusIcon fontSize="12px" />
                                  ) : (
                                    <AddIcon fontSize="12px" />
                                  )}
                                </AccordionButton>
                              </h2>
                              <AccordionPanel className="" pb={4}>
                                <div className="bg-white dark:bg-boxdark rounded py-2 px-4">
                                  <h2 className="text-black dark:text-white text-base font-semibold lg:mt-3 pb-3">
                                    1. General information:
                                  </h2>
                                  <div className="px-2">
                                    <p className="dark:text-white font-semibold pb-2">
                                      Speech
                                    </p>
                                    <p className="dark:text-white bg-slate-200 dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                                      {projectDetails?.speech}
                                    </p>
                                  </div>
                                  <div className="px-2">
                                    <p className="dark:text-white font-semibold pb-2">
                                      Perspective
                                    </p>
                                    <p className="dark:text-white bg-slate-200 dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                                      {projectDetails?.prespective}
                                    </p>
                                  </div>
                                  <div className="px-2">
                                    <p className="dark:text-white font-semibold pb-2">
                                      Website
                                    </p>
                                    <p className="dark:text-white bg-slate-200 dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                                      {projectDetails?.projectName}
                                    </p>
                                  </div>
                                  <div className="w-full flex flex-col gap-2.5">
                                    <h2 className="text-black dark:text-white text-base font-semibold lg:mt-3">
                                      2. Company Information
                                    </h2>
                                    <div className="px-3">
                                      <label className="text-black dark:text-white text-sm 3xl:text-[15px] font-semibold 2xl:font-semibold pt-0">
                                        Background information about the company
                                      </label>
                                      <p className="w-full bg-slate-200 placeholder:text-black/60 dark:placeholder:text-white/50 text-black dark:text-white border border-transparent text-sm px-3 xs:px-3 py-2 font-normal rounded focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary">
                                        {onBoarding?.companyBackgorund}
                                      </p>
                                    </div>
                                    <div className="px-3">
                                      <label className="text-black dark:text-white text-sm 3xl:text-[15px] font-semibold 2xl:font-semibold pt-0">
                                        Which attributes best describe you as a
                                        company/your products/your services?
                                      </label>
                                      <p className="w-full bg-slate-200 placeholder:text-black/60 dark:placeholder:text-white/50 text-black dark:text-white border border-transparent text-sm px-3 xs:px-3 py-2 font-normal rounded focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary">
                                        {onBoarding?.companyAttributes}
                                      </p>
                                    </div>
                                    <div className="px-3">
                                      <label className="text-black dark:text-white text-sm 3xl:text-[15px] font-semibold 2xl:font-semibold pt-0">
                                        What are your services?
                                      </label>
                                      <p className="w-full bg-slate-200 placeholder:text-black/60 dark:placeholder:text-white/50 text-black dark:text-white border border-transparent text-sm px-3 xs:px-3 py-2 font-normal rounded focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary">
                                        {onBoarding?.comapnyServices}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-full flex flex-col gap-2.5">
                                    <h2 className="text-black dark:text-white text-base font-semibold lg:mt-3">
                                      3. Information About the Target Customers
                                    </h2>
                                    <div className="px-3">
                                      <label className="text-black dark:text-white text-sm 3xl:text-[15px] font-semibold 2xl:font-semibold pt-0">
                                        Who is the content written for?
                                      </label>
                                      <p className="w-full bg-slate-200 placeholder:text-black/60 dark:placeholder:text-white/50 text-black dark:text-white border border-transparent text-sm px-3 xs:px-3 py-2 font-normal rounded focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary">
                                        {onBoarding?.customerContent}
                                      </p>
                                    </div>
                                    <div className="px-3">
                                      <label className="text-black dark:text-white text-sm 3xl:text-[15px] font-semibold 2xl:font-semibold pt-0">
                                        Customers we want to address have an
                                        interest in...
                                      </label>
                                      <p className="w-full bg-slate-200 placeholder:text-black/60 dark:placeholder:text-white/50 text-black dark:text-white border border-transparent text-sm px-3 xs:px-3 py-2 font-normal rounded focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary">
                                        {onBoarding?.customerIntrest}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-full flex flex-col gap-2.5">
                                    <h2 className="text-black dark:text-white text-base font-semibold lg:mt-3">
                                      4. Aim of the Content
                                    </h2>
                                    <div className="px-3">
                                      <label className="text-black dark:text-white text-sm 3xl:text-[15px] font-semibold 2xl:font-semibold pt-0">
                                        What is the purpose of the content?
                                      </label>
                                      <p className="w-full bg-slate-200 placeholder:text-black/60 dark:placeholder:text-white/50 text-black dark:text-white border border-transparent text-sm px-3 xs:px-3 py-2 font-normal rounded focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary">
                                        {onBoarding?.contentPurpose}
                                      </p>
                                    </div>
                                    <div className="px-3">
                                      <label className="text-black dark:text-white text-sm 3xl:text-[15px] font-semibold 2xl:font-semibold pt-0">
                                        Information about your brand and your
                                        content
                                      </label>
                                      <p className="w-full bg-slate-200 placeholder:text-black/60 dark:placeholder:text-white/50 text-black dark:text-white border border-transparent text-sm px-3 xs:px-3 py-2 font-normal rounded focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary">
                                        {onBoarding?.contentInfo}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </AccordionPanel>
                            </>
                          )}
                        </AccordionItem>
                      </Accordion>

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
                          name={projectDetails.projectStatus}
                        />
                        <TaskComponent
                          label="Tasks"
                          name={`${plan.textsCount}/${plan.totalTexts}`}
                        />
                        <TaskComponent
                          label="Max Tasks"
                          name={plan.totalTexts}
                        />
                        <TaskComponent label="Duration" name={plan.duration} />
                        <TaskComponent
                          label="Task per month"
                          name={plan.tasksPerMonth}
                        />
                        <div>
                          <p className="text-xs text-slate-700 dark:text-slate-300 ">
                            Performance Period
                          </p>
                          <p className="text-black dark:text-white">
                            {typeof plan.endDate === "string"
                              ? formatDateString(plan.endDate)
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
                        removeDelete={true}
                        handleMembers={handleMembers}
                        name={showAssignedRoles(projectDetails.texter) ?? ""}
                      />
                      <TaskMembers
                        label={"Lector"}
                        removeDelete={true}
                        handleMembers={handleMembers}
                        name={showAssignedRoles(projectDetails.lector) ?? ""}
                      />
                      <TaskMembers
                        label={"SEO"}
                        removeDelete={true}
                        handleMembers={handleMembers}
                        name={showAssignedRoles(projectDetails.seo) ?? ""}
                      />
                      <TaskMembers
                        label={"Meta-lector"}
                        removeDelete={true}
                        handleMembers={handleMembers}
                        name={"projectDetails.metaLector" ?? ""}
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
                      {/* Hidden file input */}
                      <input
                        type="file"
                        className="absolute top-0 left-0 opacity-0 w-full h-30 cursor-pointer"
                        onClick={(e) => {
                          handleFileChange(e);
                        }}
                        accept=".csv"
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
                      onClick={(e) => handleImportData(e, projectDetails._id)}
                      disabled={importLoader}
                    >
                      {importLoader ? "Importing..." : "Import"}
                    </button>
                    {error && (
                      <p className="pt-6 text-red-500">{errorMessage}</p>
                    )}
                  </div>
                </div>
              )}
              <button
                onClick={() => {
                  handleExportData(projectDetails._id);
                }}
                className="w-10 h-10 text-center bg-slate-100 text-blue-500 hover:bg-blue-500 hover:text-white rounded-none ml-1.5 flex justify-center items-center border-none"
              >
                <FontAwesomeIcon icon={faUpload} className="text-sm px-2" />
              </button>
            </div>

            {loading ? (
              <div className="mt-4 rounded-sm border border-stroke  pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1   w-full bg-slate-200 h-[350px] animate-pulse"></div>
            ) : (
              <ProjectTaskTable
                tasks={projectTasks}
                freelancer={freelancer}
                userId={userData._id}
                projectId={projectDetails._id}
                projectName={projectDetails.projectName}
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
