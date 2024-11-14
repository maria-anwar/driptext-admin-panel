import React, { useEffect, useMemo, useState } from "react";
import ToggleSwitch from "../../../components/buttons/ToggleButton";
import {
  faThLarge,
  faTrashAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ProjectPaginatedTable from "../../../components/tables/ProjectPaginatedTable";
import ProjectCard from "../../../components/tables/ProjectCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import axios from "axios";
import { Freelancer, Project } from "../../../Types/Type";
import { debounce } from "lodash";
import useTitle from "../../../hooks/useTitle";
import { useTranslation } from "react-i18next";

const Projects: React.FC = () => {
  const { t } = useTranslation();
  useTitle(t("projects.overview"));

  const user = useSelector<any>((state) => state.user);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [showDraft, setShowDraft] = useState<boolean>(false);
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [freelancer, setFreelancer] = useState<Freelancer[]>([]);

  useEffect(() => {
    getFreelancerData();
    getProjects();
  }, []);

  const getProjects = async () => {
    let token = user?.user?.token;
    axios.defaults.headers.common["access-token"] = token;
    await axios
      .get(`${import.meta.env.VITE_DB_URL}/admin/getProjects`)
      .then((response) => {
        const projectDataArray = response.data.projects;
        setProjectData(() => {
          setFilteredProjects(projectDataArray);
          return projectDataArray;
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project details:", err);
      });
  };

  const getFreelancerData = async () => {
    let token = user?.user?.token;
    axios.defaults.headers.common["access-token"] = token;
    await axios
      .get(`${import.meta.env.VITE_DB_URL}/admin/getFreelancers`)
      .then((response) => {
        const projectDataArray = response.data.freelancers;
        const allProjects = projectDataArray;
        setFreelancer(allProjects);
      })
      .catch((err) => {
        console.error("Error fetching freelancer details:", err);
      });
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        const filtered = projectData.filter((project) =>
          project?.projectName?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProjects(filtered);
      }, 300),
    [projectData]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery]);

  const handleCard = (isOn: boolean) => {
    setShowCard(isOn);
    if (isOn) {
      setShowDraft(false);
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

  const handleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="mx-auto 3xl:px-4">
        <div className="flex items-center justify-between space-x-4 mb-6 mt-2">
          <ol className="flex items-center gap-2 text-left">
            <li>
              <Link
                className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
                to="/dashboard"
              >
                {t("projects.dashboard")}
              </Link>
            </li>
            <li className="font-medium text-primary">
              {t("projects.projects")}
            </li>
          </ol>
          <div className="gap-4 flex items-center">
            <ToggleSwitch
              icon={faThLarge}
              isOn={showCard}
              onToggle={handleCard}
              hoverText={
                showCard ? t("projects.cardView") : t("projects.tableView")
              }
            />
            <ToggleSwitch
              icon={faTrashAlt}
              isOn={showArchived}
              onToggle={handleArchived}
              hoverText={
                showArchived ? t("projects.archived") : t("projects.active")
              }
            />
          </div>
        </div>
        <div className="flex justify-between items-center pb-2 lg:pb-0 xl:items-center">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white pb-2 lg:pb-0">
            {t("projects.projects")}
          </h2>
          <div className="flex items-center mb-2 lg:mb-0 xl:mb-0 lg:pl-12 xl:pl-12">
            {showSearch && (
              <input
                type="text"
                placeholder="Search by domain"
                value={searchQuery}
                onChange={handleSearchChange}
                className="rounded ring-1 outline-none py-1 px-4 ring-slate-200 bg-slate-0 dark:bg-transparent w-45 lg:w-60 xl:w-80"
              />
            )}
            <div className="relative group">
              <div
                onClick={handleSearch}
                className="h-8 w-8 ring-1 my-2 flex justify-center items-center cursor-pointer rounded ml-2 ring-slate-300 bg-slate-100 dark:bg-transparent"
              >
                <FontAwesomeIcon icon={faSearch} />
              </div>

              {/* Tooltip */}
              <div className="z-99999 shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-5 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {t("projects.search")}
              </div>
            </div>
          </div>
        </div>

        <div>
          {!showArchived &&
            (showCard ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:grid-cols-3 5xl:grid-cols-4 4xl:px-14 pt-8">
                <ProjectCard
                  projects={filteredProjects.filter(
                    (project) => project?.isActive !== "N"
                  )}
                  freelancer={freelancer}
                />
              </div>
            ) : (
              <>
                {loading ? (
                  <div className="rounded-sm border border-stroke pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-10 w-full bg-slate-200 h-[300px] animate-pulse"></div>
                ) : (
                  <ProjectPaginatedTable
                    projects={filteredProjects.filter(
                      (project) => project?.isActive !== "N"
                    )}
                    freelancer={freelancer}
                  />
                )}
              </>
            ))}
          {showArchived && (
            <ProjectPaginatedTable
              handleRefreshData={getProjects}
              projects={filteredProjects.filter(
                (project) => project?.isActive !== "Y"
              )}
              freelancer={freelancer}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
