import React, { useState } from "react";
import Breadcrumb from "../../../components/breeadcrumbs/Breadcrumb";
import ToggleSwitch from "../../../components/buttons/ToggleButton";
import {
  faThLarge,
  faTrashAlt,
  faBatteryEmpty,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ProjectPaginatedTable from "../../../components/tables/ProjectPaginatedTable";
import ProjectCard from "../../../components/tables/ProjectCard";
import { allProjects } from "../../../components/Helpers/AllProjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Projects: React.FC = () => {
  const [data, setData] = useState(allProjects);
  const [showCard, setShowCard] = useState(false); // Default to false to show table initially
  const [showDraft, setShowDraft] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const handleCard = (isOn: boolean) => {
    setShowCard(isOn);
    if (isOn) {
      setShowDraft(false);
      setShowArchived(false);
    }
  };

  const handleDraft = (isOn: boolean) => {
    setShowDraft(isOn);
    if (isOn) {
      setShowCard(false);
      setShowArchived(false);
    }
  };

  const handleArchived = (isOn: boolean) => {
    setShowArchived(isOn);
    if (isOn) {
      setShowCard(false);
      setShowDraft(false);
    }
  };

  return (
    <>
      <div className="mx-auto 3xl:px-4">
        <div className="flex justify-between items-center pb-3">
          {/* <ol className="flex items-center gap-2">
            <li>
              <Link
                className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
                to="/dashboard"
              >
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-primary">Projects</li>
          </ol> */}
          <h2 className="text-title-md2 font-semibold text-black dark:text-white pt-4">
          Projects
        </h2>
          <div className="flex justify-end items-center">
            <div className="flex items-center justify-center space-x-4">
              <ToggleSwitch
                icon={faThLarge}
                isOn={showCard}
                onToggle={handleCard}
              />
              <ToggleSwitch
                icon={faBatteryEmpty}
                isOn={showDraft}
                onToggle={handleDraft}
              />
              <ToggleSwitch
                icon={faTrashAlt}
                isOn={showArchived}
                onToggle={handleArchived}
              />
              <Link
                to={""}
                className="inline-flex items-center justify-center gap-2.5 bg-boxdark py-3 text-sm xl:text-base  text-center font-medium hover:text-white text-white hover:bg-opacity-70 px-5 lg:px-8 5xl:px-10"
              >
                Create project
                <FontAwesomeIcon icon={faPlus} />
              </Link>
            </div>
          </div>
        </div>
        {/* <h2 className="text-title-md2 font-semibold text-black dark:text-white pt-4">
          Projects
        </h2> */}
        <div>
          {!showDraft &&
            !showArchived &&
            (showCard ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:grid-cols-3 5xl:grid-cols-4 4xl:px-14 pt-8">
                <ProjectCard projects={data} />
              </div>
            ) : (
              <ProjectPaginatedTable projects={data} />
            ))}
          {showDraft && <ProjectPaginatedTable projects={data} />}
          {showArchived && <ProjectPaginatedTable projects={data} />}
        </div>
      </div>
    </>
  );
};

export default Projects;
