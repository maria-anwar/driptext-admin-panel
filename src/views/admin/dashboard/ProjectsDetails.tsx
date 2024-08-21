import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faPlus,
  faEdit,
  faDownload,
  faUpload,
  faArchive,
  faTimes,
  faRedo,
  faUndo,
  faSync,
} from "@fortawesome/free-solid-svg-icons";

import { useLocation } from "react-router-dom";
import ProjectTaskTable from "../../../components/tables/ProjectTaskTable";


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
  const { project } = location.state as { project: Project };
  const [memberModel, setMemberModel] = useState(false);

  const handleMembers = () => {
    setMemberModel(true);
  };
  const handleCloseMemberModel = () => {
    setMemberModel(false);
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
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
              {getInitials(name)}
            </p>
            <p className="px-2.5  text-black dark:text-white">{name}</p>
          </div>
          <div className="flex justify-start items-center">
            <FontAwesomeIcon
              icon={faSync}
              className="mx-6 text-blue-500 cursor-pointer"
              onClick={() => alert(`change ${label}`)}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className="text-lg text-red-500 cursor-pointer"
              onClick={() => alert(`delete${label}`)}
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
        <p className="text-xs text-slate-700 dark:text-slate-300 ">{label}</p>
        <p className="text-black dark:text-white">{name}</p>
      </div>
    );
  };

  return (
    <>
      <div className="mx-auto">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white pb-6">
          {project.projectName}
        </h2>
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="py-6 px-7 dark:border-strokedark">
                <div className="py-2">
                  <h3 className="font-medium text-black dark:text-white">
                    Customer
                  </h3>
                  <p className="text-sm text-black dark:text-white">
                    {project.customer.name} {" ("}
                    {project.customer.email}
                    {")"}
                  </p>
                </div>
                <details className="py-2">
                  <summary className=" text-black dark:text-white">
                    Description
                  </summary>
                  <div className="bg-slate-100 dark:bg-boxdark rounded py-2 px-4">
                    <p className="dark:text-white font-semibold text-lg">
                      Project
                    </p>
                    <p className="dark:text-white pt-2">
                      1. General information:
                    </p>
                    <div className="px-2">
                      <p className="dark:text-white">Address of Speech</p>
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
                      <p className="dark:text-white">Company Background</p>
                      <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                        various
                      </p>
                      <p className="dark:text-white">Company Attributes</p>
                      <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                        me
                      </p>
                      <p className="dark:text-white">Company Services</p>
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
                      <p className="dark:text-white">Customer Interests</p>
                      <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                        me
                      </p>
                    </div>
                    <p className="dark:text-white pt-2">4. Aim of content:</p>
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
                </details>
                <div className="py-2">
                  <h2>Folder</h2>
                  <a
                    href={project.googleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline-none"
                  >
                    <FontAwesomeIcon
                      icon={faFolder}
                      className="text-blue-500"
                    />{" "}
                    {project.projectName}
                  </a>
                </div>
                <progress
                  className="custom-progress"
                  value={50}
                  max={100}
                ></progress>
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-x-4 py-2">
                  <TaskComponent label="Status" name={project.status} />
                  <TaskComponent
                    label="Tasks"
                    name={`${project.task.finalTasks}/${project.task.totalTasks}`}
                  />

                  <TaskComponent
                    label="Max Tasks"
                    name={project.task.totalTasks}
                  />
                  <TaskComponent label="Duration" name={"12"} />
                  <TaskComponent label="Task per month" name={"4"} />
                  <TaskComponent
                    label="Performance Period"
                    name={project.performancePeriod}
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
                  className="w-5 h-5 bg-blue-500 text-white  flex items-center justify-center cursor-pointer"
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
                    <p className="px-2.5  text-black dark:text-white">
                      Danile John
                    </p>
                  </div>
                </div>
                <TaskMembers label={"Texter"} name={project.worker.texter} />
                <TaskMembers label={"Lector"} name={project.worker.lector} />
                <TaskMembers label={"Seo"} name={project.worker.SEO} />
                <TaskMembers
                  label={"Meta-lector"}
                  name={project.worker.metalector}
                />
              </div>
              <div className="px-7 py-6">
                {/* <button className="w-full h-10 text-center bg-green-500 text-white rounded-none my-1.5 flex justify-center items-center">Start Text<FontAwesomeIcon icon={faPlus} className="text-sm px-2"  /></button> */}
                <button className="w-full h-10 text-center bg-blue-500 text-white rounded-none my-2 flex justify-center items-center border-none">
                  Add Text
                  <FontAwesomeIcon icon={faPlus} className="text-sm px-2" />
                </button>
                <button className="w-full h-10 text-center bg-slate-300 text-blue-500 rounded-none my-2 flex justify-center items-center border-none">
                  Edit
                  <FontAwesomeIcon icon={faEdit} className="text-sm px-2" />
                </button>
                <div className="w-full flex justify-between items-center my-1">
                  <button className="w-1/2 h-10 text-center bg-slate-300 text-blue-500 rounded-none mr-1.5 flex justify-center items-center border-none">
                    Import
                    <FontAwesomeIcon
                      icon={faDownload}
                      className="text-sm px-2"
                    />
                  </button>
                  <button className="w-1/2  h-10 text-center bg-slate-300 text-blue-500  rounded-none ml-1.5 flex justify-center items-center border-none">
                    Export
                    <FontAwesomeIcon icon={faUpload} className="text-sm px-2" />
                  </button>
                </div>
                <button className="w-full h-10 text-center bg-slate-300 text-slate-600 rounded-none my-2 flex justify-center items-center border-none">
                  Archive Project
                  <FontAwesomeIcon icon={faArchive} className="text-sm px-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <ProjectTaskTable tasks={tasksWithDetails} project={project} />
      </div>
      {memberModel && (
        <div className="w-auto fixed inset-0 flex items-center justify-center z-[9999] bg-neutral-200 dark:bg-slate dark:bg-opacity-15 bg-opacity-60 px-4">
          <div className="bg-white dark:bg-black p-6 rounded shadow-lg lg:w-6/12 xl:w-6/12 2xl:w-6/12 3xl:w-5/12 max-h-[90vh] overflow-y-auto scrollbar-hide">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold dark:text-white pr-12">Add members</h2>
              <FontAwesomeIcon
                className="cursor-pointer text-lg dark:text-white text-black pl-12"
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
                  <p className="px-2.5  text-black dark:text-white">
                    {member.name}
                  </p>
                </div>
                <p
                  className="w-5 h-5 bg-slate-200 text-white  flex items-center justify-center cursor-pointer"
                  onClick={() =>
                    alert(`added member ${member.id} ${member.name}`)
                  }
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-sm text-blue-500"
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsDetails;
