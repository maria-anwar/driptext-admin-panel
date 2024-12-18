import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Select } from "antd";
import FreelancerOverviewTable from "../../../components/tables/FreelancerOvervireTable";
import FreelancerRoleTable from "../../../components/tables/FreelancerRoleTable";
import useTitle from "../../../hooks/useTitle";
import axios from "axios";
import { useSelector } from "react-redux";
import { freelancerData } from "../../../Types/Type";
import { set } from "lodash";
import { useTranslation } from "react-i18next";

const FreelancerOverview: React.FC = () => {
  const {t} = useTranslation();
  useTitle(t('freelancer_overview.breadcrumbs.freelancerOverview'));
  const user = useSelector<any>((state) => state.user);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredFreelancers, setFilteredFreelancers] = useState<
    freelancerData[]
  >([]);
  const [Freelancers, setFreelancers] = useState<freelancerData[]>([]);
  const [reliabilityFilter, setReliabilityFilter] = useState<number | null>(
    null
  );
  const [qualityFilter, setQualityFilter] = useState<number | null>(null); // Added for quality filter
  const [costTraficData, setCostTraficData] = useState<any>([]);

  

  useEffect(() => {
    getTaskData();
  }, [user]);

  const getTaskData = async () => {
    setLoading(true);
    let token = user?.user?.token;
    axios.defaults.headers.common["access-token"] = token;
    await axios
      .get(`${import.meta.env.VITE_DB_URL}/admin/getFreelancersKPI`)
      .then((response) => {
        console.log("response", response.data.data);
              setCostTraficData(response.data.data);
        setFilteredFreelancers(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project details:", err);
        setLoading(false);
      });
  };

  // const getTaskCost = async () => {
  //   setLoading(true);
  //   let token = user?.user?.token;
  //   axios.defaults.headers.common["access-token"] = token;
  //   await axios
  //     .get(`${import.meta.env.VITE_DB_URL}/admin/getFreelancerTrafficLights`)
  //     .then((response) => {
  //       setCostTraficData(response.data.data);
  //       setFilteredFreelancers(response.data.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching project details:", err);
  //       setLoading(false);
  //     });
  // };

  const applyFilters = () => {
    let filtered = [...costTraficData];

    if (reliabilityFilter !== null) {
      filtered = filtered.filter((freelancer) => {
        const reliability = freelancer.deadlineTasks;
        return (
          (reliabilityFilter === 1 && reliability <= 10) ||
          (reliabilityFilter === 2 && reliability >= 11 && reliability <= 25) ||
          (reliabilityFilter === 3 && reliability > 25)
        );
      });
    }

    if (qualityFilter !== null) {
      filtered = filtered.filter((freelancer) => {
        const quality = freelancer.returnTasks;
        return (
          (qualityFilter === 1 && quality <= 10) ||
          (qualityFilter === 2 && quality >= 11 && quality <= 25) ||
          (qualityFilter === 3 && quality > 25)
        );
      });
    }

    setFilteredFreelancers(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [reliabilityFilter, qualityFilter]);

  const clearFilters = () => {
    setReliabilityFilter(null);
    setQualityFilter(null);
    setFilteredFreelancers(filteredFreelancers);
    setFilterDropdownOpen(false);
  };

  return (
    <div className="mx-auto 3xl:px-4">
      <div className="flex items-center justify-between space-x-4 mb-6 mt-2">
        <ol className="flex items-center gap-2 text-left">
          <li>
            <Link
              className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
              to="/dashboard"
            >
              {t('freelancer_overview.breadcrumbs.dashboard')}
            </Link>
          </li>
          <li className="font-medium text-primary"> {t('freelancer_overview.breadcrumbs.freelancerOverview')}</li>
        </ol>
      </div>


      <div className="flex justify-between items-center relative mt-10">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white pb-2 lg:pb-0">
        {t('freelancer_overview.titles.freelancerOverview')}
        </h2>
        <div>
          <button
            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
            className="inline-flex items-center cursor-pointer justify-center gap-2.5 bg-black py-3 text-sm xl:text-base text-center font-medium text-white hover:bg-opacity-90 px-5"
          >
            <span>{t('freelancer_overview.buttons.filter')}</span>
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
            <div className="absolute right-0 mt-2 bg-white dark:bg-boxdark p-4 shadow-md rounded w-full md:w-1/2 lg:w-2/3 xl:w-100 z-50 border-1">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t('freelancer_overview.filters.textReliability')}
                </label>
                <Select
                  placeholder={t('freelancer_overview.filters.reliabilityPlaceholder')}
                  onChange={(value) => setReliabilityFilter(value)}
                  allowClear={false}
                  className="w-full"
                  value={reliabilityFilter}
                >
                  <Select.Option value={1}>{t('freelancer_overview.filters.reliabilityOptions.1')}</Select.Option>
                  <Select.Option value={2}>{t('freelancer_overview.filters.reliabilityOptions.2')}</Select.Option>
                  <Select.Option value={3}>{t('freelancer_overview.filters.reliabilityOptions.3')}</Select.Option>
                </Select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                {t('freelancer_overview.filters.textQuality')}
                </label>
                <Select
                  placeholder={t('freelancer_overview.filters.qualityPlaceholder')}
                  onChange={(value) => setQualityFilter(value)}
                  allowClear={false}
                  className="w-full"
                  value={qualityFilter}
                >
                  <Select.Option value={1}>{t('freelancer_overview.filters.qualityOptions.1')}</Select.Option>
                  <Select.Option value={2}>{t('freelancer_overview.filters.qualityOptions.2')}</Select.Option>
                  <Select.Option value={3}>{t('freelancer_overview.filters.qualityOptions.3')}</Select.Option>
                </Select>
              </div>

              {/* Other Filters */}
              <div className="flex gap-x-2">
                <button
                  onClick={clearFilters}
                  className="px-2 text-md py-2 bg-red-500 hover:bg-red-600/90 text-white rounded cursor-pointer"
                >
                  {t('freelancer_overview.filters.clearFilters')}
                </button>
                <button
                  onClick={() => setFilterDropdownOpen(false)}
                  className="px-2 py-2 text-md bg-green-500 hover:bg-green-600/90 text-white rounded cursor-pointer"
                >
                 {t('freelancer_overview.filters.applyFilters')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <div className="mt-4 rounded-sm border border-stroke pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 w-full bg-slate-200 h-[350px] animate-pulse"></div>
      ) : (
       
        <FreelancerRoleTable freelancers={filteredFreelancers} />
      )}
    </div>
  );
};

export default FreelancerOverview;
