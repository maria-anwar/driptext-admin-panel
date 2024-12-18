import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Freelancer, Task } from "../../../Types/Type";
import TaskTable from "../../../components/tables/TaskTable";
import { DatePicker, Select } from "antd";
import moment, { Moment } from "moment";
import useTitle from "../../../hooks/useTitle";
import { useTranslation } from "react-i18next";
const { RangePicker } = DatePicker;

const Tasks: React.FC = () => {
  const { t } = useTranslation();
  useTitle(t("overviewtask")); // Translated title
  const user = useSelector<any>((state) => state.user);
  const [loading, setLoading] = useState<boolean>(true);
  const [freelancer, setFreelancer] = useState<Freelancer[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateRangeFilter, setDateRangeFilter] = useState<
    [Moment, Moment] | null
  >(null);
  const [monthFilter, setMonthFilter] = useState<string | null>(null);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState<boolean>(false);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);

  useEffect(() => {
    getTaskData();
    getFreelancerData();
  }, [user]);

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

    if (monthFilter) {
      filtered = filtered.filter((task) => {
        const taskDate = moment(task.dueDate);
        return (
          taskDate.format("MMMM").toLowerCase() === monthFilter.toLowerCase()
        );
      });
    }

    if (roleFilter) {
      switch (roleFilter) {
        case "texter":
          filtered = filtered.filter((task) =>
            [
              "ready to work",
              "in progress",
              "ready for rivision (lector)",
              "in rivision (lector)",
              "ready for rivision (meta lector)",
              "in rivision (meta lector)",
            ].includes(task.status.toLowerCase())
          );
          break;
        case "lector":
          filtered = filtered.filter((task) =>
            ["ready for proofreading", "proofreading in progress"].includes(
              task.status.toLowerCase()
            )
          );
          break;
        case "SEO":
          filtered = filtered.filter((task) =>
            [
              "ready for seo optimization",
              "seo optimization in progress",
            ].includes(task.status.toLowerCase())
          );
          break;
        case "meta lector":
          filtered = filtered.filter((task) =>
            [
              "ready for second proofreading",
              "second proofreading in progress",
            ].includes(task.status.toLowerCase())
          );
          break;
        default:
          break;
      }
    }

    setFilteredTasks(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [statusFilter, dateRangeFilter, monthFilter, roleFilter, tasks]);

  return (
    <div className="mx-auto 3xl:px-4">
      <div className="flex items-center justify-between space-x-4 mb-6 mt-2">
        <ol className="flex items-center gap-2 text-left">
          <li>
            <Link
              className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
              to="/dashboard"
            >
              {t("breadcrumb.dashboard")}
            </Link>
          </li>
          <li className="font-medium text-primary">{t("breadcrumb.tasks")}</li>
        </ol>
      </div>
      <div className="flex justify-between items-center relative">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white pb-2 lg:pb-0">
          {t("heading")}
        </h2>
        <div>
          <button
            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
            className="inline-flex items-center cursor-pointer justify-center gap-2.5 bg-black py-3 text-sm xl:text-base text-center font-medium text-white hover:bg-opacity-90 px-5"
          >
            <span>{t("filters.button")}</span>
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
            <div className="absolute  right-0 mt-2 bg-white dark:bg-boxdark  p-4 shadow-md rounded w-full md:w-1/2 lg:w-2/3 xl:w-100 z-50 border-1">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t("filters.status.label")}
                </label>
                <Select
                  placeholder={t("filters.status.label")}
                  onChange={(value) => setStatusFilter(value)}
                  className="w-full"
                  value={statusFilter}
                >
                  <Select.Option value="ready to work">
                    {t("filters.status.options.readyToWork")}
                  </Select.Option>
                  <Select.Option value="in progress">
                    {t("filters.status.options.inProgress")}
                  </Select.Option>
                  <Select.Option value="ready for rivision (lector)">
                    {t("filters.status.options.readyForRivisionLector")}
                  </Select.Option>
                  <Select.Option value="in rivision (lector)">
                    {t("filters.status.options.inRivisionLector")}
                  </Select.Option>
                  <Select.Option value="ready for rivision (meta lector)">
                    {t("filters.status.options.readyForRivisionMetaLector")}
                  </Select.Option>
                  <Select.Option value="in rivision (meta lector)">
                    {t("filters.status.options.inRivisionMetaLector")}
                  </Select.Option>
                  <Select.Option value="ready for proofreading">
                    {t("filters.status.options.readyForProofreading")}
                  </Select.Option>
                  <Select.Option value="proofreading in progress">
                    {t("filters.status.options.proofreadingInProgress")}
                  </Select.Option>
                  <Select.Option value="ready for seo optimization">
                    {t("filters.status.options.readyForSeoOptimization")}
                  </Select.Option>
                  <Select.Option value="seo optimization in progress">
                    {t("filters.status.options.seoOptimizationInProgress")}
                  </Select.Option>
                  <Select.Option value="final">
                    {t("filters.status.options.final")}
                  </Select.Option>
                </Select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t("filters.dateRange.label")}
                </label>
                <RangePicker
                  allowClear={false}
                  onChange={(dates, dateStrings) => {
                    setDateRangeFilter(dates ? [dates[0], dates[1]] : null);
                  }}
                  className="w-full"
                  placeholder={[
                    t("filters.dateRange.start"),
                    t("filters.dateRange.end"),
                  ]}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t("filters.month.label")}
                </label>
                <Select
                  placeholder={t("filters.month.label")}
                  onChange={(value) => setMonthFilter(value)}
                  className="w-full"
                  value={monthFilter}
                >
                  <Select.Option value="January">
                    {t("filters.month.months.0")}
                  </Select.Option>
                  <Select.Option value="February">
                    {t("filters.month.months.1")}
                  </Select.Option>
                  <Select.Option value="March">
                    {t("filters.month.months.2")}
                  </Select.Option>
                  <Select.Option value="April">
                    {t("filters.month.months.3")}
                  </Select.Option>
                  <Select.Option value="May">
                    {t("filters.month.months.4")}
                  </Select.Option>
                  <Select.Option value="June">
                    {t("filters.month.months.5")}
                  </Select.Option>
                  <Select.Option value="July">
                    {t("filters.month.months.6")}
                  </Select.Option>
                  <Select.Option value="August">
                    {t("filters.month.months.7")}
                  </Select.Option>
                  <Select.Option value="September">
                    {t("filters.month.months.8")}
                  </Select.Option>
                  <Select.Option value="October">
                    {t("filters.month.months.9")}
                  </Select.Option>
                  <Select.Option value="November">
                    {t("filters.month.months.10")}
                  </Select.Option>
                  <Select.Option value="December">
                    {t("filters.month.months.11")}
                  </Select.Option>
                </Select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t("filters.role.label")}
                </label>
                <Select
                  placeholder={t("filters.role.label")}
                  onChange={(value) => setRoleFilter(value)}
                  className="w-full mr-4"
                  value={roleFilter}
                >
                  <Select.Option value="texter">
                    {t("filters.role.options.texter")}
                  </Select.Option>
                  <Select.Option value="lector">
                    {t("filters.role.options.lector")}
                  </Select.Option>
                  <Select.Option value="SEO">
                    {t("filters.role.options.SEO")}
                  </Select.Option>
                  <Select.Option value="meta lector">
                    {t("filters.role.options.metaLector")}
                  </Select.Option>
                  <Select.Option value="all">
                    {t("filters.role.options.all")}
                  </Select.Option>
                </Select>
              </div>
              <div className="flex gap-x-2">
                <button
                  onClick={clearFilters}
                  className="px-2 text-md py-2 bg-red-500 hover:bg-red-600/90 text-white rounded cursor-pointer"
                >
                  {t("filters.buttons.clear")}
                </button>
                <button
                  onClick={() => setFilterDropdownOpen(false)}
                  className="px-2 py-2 text-md bg-green-500 hover:bg-green-600/90 text-white rounded cursor-pointer"
                >
                  {t("filters.buttons.apply")}
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
