import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Freelancer } from "../../../Types/Type";
import TaskTable from "../../../components/tables/TaskTable";
import { DatePicker, Select } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const Tasks: React.FC = () => {
  const user = useSelector<any>((state) => state.user);
  const [loading, setLoading] = useState<boolean>(true);
  const [freelancer, setFreelancer] = useState<Freelancer[]>([]);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // State for filters
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateRangeFilter, setDateRangeFilter] = useState<
    [moment.Moment, moment.Moment] | null
  >(null);
  const [monthFilter, setMonthFilter] = useState<string | null>(null);

  // Dropdown toggle state
  const [filterDropdownOpen, setFilterDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    getTaskData();
    getFreelancerData();
  }, [user]);

  // Fetching task data
  const getTaskData = async () => {
    let token = user?.user?.token;
    axios.defaults.headers.common["access-token"] = token;
    await axios
      .get(`${import.meta.env.VITE_DB_URL}/admin/getAllTasks`)
      .then((response) => {
        setTasks(response.data.data);
        setFilteredTasks(response.data.data); // Initialize filtered tasks
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project details:", err);
        setLoading(false);
      });
  };

  // Fetching freelancer data
  const getFreelancerData = async () => {
    let token = user?.user?.token;
    axios.defaults.headers.common["access-token"] = token;
    await axios
      .get(`${import.meta.env.VITE_DB_URL}/admin/getFreelancers`)
      .then((response) => {
        setFreelancer(response.data.freelancers);
      })
      .catch((err) => {
        console.error("Error fetching project details:", err);
      });
  };

  const clearFilters = () => {
    setStatusFilter(null);
    setDateRangeFilter(null);
    setMonthFilter(null);
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

    if (dateRangeFilter) {
      filtered = filtered.filter((task) => {
        const taskDate = moment(task.dueDate);
        return taskDate.isBetween(
          dateRangeFilter[0],
          dateRangeFilter[1],
          "days",
          "[]"
        );
      });
    }

    if (monthFilter) {
      filtered = filtered.filter((task) => {
        const taskDate = moment(task.dueDate);
        return taskDate.format("MMMM") === monthFilter;
      });
    }

    setFilteredTasks(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [statusFilter, dateRangeFilter, monthFilter, tasks]);

  return (
    <div className="mx-auto 3xl:px-4">
      <div className="flex items-center justify-between space-x-4 mb-6 mt-2">
        <ol className="flex items-center gap-2 text-left">
          <li>
            <Link
              className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
              to="/dashboard"
            >
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary">Tasks</li>
        </ol>
      </div>
      <div className="flex justify-between items-center relative">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white pb-2 lg:pb-0">
          Tasks
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
            <div className="absolute right-0 mt-2 bg-white dark:bg-boxdark  p-4 shadow-md rounded w-full md:w-1/2 lg:w-1/3 z-50 border-1">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Status</label>
                <Select
                  placeholder="Select Status"
                  onChange={(value) => setStatusFilter(value)}
                  allowClear
                  className="w-full"
                  value={statusFilter}
                >
                  <Select.Option value="ready to work">
                    Ready to Work
                  </Select.Option>
                  <Select.Option value="in progress">In Progress</Select.Option>
                  <Select.Option value="in rivision">In Rivision</Select.Option>
                  <Select.Option value="ready for proofreadng">
                    Ready for Proofreadng
                  </Select.Option>
                  <Select.Option value="proofreading in progress">
                    Proofreading in Progress
                  </Select.Option>
                  <Select.Option value="ready for seo optimzation">
                    Ready for SEO Optimzation
                  </Select.Option>
                  <Select.Option value="seo optimzation in progress">
                    SEO Optimzation in Progress
                  </Select.Option>
                  <Select.Option value="final">Final</Select.Option>
                </Select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Date Range
                </label>
                <RangePicker
                  onChange={(dates) =>
                    setDateRangeFilter(dates ? [dates[0], dates[1]] : null)
                  }
                  className="w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Month</label>
                <Select
                  placeholder="Select Month"
                  onChange={(value) => setMonthFilter(value)}
                  allowClear
                  className="w-full"
                  value={monthFilter}
                >
                  {moment.months().map((month) => (
                    <Select.Option key={month} value={month}>
                      {month}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className="flex gap-x-2">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setFilterDropdownOpen(false)}
                  className="px-4 py-2 bg-green-500 text-white rounded  cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <div className="mt-4 rounded-sm border border-stroke pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 w-full bg-slate-200 h-[350px] animate-pulse"></div>
      ) : (
        <TaskTable tasks={filteredTasks} freelancer={freelancer} />
      )}
    </div>
  );
};

export default Tasks;
