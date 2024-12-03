import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import KpiCard from "../../../components/tables/KpiCard";
import KpiTable from "../../../components/tables/KpiTable";
import useTitle from "../../../hooks/useTitle";
import { Select } from "antd";
import { Project } from "../../../Types/Type";
import { useTranslation } from "react-i18next";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { set } from "lodash";

const KPI: React.FC = () => {
  const { t } = useTranslation();
  useTitle(t("kpi.pagetitle"));
  const user = useSelector<any>((state) => state.user);
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateRangeFilter, setDateRangeFilter] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [projectCostFilter, setProjectCostFilter] = useState<string | null>(
    "all"
  );
  const [filterDropdownOpen, setFilterDropdownOpen] = useState<boolean>(false);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [texter, setTexter] = useState(0);
  const [lector, setLector] = useState(0);
  const [seo, setSeo] = useState(0);
  const [meta, setMeta] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [margin, setMargin] = useState(0);

  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);
  const dropdownRefRange = useRef<HTMLDivElement | null>(null);
  const [projectsName, setProjectsName] = useState<string>("All Projects");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRefRange.current &&
        !dropdownRefRange.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getTaskCost();
    getTaskData();
    getProjects();
  }, [user]);

  const getTaskData = async () => {
    setLoading(true);
    let token = user?.user?.token;
    axios.defaults.headers.common["access-token"] = token;
    await axios
      .get(`${import.meta.env.VITE_DB_URL}/admin/getAllClients`)
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project details:", err);
        setLoading(false);
      });
  };

  const getTaskCost = async () => {
    setIsPickerOpen(false);
    setFilterDropdownOpen(false);
    setLoading(true);
    let token = user?.user?.token;
    axios.defaults.headers.common["access-token"] = token;
    await axios
      .get(`${import.meta.env.VITE_DB_URL}/admin/getAllTasksCost`)
      .then((response) => {
        const tasksCostData = response?.data?.data;
        setTexter(tasksCostData?.texterCost);
        setLector(tasksCostData?.lectorCost);
        setSeo(tasksCostData?.seoCost);
        setMeta(tasksCostData?.metaLectorCost);
        setTotalCost(tasksCostData?.totalCost);
        setRevenue(tasksCostData?.totalRevenue);
        setMargin(tasksCostData?.totalMargin);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project details:", err);
        setLoading(false);
      });
  };

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

  const handleTogglePicker = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  const clearFilters = () => {
    setStatusFilter(null);
    setDateRangeFilter([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    setProjectCostFilter("all");
    setRoleFilter(null);
    setFilteredTasks(tasks);
    setFilterDropdownOpen(false);
    setProjectsName("All Projects");
    getTaskCost();
  };

  const applyFilters = async () => {
    if (projectCostFilter !== "all" && projectCostFilter !== null) {
      setLoading(true);
      let token = user?.user?.token;
      axios.defaults.headers.common["access-token"] = token;
      let payLoad = {
        projectId: projectCostFilter,
      };
      await axios
        .post(
          `${import.meta.env.VITE_DB_URL}/admin/getProjectTaskCost`,
          payLoad
        )
        .then((response) => {
          setFilterDropdownOpen(false);
          const tasksCostData = response?.data?.data;
          setTexter(tasksCostData?.texterCost);
          setLector(tasksCostData?.lectorCost);
          setSeo(tasksCostData?.seoCost);
          setMeta(tasksCostData?.metaLectorCost);
          setTotalCost(tasksCostData?.totalCost);
          setRevenue(tasksCostData?.totalRevenue);
          setMargin(tasksCostData?.totalMargin);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching project details:", err);
          setLoading(false);
          setFilterDropdownOpen(false);
        });
    } else {
      getTaskCost();
    }
  };

  useEffect(() => {
    applyFilters();
  }, [projectCostFilter]);

  const handleDateChange = (ranges) => {
    const newRanges = ranges.selection;
    setDateRangeFilter([newRanges]);
  };

  const applyDateRangeCost = async () => {
    if (dateRangeFilter && dateRangeFilter.length === 1) {
      const startDate = new Date(
        dateRangeFilter[0].startDate
      ).toLocaleDateString();
      const endDate = new Date(dateRangeFilter[0].endDate).toLocaleDateString();

      setIsPickerOpen(false);
      setFilterDropdownOpen(false);
      setLoading(true);
      let token = user?.user?.token;
      axios.defaults.headers.common["access-token"] = token;
      const payLoad = {
        startDate,
        endDate,
      };
      console.log(payLoad);

      await axios
        .post(
          `${import.meta.env.VITE_DB_URL}/admin/getTasksCostDateFilter`,
          payLoad
        )
        .then((response) => {
          console.log("date range call");
          const tasksCostData = response?.data?.data;
          setTexter(tasksCostData?.texterCost);
          setLector(tasksCostData?.lectorCost);
          setSeo(tasksCostData?.seoCost);
          setMeta(tasksCostData?.metaLectorCost);
          setTotalCost(tasksCostData?.totalCost);
          setRevenue(tasksCostData?.totalRevenue);
          setMargin(tasksCostData?.totalMargin);

          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching project details:", err);
          setLoading(false);
        });
    } else {
      getTaskCost();
    }
  };

  return (
    <div className="mx-auto 3xl:px-4">
      <div className="flex items-center justify-between space-x-4 mb-6 mt-2">
        <ol className="  flex items-center gap-2 text-left">
          <li>
            <Link
              className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
              to="/dashboard"
            >
              {t("kpi.breadcrumbs.dashboard")}
            </Link>
          </li>
          <li className="font-medium text-primary">
            {t("kpi.breadcrumbs.kpi")}
          </li>
        </ol>
      </div>
      <div className="flex justify-between items-center relative">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white pb-2 lg:pb-0">
          {t("kpi.breadcrumbs.kpi")}
        </h2>

        <div>
          <button
            ref={dropdownButtonRef}
            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
            className="inline-flex items-center cursor-pointer justify-center gap-2.5 bg-black py-3 text-sm xl:text-base text-center font-medium text-white hover:bg-opacity-90 px-5"
          >
            <span>{t("kpi.filters.filter")}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
                fill="white"
              />
            </svg>
          </button>

          {filterDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 bg-white dark:bg-boxdark p-4 shadow-md rounded w-full md:w-1/2 lg:w-2/3 xl:w-100 z-50 border-1"
            >
              <div className="mb-4 relative">
                <label className="block text-sm font-medium mb-2">
                  {/* Assuming you are using the `t` function for translations */}
                  {t("kpi.filters.dateRange")}
                </label>

                <button
                  onClick={handleTogglePicker}
                  className="text-sm text-left text-black bg-white border px-2 py-1 rounded-md w-full"
                >
                  {dateRangeFilter.length
                    ? `${new Date(
                        dateRangeFilter[0].startDate
                      ).toLocaleDateString()} - ${new Date(
                        dateRangeFilter[0].endDate
                      ).toLocaleDateString()}`
                    : "Select date range"}
                </button>

                {/* Conditional rendering of the DateRangePicker */}
                {isPickerOpen && (
                  <div
                    className="absolute top-full xl:-left-[530px] mt-2 w-full xl:w-[960px] max-w-screen-xl z-[99999999] mx-auto p-2 bg-white shadow-lg border rounded-lg overflow-auto"
                    ref={dropdownRefRange}
                  >
                    <DateRangePicker
                      ranges={
                        dateRangeFilter.length
                          ? dateRangeFilter
                          : [
                              {
                                startDate: new Date(),
                                endDate: new Date(),
                                key: "selection",
                              },
                            ]
                      } // Pass the entire array of ranges
                      onChange={handleDateChange}
                      months={2}
                      direction="horizontal"
                      moveRangeOnFirstSelection={false}
                      editableDateInputs={true}
                      showMonthAndYearPickers={false}
                    />

                    {/* Add a button below the DateRangePicker */}
                    <div className="mt-4 text-right ">
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition mr-2"
                        onClick={getTaskCost} // Call API when button is clicked
                      >
                        Clear Date Range
                      </button>
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        onClick={applyDateRangeCost} // Call API when button is clicked
                      >
                        Apply Date Range
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t("kpi.filters.selectProject")}
                </label>
                <Select
                  placeholder={t("kpi.filters.selectProject")}
                  onChange={(value, option) => {
                    setProjectCostFilter(value);
                    setProjectsName(option.label);
                  }}
                  allowClear={false}
                  className="w-full"
                  value={projectsName || projectCostFilter}
                >
                  <Select.Option value="all">All Projects</Select.Option>
                  {projectData.map((project) => (
                    <Select.Option
                      key={project._id}
                      value={project._id}
                      label={`${project.projectName} | ${project.projectId}`}
                    >
                      {`${project.projectName} | ${project.projectId}`}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className="flex gap-x-2">
                <button
                  onClick={clearFilters}
                  className="px-2 text-md py-2 bg-red-500 text-white rounded cursor-pointer"
                >
                  {t("kpi.filters.clearFilters")}
                </button>
                <button
                  onClick={() => setFilterDropdownOpen(false)}
                  className="px-2 py-2 text-md bg-green-500 text-white rounded cursor-pointer"
                >
                  {t("kpi.filters.applyFilters")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="text-base font-semibold text-black dark:text-white pb-2 lg:pb-0">{projectsName}</p>
      {loading ? (
        <div className="mt-4 rounded-sm border border-stroke pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 w-full bg-slate-200 h-[600px] animate-pulse"></div>
      ) : (
        <>
          <KpiCard
            texter={texter}
            lector={lector}
            seo={seo}
            meta={meta}
            totalCost={totalCost}
            revenue={revenue}
            margin={margin}
          />
          <div className="pt-8" />
          <KpiTable users={users} />
        </>
      )}
    </div>
  );
};

export default KPI;
