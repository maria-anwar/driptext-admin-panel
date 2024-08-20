import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Task {
    totalTasks: number;
    usedTasks: number;
    openTasks: number;
    finalTasks: number;
  }
  
  interface Worker {
    texter: string;
    lector: string;
    SEO: string;
    metalector: string;
  }
  
  interface Project {
    status: string;
    googleLink: string;
    stripeLink: {
      domain: string;
      subdomain: string;
    };
    onboarding: string;
    performancePeriod: string;
  
    task: Task;
    worker: Worker;
    created:string;
  }
  
  interface ProjectCardProps {
    projects: Project[];
  }
  

const ProjectCard: React.FC<ProjectCardProps> = ({ projects }) => {
  const navigate = useNavigate();
  const getInitials = (name: string): string => {
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
      navigate('project-details', { state: { project: project } });

    };
  return (
    <>
      {projects.map((project) => (
        <div
        onClick={()=>handleProject(project)}
          key={project.status}
          className={
            "relative rounded-sm border border-stroke bg-white py-6 px-5 shadow-default dark:border-strokedark dark:bg-boxdark cursor-pointer"
          }
        >
          <div className="flex justify-between items-center">
            <h4 className="text-title-md font-bold text-black dark:text-white my-3">
              {project.status}
            </h4>
            <div className="flex justify-between items-center">
              <WorkerComponent label="T" name={project.worker.texter} />
              <WorkerComponent label="L" name={project.worker.lector} />
              <WorkerComponent label="S" name={project.worker.SEO} />
              <WorkerComponent label="M" name={project.worker.metalector} />
            </div>
          </div>

          <div className="h-3 bg-gray-200 rounded py-6">
            <progress
              className=" w-full h-3 bg-gray-200 rounded-full "
              value={project.task.finalTasks}
              max={project.task.totalTasks}
            ></progress>
            <p>STATUS: <span className="text-blue-500">OPEN</span></p>
          </div>

          <div className="mt-3 mb-3 flex items-end justify-between pt-8">
            <div className="text-sm font-medium text-dark-gray">
              Manager <div className="text-meta-5">David Warner</div>
            </div>
            <div className="text-sm font-medium text-dark-gray">
              Created on
              <div className="text-meta-3 flex justify-end">{project.created}</div>
            </div>
          </div>
          <div className="mt-8 mb-3 flex items-end justify-between">
            <div className="text-sm font-medium text-dark-gray">
              Tasks
              <div className="text-meta-5 flex justify-end flex-col">
                      {project.task.finalTasks}/{project.task.totalTasks}
              </div>
            </div>
            <div className="text-sm font-medium text-dark-gray">
              Performance Period{" "}
              <div className="text-meta-5 flex justify-end">
                {project.performancePeriod}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProjectCard;
