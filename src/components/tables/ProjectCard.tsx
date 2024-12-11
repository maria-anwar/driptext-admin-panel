import React from "react";
import { useNavigate } from "react-router-dom";
import { Freelancer, Project } from "../../Types/Type";
import getInitials from "../Helpers/UpperCaseName";
import formatDate from "../Helpers/DateFormat";
import { useTranslation } from "react-i18next";

interface ProjectCardProps {
  projects: Project[];
  freelancer: Freelancer[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projects, freelancer }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const showAssignedRoles = (memberId: string | null) => {
    const foundFreelancer = freelancer.find((f) => f._id === memberId);
    if (foundFreelancer) {
      const fullName = `${foundFreelancer.firstName} ${foundFreelancer.lastName}`;
      return fullName;
    } else {
      return "";
    }
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
        <p className="text-black uppercase w-7 h-7 text-center dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs  flex justify-center items-center">
        {getInitials(name)}
        </p>
      </div>
    );
  };

  const handleProject = (project: Project) => {
    localStorage.setItem("projectID", project._id);
    navigate("project-details");
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
          <h4 className="text-title-md font-bold text-black dark:text-white mb-2 ">
            {project.projectName}
          </h4>
          <div className="flex justify-between items-center w-1/2 ">
            <WorkerComponent
              label="T"
              name={showAssignedRoles(project.texter) ?? ""}
            />
            <WorkerComponent
              label="L"
              name={showAssignedRoles(project.lector) ?? ""}
            />
            <WorkerComponent
              label="S"
              name={showAssignedRoles(project.seo) ?? ""}
            />
            <WorkerComponent
              label="M"
              name={showAssignedRoles(project.metaLector) ?? ""}
            />
          </div>
          <div className="h-3 bg-gray-200 rounded py-4">
            <progress
              className="custom-progress"
              value={project.finalTasks}
              max={project.plan.totalTexts}
            ></progress>
            <p className="py-0 uppercase">
              STATUS:{" "}
              <span
                className={`${
                  project.projectStatus.toUpperCase() === "FINAL"
                    ? " text-green-500"
                    : project.projectStatus.toUpperCase() === "FREE TRIAL"
                    ? " text-yellow-500"
                    : project.projectStatus.toUpperCase() === "READY"
                    ? " text-yellow-500"
                    : project.projectStatus.toUpperCase() === "IN PROGRESS"
                    ? " text-blue-500"
                    : project.projectStatus.toUpperCase() ===
                      "READY FOR PROOFREADING"
                    ? " text-orange-500"
                    : project.projectStatus.toUpperCase() ===
                      "PROOFREADING IN PROGRESS"
                    ? " text-purple-500"
                    : project.projectStatus.toUpperCase() ===
                      "READY FOR SEO OPTIMIZATION"
                    ? " text-indigo-500"
                    : project.projectStatus.toUpperCase() ===
                      "SEO OPTIMIZATION IN PROGRESS"
                    ? " text-pink-500"
                    : " text-violet-500"
                }`}
              >
                {project.projectStatus.toUpperCase() === "FREE TRIAL"
                  ? "Ready"
                  : project.projectStatus.toUpperCase() === "NOT INITALIZED"
                  ? "Wating for onboarding"
                  : project.projectStatus}
              </span>
            </p>
          </div>

          <div className="mt-5 mb-3 flex items-end justify-between pt-8">
            <div className="text-sm font-medium text-dark-gray"></div>
            <div className="text-sm font-medium text-dark-gray">
             {t("projects.createdOn")}
              <div className="text-meta-3 flex justify-end">
                {formatDate(project.createdAt)}
              </div>
            </div>
          </div>
          <div className="mt-5 mb-3 flex items-end justify-between">
            <div className="text-sm font-medium text-dark-gray">
            {t("projects.tasks")}
              <div className="text-meta-5 flex justify-end flex-col">
                {project.plan.textsCount}/{project.plan.totalTexts}
              </div>
            </div>
            <div className="text-sm font-medium text-dark-gray">
            {t("projects.performancePeriod")}{" "}
              <div
                className={`flex  justify-end text-meta-5 rounded-full text-center py-1 px-1 text-sm ${
                  project.plan.endDate === null ? "text-red-500" : "text-meta-5"
                }`}
              >
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
