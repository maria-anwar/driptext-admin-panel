import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface Plan {
  _id: string;
  plan: string;
  user: string;
  subPlan: string;
  project: string;
  subscription: string;
  startDate: string;
  endDate: string;
  totalTexts: number;
  duration: number;
  textsCount: number;
  textsRemaining: number;
  tasksPerMonth: number;
  tasksPerMonthCount: number;
  endMonthDate: string;
  isActive: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Define the Project interface to represent the main object
interface Project {
  _id: string;
  projectId: string;
  onBoarding: boolean;
  projectName: string;
  tasks: number;
  speech: string;
  keywords: string | null;
  perspective: string | null;
  projectStatus: string;
  user: string;
  projectTasks: string[];
  plan: Plan;
  texter: string | null;
  lector: string | null;
  seo: string | null;
  metaLector: string | null;
  isActive: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
  openTasks: number;
  finalTasks: number;
}
interface ProjectCardProps {
  projects: Project[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projects }) => {
  const navigate = useNavigate();
  const getInitials = (name: string): string => {
    if (!name) return "";
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
      <div className="text-black dark:text-white px-1">
        <p className="dark:text-white text-black text-xs text-center py-1">
          {label}
        </p>
        <p className="text-black w-6 h-6  dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs px-1 py-1 flex justify-center items-center">
          {getInitials(name)}
        </p>
      </div>
    );
  };

  const handleProject = (project: Project) => {
    localStorage.setItem('projectID',project._id);
    navigate("project-details");
  };

  const formatDate = (dateString: Date | string) => {
    const date = new Date(dateString);
    return format(date, "MMM dd, yyyy"); // "August 2025"
  };

  return (
    <>
      {projects.map((project) => (
        <div
          onClick={() => handleProject(project)}
          key={project._id}
          className={
            "relative rounded-sm border border-stroke bg-white py-6 px-5 shadow-default dark:border-strokedark dark:bg-boxdark cursor-pointer"
          }
        >
          <div className="flex justify-between items-center">
            <h4 className="text-title-md font-bold text-black dark:text-white my-3">
              {project.projectName}
            </h4>
            {/* {!project.texter?.trim() &&
            !project.lector?.trim() &&
            !project.seo?.trim() &&
            !project.metaLector?.trim() ? (
              <p>Not assigned</p>
            ) : ( */}
              <div className="flex justify-between items-center">
                <WorkerComponent label="T" name={project.texter ?? ""} />
                <WorkerComponent label="L" name={project.lector ?? ""} />
                <WorkerComponent label="S" name={project.seo ?? ""} />
                <WorkerComponent label="M" name={project.metaLector ?? ""} />
              </div>
          
          </div>

          <div className="h-3 bg-gray-200 rounded py-6">
            <progress
              className="custom-progress"
              value={project.finalTasks}
              max={project.plan.totalTexts}
            ></progress>
            <p className="py-2 uppercase">
              STATUS:{" "}
              <span className={`$${
                            project.projectStatus.toUpperCase() === "FINAL"
                              ? " text-success"
                              : project.projectStatus.toUpperCase() === "FREE TRIAL"
                              ? " text-danger"
                              : project.projectStatus.toUpperCase() === "READY"
                              ? " text-warning"
                              : project.projectStatus.toUpperCase() === "READY FOR PROFEADING"
                              ? " text-warning"
                              : " text-violet-500"
                          }`}>
                {project.projectStatus}
              </span>
            </p>
          </div>

          <div className="mt-3 mb-3 flex items-end justify-between pt-8">
            <div className="text-sm font-medium text-dark-gray">
              Manager <div className="text-meta-5">David Warner</div>
            </div>
            <div className="text-sm font-medium text-dark-gray">
              Created on
              <div className="text-meta-3 flex justify-end">
                {formatDate(project.createdAt)}
              </div>
            </div>
          </div>
          <div className="mt-8 mb-3 flex items-end justify-between">
            <div className="text-sm font-medium text-dark-gray">
              Tasks
              <div className="text-meta-5 flex justify-end flex-col">
                {project.plan.textsCount}/{project.plan.totalTexts}
              </div>
            </div>
            <div className="text-sm font-medium text-dark-gray">
              Performance Period{" "}
              <div className="text-meta-5 flex justify-end">
                {project.plan.endDate === null ? "No Subscription" :   `${formatDate(project.plan.endDate)}`}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProjectCard;
