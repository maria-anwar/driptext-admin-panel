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
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import ProjectTaskTable from "../../../components/tables/ProjectTaskTable";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import * as XLSX from "xlsx";
import Breadcrumb from "../../../components/breeadcrumbs/Breadcrumb";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const tasksWithDetails = [
  {
    status: "completed",
    deadline: new Date("2024-06-10").toLocaleDateString("en-US"),
    wordCount: 3000,
    topic: "Introduction to Quantum Computing",
    textType: "textbook",
    googleLink: "https://docs.google.com/document/d/1",
    worker: {
      texter: "John Doe",
      lector: "Jane Smith",
      SEO: "Alice Johnson",
      metalector: "Bob Brown",
    },
  },
  {
    status: "completed",
    deadline: new Date("2024-06-15").toLocaleDateString("en-US"),
    wordCount: 3200,
    topic: "Artificial Intelligence Applications",
    textType: "research paper",
    googleLink: "https://docs.google.com/document/d/2",
    worker: {
      texter: "John Doe",
      lector: "Jane Smith",
      SEO: "Alice Johnson",
      metalector: "Bob Brown",
    },
  },
  {
    status: "completed",
    deadline: new Date("2024-06-20").toLocaleDateString("en-US"),
    wordCount: 3400,
    topic: "Deep Learning Models",
    textType: "manual",
    googleLink: "https://docs.google.com/document/d/3",
    worker: {
      texter: "John Doe",
      lector: "Jane Smith",
      SEO: "Alice Johnson",
      metalector: "Bob Brown",
    },
  },
  {
    status: "completed",
    deadline: new Date("2024-06-25").toLocaleDateString("en-US"),
    wordCount: 3600,
    topic: "Future of Data Analytics",
    textType: "eBook",
    googleLink: "https://docs.google.com/document/d/4",
    worker: {
      texter: "John Doe",
      lector: "Jane Smith",
      SEO: "Alice Johnson",
      metalector: "Bob Brown",
    },
  },
];

const freelancer = [
  {
    id: 1,
    name: "Alice John",
  },
  {
    id: 2,
    name: "Bob Smith",
  },
  {
    id: 3,
    name: "Charlie Brown",
  },
  {
    id: 4,
    name: "Diana Prince",
  },
  {
    id: 5,
    name: "Eve Adams",
  },
  {
    id: 6,
    name: "Frank Clark",
  },
  {
    id: 7,
    name: "Grace Lee",
  },
  {
    id: 8,
    name: "Henry Miller",
  },
  {
    id: 9,
    name: "Ivy Wilson",
  },
  {
    id: 10,
    name: "Jack Taylor",
  },
  {
    id: 11,
    name: "Kara Johnson",
  },
  {
    id: 12,
    name: "Liam Davis",
  },
  {
    id: 13,
    name: "Mia Walker",
  },
  {
    id: 14,
    name: "Nate Harris",
  },
  {
    id: 15,
    name: "Olivia Young",
  },
];

