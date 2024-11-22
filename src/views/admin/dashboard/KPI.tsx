import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import KpiCard from "../../../components/tables/KpiCard";
import KpiTable from "../../../components/tables/KpiTable";
import useTitle from "../../../hooks/useTitle";
import { DatePicker, Select } from "antd";
import moment, { Moment } from "moment";
const { RangePicker } = DatePicker;
import { Project } from "../../../Types/Type";

const KPI: React.FC = () => {
  useTitle("KPIs Overview");
  const user = useSelector<any>((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateRangeFilter, setDateRangeFilter] = useState<
    [Moment, Moment] | null
  >(null);
  const [monthFilter, setMonthFilter] = useState<string | null>(null);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState<boolean>(false);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const [texter, setTexter] = useState(0);
  const [lector, setLector] = useState(0);
  const [seo, setSeo] = useState(0);
  const [meta, setMeta] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [income, setIncome] = useState(0);
  const [margin, setMargin] = useState(0);

  useEffect(() => {
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

  const getProjects = async () => {
    let token = user?.user?.token;
    axios.defaults.headers.common["access-token"] = token;
    await axios
      .get(`${import.meta.env.VITE_DB_URL}/admin/getProjects`)
      .then((response) => {
        const projectDataArray = response.data.projects;
        setProjectData(() => {
          setFilteredProjects(projectDataArray);
          console.log(projectDataArray);
          return projectDataArray;
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project details:", err);
      });
  };
  const clearFilters = () => {
    setStatusFilter(null);
    setDateRangeFilter(null);
    setMonthFilter(null);
    setRoleFilter(null);
    setFilteredTasks(tasks);
    setFilterDropdownOpen(false);
  };

  const applyFilters = () => {
    let filtered = [...tasks];

    if (statusFilter) {
      filtered = filtered.filter(
        (task) => task.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (dateRangeFilter && dateRangeFilter.length === 2) {
      const startDate = new Date(dateRangeFilter[0]);
      const endDate = new Date(dateRangeFilter[1]);
      endDate.setHours(23, 59, 59, 999);

      filtered = filtered.filter((task) => {
        const taskDate = new Date(task.dueDate);

        if (isNaN(taskDate.getTime())) {
          console.warn(`Invalid task date: ${task.dueDate}`);
          return false;
        }
        return taskDate >= startDate && taskDate <= endDate;
      });
    }

    setFilteredTasks(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [statusFilter, dateRangeFilter, monthFilter, roleFilter, tasks]);

  console.log("users", users);
  return (
    <div className="mx-auto 3xl:px-4">
      <div className="flex items-center justify-between space-x-4 mb-6 mt-2">
        <ol className="  flex items-center gap-2 text-left">
          <li>
            <Link
              className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
              to="/dashboard"
            >
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary">KPIs</li>
        </ol>
      </div>
      <div className="flex justify-between items-center relative">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white pb-2 lg:pb-0">
          KPIs
        </h2>
        <div>
          <button
            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
            className="inline-flex items-center cursor-pointer justify-center gap-2.5 bg-black py-3 text-sm xl:text-base text-center font-medium text-white hover:bg-opacity-90 px-5"
          >
            <span>Filter</span>
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
            <div className="absolute right-0 mt-2 bg-white dark:bg-boxdark  p-4 shadow-md rounded w-full md:w-1/2 lg:w-2/3 xl:w-100 z-50 border-1">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Date Range
                </label>
                <RangePicker
                  onChange={(dates, dateStrings) => {
                    setDateRangeFilter(dates ? [dates[0], dates[1]] : null);
                  }}
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Select Project
                </label>
                <Select
                  placeholder={"Select Project"}
                  onChange={(value) => setMonthFilter(value)}
                  allowClear
                  className="w-full"
                  value={monthFilter}
                >
                  {projectData.map((project) => (
                    <Select.Option key={project._id} value={project._id}>
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
                  Clear filters
                </button>
                <button
                  onClick={() => setFilterDropdownOpen(false)}
                  className="px-2 py-2 text-md bg-green-500 text-white rounded cursor-pointer"
                >
                  Apply filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
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
            income={income}
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
