import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Freelancer,Project } from "../../Types/Type";

interface ProjectCardProps {
  projects: Project[];
  freelancer:Freelancer[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projects ,freelancer}) => {
  const navigate = useNavigate();

  const showAssignedRoles = (memberId: string | null) => {
    const foundFreelancer = freelancer.find((f) => f._id === memberId);
    if (foundFreelancer) {
      const fullName = `${foundFreelancer.firstName} ${foundFreelancer.lastName}`;
      return fullName;
    } else {
      return "";
    }
  };

  const getInitials = (name: string): string => {
    if (!name) return "";
    const words = name.split(" ");
    const firstTwoWords = words.slice(0, 2);
    return firstTwoWords
      .map(word => word[0].toUpperCase())
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
    localStorage.setItem("projectID", project._id);
    navigate("project-details");
  };

  const formatDate = (dateString: Date | string) => {
    const date = new Date(dateString);
    return format(date, "MMMM yyyy"); // "August 2025"
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
          <div className="flex justify-between items-center w-full">
            <h4 className="text-title-md font-bold text-black dark:text-white my-3 w-1/2">
              {project.projectName}
            </h4>
            <div className="flex justify-between items-center w-1/2">
              <WorkerComponent label="T" name={showAssignedRoles(project.texter) ?? ""} />
              <WorkerComponent label="L" name={showAssignedRoles(project.lector) ?? ""} />
              <WorkerComponent label="S" name={showAssignedRoles(project.seo) ?? ""} />
              <WorkerComponent label="M" name={showAssignedRoles(project.metaLector) ?? ""} />
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
              <span
                className={`${
                  project.projectStatus.toUpperCase() === "FINAL"
                    ? " text-success"
                    : project.projectStatus.toUpperCase() === "FREE TRIAL"
                    ? " text-warning"
                    : project.projectStatus.toUpperCase() === "READY"
                    ? " text-warning"
                    : project.projectStatus.toUpperCase() ===
                      "READY FOR PROFEADING"
                    ? " text-warning"
                    : " text-violet-500"
                }`}
              >
                {project.projectStatus.toUpperCase() === 'FREE TRIAL' ? 'Ready' : project.projectStatus}
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
                {project.plan.endDate === null
                  ? "No Subscription"
                  : `${formatDate(project.plan.endDate)}`}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProjectCard;