const ProjectsDetails: React.FC = () => {
  const location = useLocation();
  const user = useSelector<any>((state) => state.user);
  const projectId = localStorage.getItem("projectID");
  const [memberModel, setMemberModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [importModel, setImportModel] = useState(false);
  const [addModel, setAddModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [date, setDate] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<{ [key: number]: string }>(
    {}
  );
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState(
    "Drag files here or click to select files"
  );

  const [projectDetails, setProjectDetails] = useState([]);
  const [plan, setPlan] = useState({});
  const [userData, setUserData] = useState({});
  const [userId, setUserID] = useState(user.user.data.user._id);
  const [userToken, setUserToken] = useState(user.user.token);

  useEffect(() => {
    let token = userToken;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      projectId: projectId,
    };
    // "https://driptext-api.vercel.app/api/projects/detail";

    axios
      .post(
        `https://driptext-api.vercel.app/api/admin/getProjectDetail`,
        payload
      )
      .then((response) => {
        const projectDataArray = response.data.project;
        const allProjects = projectDataArray;

        setProjectDetails(allProjects);
        setPlan(allProjects.plan);
        setUserData(allProjects.user);
        console.log(userData);
      })
      .catch((err) => {
        console.error("Error fetching project details:", err);
      });
  }, [projectId, userId]);

  const allRoles = ["Texter", "Lector", "SEO", "Meta-lector"];

  const formatDate = (dateString: Date | string) => {
    const date = new Date(dateString);
    return format(date, "MMM dd, yyyy"); // "August 2025"
  };

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
  const handleCloseImport = () => {
    setImportModel(false);
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
    const file = e.target.files[0];
    if (file) {
      // Check if the file is an Excel file
      const isExcelFile =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel";

      if (isExcelFile) {
        setFileName(file.name);
      } else {
        setFileName("Please select a valid Excel file");
      }
    } else {
      setFileName("No file chosen");
    }
  };

  const handleImportData = () => {
    console.log(fileData);
    if (fileData) {
      const reader = new FileReader();

      reader.onload = () => {
        const data = new Uint8Array(fileData);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // Assuming we want the first sheet
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Handle the parsed data here
        console.log("Parsed Data:", jsonData);

        // Example: store the data in a state or process it as needed
        // setFileData(jsonData);
      };

      reader.readAsArrayBuffer(fileData);
    }
    handleCloseImport();
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  const handleRoleSelect = (role: string, memberId: number) => {
    setSelectedRoles((prevRoles) => ({
      ...prevRoles,
      [memberId]: role,
    }));
    setDropdownVisible(null); // Hide dropdown after
    alert(`Added member ${memberId} as ${role}`);
  };

  const getAvailableRoles = (memberId: number) => {
    const usedRoles = Object.values(selectedRoles);
    return allRoles.filter((role) => !usedRoles.includes(role));
  };

  const toggleDropdown = (memberId: number) => {
    setDropdownVisible((prev) => (prev === memberId ? null : memberId));
  };

  const TaskMembers: React.FC<{ label: string; name: string }> = ({
    label,
    name,
  }) => {
    return name === "" ? (
      <></>
    ) : (
      <div>
        <p className="text-sm">{label}</p>
        <div className="flex justify-between items-center py-1.5">
          <div className="flex justify-start items-center">
            <p className="text-black w-6 h-6 dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs px-1 py-1 flex justify-center items-center">
              {getInitials("name")}
            </p>
            <p className="px-2.5 text-black dark:text-white">{"name"}</p>
          </div>
          <div className="flex justify-start items-center">
            <svg
              fill="#3CB371"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-3.5 h-3.5 text-blue-500  cursor-pointer mx-6"
              onClick={() => alert(`Edit ${label}`)}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M447.1,86.2C400.3,33.4,332.2,0,256,0C114.6,0,0,114.6,0,256h64c0-106.1,85.9-192,192-192c58.5,0,110.4,26.5,145.5,67.8L341.3,192H512V21.3L447.1,86.2z M256,448c-58.5,0-110.4-26.5-145.5-67.8l60.2-60.2H0v170.7l64.9-64.9c46.8,52.8,115,86.2,191.1,86.2c141.4,0,256-114.6,256-256h-64C448,362.1,362.1,448,256,448z M298.7,256c0-23.6-19.1-42.7-42.7-42.7s-42.7,19.1-42.7,42.7s19.1,42.7,42.7,42.7S298.7,279.6,298.7,256z"></path>
              </g>
            </svg>

            <FontAwesomeIcon
              icon={faTimes}
              className="text-lg text-red-500 cursor-pointer"
              onClick={() => alert(`Delete ${label}`)}
            />
          </div>
        </div>
      </div>
    );
  };

  const TaskComponent: React.FC<{ label: string; name: string | number }> = ({
    label,
    name,
  }) => {
    return (
      <div>
        <p className="text-xs text-slate-700 dark:text-slate-300">{label}</p>
        <p className="text-black dark:text-white">{name}</p>
      </div>
    );
  };

  return (
    <>
      <div className="mx-auto">
        <Breadcrumb pageName={"Project Details"} />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="py-6 px-7 dark:border-strokedark">
                <p className="text-xl font-semibold text-black dark:text-white pb-2">
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
                <Accordion
                  allowToggle
                  className="appearance-none border-none py-4 -ml-4"
                >
                  <AccordionItem className="border-none">
                    {({ isExpanded }) => (
                      <>
                        <h2>
                          <AccordionButton className="flex justify-between items-center ">
                            <p className=" text-black dark:text-white">
                              Description
                            </p>
                            {isExpanded ? (
                              <MinusIcon fontSize="12px" />
                            ) : (
                              <AddIcon fontSize="12px" />
                            )}
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <div className="bg-slate-100 dark:bg-boxdark rounded py-2 px-4">
                            <p className="dark:text-white font-semibold text-lg">
                              Project
                            </p>
                            <p className="dark:text-white pt-2">
                              1. General information:
                            </p>
                            <div className="px-2">
                              <p className="dark:text-white">
                                Address of Speech
                              </p>
                              <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                                various
                              </p>
                              <p className="dark:text-white">Perspective</p>
                              <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                                me
                              </p>
                              <p className="dark:text-white">Website</p>
                              <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                                various
                              </p>
                            </div>
                            <p className="dark:text-white pt-2">
                              2. Information about the Company:
                            </p>
                            <div className="px-2">
                              <p className="dark:text-white">
                                Company Background
                              </p>
                              <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                                various
                              </p>
                              <p className="dark:text-white">
                                Company Attributes
                              </p>
                              <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                                me
                              </p>
                              <p className="dark:text-white">
                                Company Services
                              </p>
                              <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                                various
                              </p>
                            </div>
                            <p className="dark:text-white pt-2">
                              3. Information about the target customers:
                            </p>
                            <div className="px-2">
                              <p className="dark:text-white">Target Audience</p>
                              <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                                various
                              </p>
                              <p className="dark:text-white">
                                Customer Interests
                              </p>
                              <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                                me
                              </p>
                            </div>
                            <p className="dark:text-white pt-2">
                              4. Aim of content:
                            </p>
                            <div className="px-2">
                              <p className="dark:text-white">Content Goal</p>
                              <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                                various
                              </p>
                              <p className="dark:text-white">
                                Brand Content Information
                              </p>
                              <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                                me
                              </p>
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
                  <TaskComponent
                    label="Performance Period"
                    name={plan.endDate}
                  />
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
                <TaskMembers label={"Texter"} name={"project.worker.texter"} />
                <TaskMembers label={"Lector"} name={"project.worker.lector"} />
                <TaskMembers label={"SEO"} name={"project.worker.SEO"} />
                <TaskMembers
                  label={"Meta-lector"}
                  name={"project.worker.metalector"}
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
                  <div className="w-auto fixed inset-0 flex items-center justify-center z-[9999] bg-neutral-200 dark:bg-slate dark:bg-opacity-15 bg-opacity-60 px-4">
                    <div className="bg-white dark:bg-black p-6 rounded shadow-lg lg:w-6/12 xl:w-6/12 2xl:w-6/12 3xl:w-5/12 max-h-[90vh] overflow-y-auto scrollbar-hide">
                      <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl font-bold dark:text-white pr-12">
                          Add Task
                        </h2>
                        <FontAwesomeIcon
                          className="cursor-pointer text-lg text-red-500 pl-12"
                          onClick={handleCloseAdd}
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
                            selected={"2025-01-01"}
                            onChange={(date: Date | null) =>
                              setDate("2025-04-05")
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
                <button
                  onClick={handleEdit}
                  className="w-full h-10 text-center bg-slate-300 text-blue-500 rounded-none my-2 flex justify-center items-center border-none"
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
                    className="w-1/2 h-10 text-center bg-slate-300 text-blue-500 rounded-none mr-1.5 flex justify-center items-center border-none"
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
                            <p className="mt-2 text-gray-700 ">{fileName}</p>
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
                      alert("download");
                    }}
                    className="w-1/2 h-10 text-center bg-slate-300 text-blue-500 rounded-none ml-1.5 flex justify-center items-center border-none"
                  >
                    Export
                    <FontAwesomeIcon icon={faUpload} className="text-sm px-2" />
                  </button>
                </div>
                <button
                  onClick={handleDelete}
                  className="w-full h-10 text-center bg-slate-300 text-slate-600 rounded-none my-2 flex justify-center items-center border-none"
                >
                  <p className="px-2">Archive Project</p>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-5"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M9 12C9 11.5341 9 11.3011 9.07612 11.1173C9.17761 10.8723 9.37229 10.6776 9.61732 10.5761C9.80109 10.5 10.0341 10.5 10.5 10.5H13.5C13.9659 10.5 14.1989 10.5 14.3827 10.5761C14.6277 10.6776 14.8224 10.8723 14.9239 11.1173C15 11.3011 15 11.5341 15 12C15 12.4659 15 12.6989 14.9239 12.8827C14.8224 13.1277 14.6277 13.3224 14.3827 13.4239C14.1989 13.5 13.9659 13.5 13.5 13.5H10.5C10.0341 13.5 9.80109 13.5 9.61732 13.4239C9.37229 13.3224 9.17761 13.1277 9.07612 12.8827C9 12.6989 9 12.4659 9 12Z"
                        stroke="#000000"
                        stroke-width="1"
                      ></path>
                      <path
                        opacity="0.5"
                        d="M20.5 7V13C20.5 16.7712 20.5 18.6569 19.3284 19.8284C18.1569 21 16.2712 21 12.5 21H11.5C7.72876 21 5.84315 21 4.67157 19.8284C3.5 18.6569 3.5 16.7712 3.5 13V7"
                        stroke="#000000"
                        stroke-width="1"
                        stroke-linecap="round"
                      ></path>
                      <path
                        d="M2 5C2 4.05719 2 3.58579 2.29289 3.29289C2.58579 3 3.05719 3 4 3H20C20.9428 3 21.4142 3 21.7071 3.29289C22 3.58579 22 4.05719 22 5C22 5.94281 22 6.41421 21.7071 6.70711C21.4142 7 20.9428 7 20 7H4C3.05719 7 2.58579 7 2.29289 6.70711C2 6.41421 2 5.94281 2 5Z"
                        stroke="#000000"
                        stroke-width="1"
                      ></path>
                    </g>
                  </svg>
                </button>
                {deleteModel && (
                  <div className="fixed inset-0 flex items-center justify-center z-9999 bg-neutral-200 dark:bg-slate dark:bg-opacity-15 bg-opacity-60 px-4">
                    <div className="bg-white dark:bg-black p-6 rounded shadow-lg">
                      <h2 className="text-xl font-bold mb-4 dark:text-white">
                        Archived Project
                      </h2>
                      <p>Are you sure you want to archive this project?</p>
                      <button
                        className=" mr-4 mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        onClick={handleDeleteApi}
                      >
                        Confirm
                      </button>
                      <button
                        className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        onClick={handleCloseDelete}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Assuming ProjectTaskTable is defined elsewhere */}
        {/* <ProjectTaskTable tasks={tasksWithDetails} project={project} /> */}
      </div>
      {memberModel && (
        <div className="w-auto fixed inset-0 flex items-center justify-center z-[9999] bg-neutral-200 dark:bg-slate dark:bg-opacity-15 bg-opacity-60 px-4">
          <div className="bg-white dark:bg-black p-6 rounded shadow-lg lg:w-6/12 xl:w-6/12 2xl:w-6/12 3xl:w-5/12 max-h-[90vh] overflow-y-auto scrollbar-hide">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold dark:text-white pr-12">
                Add members
              </h2>
              <FontAwesomeIcon
                className="cursor-pointer text-lg text-red-500 pl-12"
                onClick={handleCloseMemberModel}
                icon={faTimes}
              />
            </div>
            {freelancer.map((member) => (
              <div
                key={member.id}
                className="flex justify-between items-center py-3"
              >
                <div className="flex justify-start items-center">
                  <p className="text-black w-6 h-6 dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs px-1 py-1 flex justify-center items-center">
                    {getInitials(member.name)}
                  </p>
                  <p className="px-2.5 text-black dark:text-white">
                    {member.name}
                  </p>
                </div>
                <div className="relative">
                  <p
                    className="w-5 h-5 bg-slate-200 text-white flex items-center justify-center cursor-pointer"
                    onClick={() => toggleDropdown(member.id)}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="text-sm text-blue-500"
                    />
                  </p>
                  {dropdownVisible === member.id && (
                    <div className="absolute right-0 mt-2 z-9999 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-lg">
                      <ul>
                        {getAvailableRoles(member.id).map((role) => (
                          <li
                            key={role}
                            className="px-4 w-30 py-2 cursor-pointer bg-slate-100 dark:bg-dark-gray dark:rounded-none dark:text-white rounded-md hover:bg-slate-200 dark:hover:bg-slate-600"
                            onClick={() => handleRoleSelect(role, member.id)}
                          >
                            {role}
                          </li>
                        ))}
                        {getAvailableRoles(member.id).length === 0 && (
                          <li className="px-4 py-2 text-gray-500">
                            No roles available
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsDetails;
