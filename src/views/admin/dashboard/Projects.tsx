import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "../../../components/Helpers/Loading";

const Projects: React.FC = () => {
  const user = useSelector<any>((state) => state.user);
  const [data, setData] = useState(allProjects);
  const [loading, setLoading] = useState(true);
  const [showCard, setShowCard] = useState(false); // Default to false to show table initially
  const [showDraft, setShowDraft] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const [projectData, setProjectData] = useState([]);
  const [userId, setUserID] = useState(user.user.data.user._id);
  const [userToken, setUserToken] = useState(user.user.token);

  useEffect(() => {
    let token = userToken;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      userId: userId,
    };
    // "https://driptext-api.vercel.app/api/projects/detail";

    axios
      .get(`${import.meta.env.VITE_DB_URL}/admin/getProjects`)
      .then((response) => {
        const projectDataArray = response.data.projects;
        const allProjects = projectDataArray;
        setProjectData(allProjects);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project details:", err);
      });
  }, [user, userToken, userId]);

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
        <div className="flex items-center justify-end space-x-4 mb-4">
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
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Projects
          </h2>
          <Link
            to={""}
            className="inline-flex items-center justify-center gap-2.5 bg-boxdark py-3 text-sm xl:text-base  text-center font-medium hover:text-white text-white hover:bg-opacity-70 px-5 lg:px-8 5xl:px-10"
          >
            Create project
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </div>

        {/* <div className="flex justify-between items-start  pb-3 flex-col lg:flex-row xl:flex-row md:flex-row gap-4 ">
           <ol className="flex items-center gap-2">
            <li>
              <Link
                className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
                to="/dashboard"
              >
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-primary">Projects</li>
          </ol> 
        </div>
        <h2 className="text-title-md2 font-semibold text-black dark:text-white pt-4">
          Projects
        </h2>  */}
        <div>
          {!showDraft &&
            !showArchived &&
            (showCard ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:grid-cols-3 5xl:grid-cols-4 4xl:px-14 pt-8">
                <ProjectCard projects={projectData} />
              </div>
            ) : (
              <>
                {loading ? (
                  <Loading />
                ) : (
                  <ProjectPaginatedTable projects={projectData} />
                )}
              </>
            ))}
          {showDraft && <ProjectPaginatedTable projects={projectData}  />}
          {showArchived && <ProjectPaginatedTable projects={projectData} />}
        </div>
      </div>
    </>
  );
};

export default Projects;
