import React, { useEffect, useState } from "react";
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
import { useLocation } from "react-router-dom";
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

const ProjectsDetails: React.FC = () => {
  const location = useLocation();
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
  const [freelancer, setFreelancer] = useState([]);
  const [plan, setPlan] = useState({});
  const [userData, setUserData] = useState({});
  const [userId, setUserID] = useState(user.user.data.user._id);
  const [userToken, setUserToken] = useState(user.user.token);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<{ [key: number]: string }>(
    {}
  );
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState(
    "Drag files here or click to select files"
  );
  const [file, setFile] = useState(null);

  useEffect(() => {
    getTaskData();
    getFreelancerData();
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
        console.log("Project data fetched:", allProjects);
        setPlan(allProjects.plan);
        setUserData(allProjects.user);
        setProjectTasks(allProjects.projectTasks);
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
    
  
    axios.post(`${import.meta.env.VITE_DB_URL}/admin/assignFreelancersByProject`, payload)
      .then((response) => {
        getTaskData(); 
        setDropdownVisible(null);
      })
      .catch((err) => {
        console.error("Error fetching project details:", err.response || err.message || err);
        setDropdownVisible(null);
      });
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
    alert("Project archived");
    setDeleteModel(false);
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

  const handleCloseImport = () => {
    setFile(null);
    setFileName("No file chosen");
    setFileData(null);
    setImportModel(false);
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
  };


  const getAvailableRoles = () => {
    return allRoles;
  };

  const toggleDropdown = (memberId: number) => {
    setDropdownVisible((prev) => (prev === memberId ? null : memberId));
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

  function formatDateString(dateString: string): string | null {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return null;
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="mx-auto">
            <Breadcrumb pageName={"Project Details"} />
            <ToastContainer />

            <div className="grid grid-cols-5 gap-8">
              <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="py-6 px-7 dark:border-strokedark">
                    <p className="text-xl font-semibold text-black dark:text-white pb-2">
                      {projectDetails.projectName}
                      {" | "}
                      {projectDetails.projectId}
                    </p>
                    <div className="py-2">
                      <h3 className="font-medium text-black dark:text-white">
                        Customer
                      </h3>
                      <p className="text-sm text-black dark:text-white">
                        {userData.firstName} {userData.lastName} {"("}
                        {userData.email}
                        {")"}
                      </p>
                    </div>

                    <div className="pt-1 pb-3">
                      <h2>Folder</h2>
                      <a
                        href={"project.googleLink"}
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

                        <span className="px-1">{projectDetails.projectId}</span>
                      </a>
                    </div>
                    <progress
                      className="custom-progress"
                      value={projectDetails.finalTasks}
                      max={plan.totalTexts}
                    ></progress>
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-x-4 py-2">
                      <TaskComponent
                        label="Status"
                        name={projectDetails.projectStatus}
                      />
                      <TaskComponent
                        label="Tasks"
                        name={`${plan.textsCount}/${plan.totalTexts}`}
                      />
                      <TaskComponent label="Max Tasks" name={plan.totalTexts} />
                      <TaskComponent label="Duration" name={plan.duration} />
                      <TaskComponent
                        label="Task per month"
                        name={plan.tasksPerMonth}
                      />
                      <div>
                        <p className="text-xs text-slate-700 dark:text-slate-300">
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
                    <div className="py-2">
                      <p className="text-sm">Project Manager</p>
                      <div className="flex justify-start items-center py-2">
                        <p className="text-black w-6 h-6 dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs px-1 py-1 flex justify-center items-center">
                          {getInitials("Danile John")}
                        </p>
                        <p className="px-2.5 text-black dark:text-white">
                          Danile John
                        </p>
                      </div>
                    </div>
                    <TaskMembers
                      label={"Texter"}
                      name={projectDetails.texter ?? ""}
                    />
                    <TaskMembers
                      label={"Lector"}
                      name={projectDetails.lector ?? ""}
                    />
                    <TaskMembers
                      label={"SEO"}
                      name={projectDetails.seo ?? ""}
                    />
                    <TaskMembers
                      label={"Meta-lector"}
                      name={projectDetails.metaLector ?? ""}
                    />
                  </div>
                  <div className="px-7 py-6">
                    <button
                      onClick={handleAdd}
                      className="w-full h-10 text-center bg-blue-500 text-white rounded-none my-2 flex justify-center items-center border-none"
                    >
                      Add Text
                      <FontAwesomeIcon icon={faPlus} className="text-sm px-2" />
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
                      className="w-full h-10 text-center bg-slate-100 text-blue-500 hover:bg-blue-500 hover:text-white rounded-none my-2 flex justify-center items-center border-none"
                    >
                      Edit
                      <FontAwesomeIcon icon={faEdit} className="text-sm px-2" />
                    </button>
                    {editModel && (
                      <div className="w-auto fixed inset-0 flex items-center justify-center z-[9999] bg-neutral-200 dark:bg-slate dark:bg-opacity-15 bg-opacity-60 px-4">
                        <div className="bg-white dark:bg-black p-6 rounded shadow-lg lg:w-6/12 xl:w-6/12 2xl:w-6/12 3xl:w-5/12 max-h-[90vh] overflow-y-auto scrollbar-hide">
                          <div className="flex justify-between items-center mb-5">
                            <h2 className="text-xl font-bold dark:text-white pr-12">
                              Edit Task
                            </h2>
                            <FontAwesomeIcon
                              className="cursor-pointer text-lg text-red-500 pl-12"
                              onClick={handleCloseEdit}
                              icon={faTimes}
                            />
                          </div>
                          <div>
                            <div className="w-full py-2">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="dueUntil"
                              >
                                Due until
                              </label>
                              <DatePicker
                                className="w-full rounded border border-transparent bg-gray-100 py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                minDate={new Date()}
                                selected={"2024-04-06"}
                                onChange={(date: Date | null) =>
                                  setDate("2024-04-06")
                                }
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select a date"
                              />
                            </div>

                            <div className="w-full py-2">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="topic"
                              >
                                Topic
                              </label>
                              <input
                                className="w-full rounded border border-transparent bg-gray py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="topic"
                                id="topic"
                                placeholder="topic"
                                defaultValue={""}
                              />
                            </div>
                            <div className="w-full py-2">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="Keywords"
                              >
                                Keyword
                              </label>
                              <input
                                className="w-full rounded border border-transparent bg-gray py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="Keyword"
                                id="Keywords"
                                placeholder="Keywords"
                                defaultValue={""}
                              />
                            </div>
                            <div className="w-full py-2">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="dropdown"
                              >
                                Text type
                              </label>
                              <div className="relative">
                                {" "}
                                <select
                                  id="dropdown"
                                  className="w-full appearance-none rounded border border-transparent bg-gray py-2.5 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                >
                                  <option>Guide</option>
                                  <option>Shop (Category)</option>
                                  <option>Shop (Product)</option>
                                  <option>Definition/Wiki</option>
                                  <option>Shop (Home page)</option>
                                  <option>CMS page</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                  {/* Custom arrow icon */}
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 9l-7 7-7-7"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div className="w-full py-2">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="wordExpected"
                              >
                                Word Count Expected
                              </label>
                              <input
                                className="w-full  rounded border border-transparent bg-gray py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="number"
                                name="wordExpected"
                                id="wordExpected"
                                placeholder="1500"
                                min={0}
                              />
                            </div>
                            <div className="w-full py-2">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white "
                                htmlFor="comment"
                              >
                                Comment
                              </label>
                              <textarea
                                id="comment"
                                rows={3}
                                className="w-full rounded border border-transparent bg-gray py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              ></textarea>
                            </div>
                            <button
                              className="w-full my-3 flex justify-center rounded bg-primary py-1.5 px-6 font-medium text-gray hover:bg-opacity-90"
                              type="submit"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="w-full flex justify-between items-center my-1">
                      <button
                        onClick={handleImport}
                        className="w-1/2 h-10 text-center bg-slate-100 text-blue-500 hover:bg-blue-500 hover:text-white rounded-none mr-1.5 flex justify-center items-center border-none"
                      >
                        Import
                        <FontAwesomeIcon
                          icon={faDownload}
                          className="text-sm px-2"
                        />
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
                                accept=".xlsx, .xls"
                              />
                              <div className="flex justify-start items-center py-15">
                                <FontAwesomeIcon
                                  icon={faCloudUploadAlt}
                                  className="text-gray-600 w-12 h-12 px-4"
                                />
                                <p className="mt-2 text-gray-700 ">
                                  {fileName}
                                </p>
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
                        className="w-1/2 h-10 text-center bg-slate-100 text-blue-500 hover:bg-blue-500 hover:text-white rounded-none ml-1.5 flex justify-center items-center border-none"
                      >
                        Export
                        <FontAwesomeIcon
                          icon={faUpload}
                          className="text-sm px-2"
                        />
                      </button>
                    </div>
                    <button
                      onClick={handleDelete}
                      className="w-full h-10 text-center bg-slate-100 text-slate-600 hover:bg-blue-500 hover:text-white rounded-none my-2 flex justify-center items-center border-none"
                    >
                      <p className="px-2">Archive Project</p>
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
              </div>
            </div>
            <ProjectTaskTable
              tasks={projectTasks}
              freelancer={freelancer}
              userId={userData._id}
              projectId={projectDetails._id}
              projectName={projectDetails.projectName}
            />
          </div>
          {memberModel && (
            <MemberModal
              isOpen={memberModel}
              freelancer={freelancer}
              handleCloseMemberModel={handleCloseMemberModel}
              toggleDropdown={toggleDropdown}
              dropdownVisible={dropdownVisible}
              getInitials={getInitials}
              getAvailableRoles={getAvailableRoles}
              handleRoleSelect={handleRoleSelect}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ProjectsDetails;
