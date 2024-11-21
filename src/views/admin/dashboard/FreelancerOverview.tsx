import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Select } from "antd";
import FreelancerOverviewTable from "../../../components/tables/FreelancerOvervireTable";
import useTitle from "../../../hooks/useTitle";

const freelancers = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Texter",
    tasksOpenThisMonth: 5,
    tasksAssignedThisMonth: 8,
    totalTasksAssigned: 30,
    reliabilityStatus: 26, // yellow (1-10 missed deadlines)
    textQualityStatus: 2, // yellow (11-25 returns from lector)
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    role: "Texter",
    tasksOpenThisMonth: 3,
    tasksAssignedThisMonth: 6,
    totalTasksAssigned: 18,
    reliabilityStatus: 15, // green (no missed deadlines)
    textQualityStatus: 29, // green (1-10 returns from lector)
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alicejohnson@example.com",
    role: "Texter",
    tasksOpenThisMonth: 7,
    tasksAssignedThisMonth: 12,
    totalTasksAssigned: 40,
    reliabilityStatus: 11, // red (more than 10 missed deadlines)
    textQualityStatus: 14, // red (more than 25 returns from lector)
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bobbrown@example.com",
    role: "Texter",
    tasksOpenThisMonth: 2,
    tasksAssignedThisMonth: 4,
    totalTasksAssigned: 15,
    reliabilityStatus: 29, // yellow (1-10 missed deadlines)
    textQualityStatus: 3, // green (1-10 returns from lector)
  },
  {
    id: 5,
    name: "Charlie Williams",
    email: "charliewilliams@example.com",
    role: "Texter",
    tasksOpenThisMonth: 6,
    tasksAssignedThisMonth: 9,
    totalTasksAssigned: 35,
    reliabilityStatus: 1, // red (more than 10 missed deadlines)
    textQualityStatus: 2, // yellow (11-25 returns from lector)
  },
  {
    id: 6,
    name: "Diana Scott",
    email: "dianascott@example.com",
    role: "Texter",
    tasksOpenThisMonth: 4,
    tasksAssignedThisMonth: 7,
    totalTasksAssigned: 25,
    reliabilityStatus: 12, // green (no missed deadlines)
    textQualityStatus: 6, // yellow (11-25 returns from lector)
  },
  {
    id: 7,
    name: "Ethan Davis",
    email: "ethandavis@example.com",
    role: "Lector",
    tasksOpenThisMonth: 5,
    tasksAssignedThisMonth: 10,
    totalTasksAssigned: 20,
    reliabilityStatus: 2, // yellow (1-10 missed deadlines)
    textQualityStatus: 0, // No text quality status for Lectors
  },
  {
    id: 8,
    name: "Fiona Miller",
    email: "fionamiller@example.com",
    role: "Texter",
    tasksOpenThisMonth: 3,
    tasksAssignedThisMonth: 5,
    totalTasksAssigned: 20,
    reliabilityStatus: 3, // green (no missed deadlines)
    textQualityStatus: 3, // green (1-10 returns from lector)
  },
  {
    id: 9,
    name: "George Clark",
    email: "georgeclark@example.com",
    role: "Texter",
    tasksOpenThisMonth: 8,
    tasksAssignedThisMonth: 15,
    totalTasksAssigned: 50,
    reliabilityStatus: 2, // yellow (1-10 missed deadlines)
    textQualityStatus: 1, // red (more than 25 returns from lector)
  },
  {
    id: 10,
    name: "Hannah Lewis",
    email: "hannahlewis@example.com",
    role: "Texter",
    tasksOpenThisMonth: 1,
    tasksAssignedThisMonth: 2,
    totalTasksAssigned: 10,
    reliabilityStatus: 12, // green (no missed deadlines)
    textQualityStatus: 2, // yellow (11-25 returns from lector)
  },
  {
    id: 11,
    name: "Isabel Martinez",
    email: "isabelmartinez@example.com",
    role: "Texter",
    tasksOpenThisMonth: 10,
    tasksAssignedThisMonth: 20,
    totalTasksAssigned: 80,
    reliabilityStatus: 2, // yellow (1-10 missed deadlines)
    textQualityStatus: 27, // red (more than 25 returns from lector)
  },
  {
    id: 12,
    name: "Jack Thompson",
    email: "jackthompson@example.com",
    role: "Texter",
    tasksOpenThisMonth: 4,
    tasksAssignedThisMonth: 7,
    totalTasksAssigned: 22,
    reliabilityStatus: 28, // red (more than 10 missed deadlines)
    textQualityStatus: 3, // green (1-10 returns from lector)
  },
];

const FreelancerOverview: React.FC = () => {
  useTitle("Freelancer Overview");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredFreelancers, setFilteredFreelancers] = useState<Freelancer[]>(
    []
  );
  const [reliabilityFilter, setReliabilityFilter] = useState<number | null>(
    null
  ); // Added for reliability filter
  const [qualityFilter, setQualityFilter] = useState<number | null>(null); // Added for quality filter

  // Filter freelancers based on criteria
  const applyFilters = () => {
    let filtered = [...freelancers];

    if (reliabilityFilter !== null) {
      filtered = filtered.filter((freelancer) => {
        const reliability = freelancer.reliabilityStatus;
        return (
          (reliabilityFilter === 1 && reliability <= 10) ||
          (reliabilityFilter === 2 && reliability >= 11 && reliability <= 25) ||
          (reliabilityFilter === 3 && reliability > 25)
        );
      });
    }

    if (qualityFilter !== null) {
      filtered = filtered.filter((freelancer) => {
        const quality = freelancer.textQualityStatus;
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
    setFilteredFreelancers(freelancers);
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
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary">Freelancer Overview</li>
        </ol>
      </div>
      <div className="flex justify-between items-center relative">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white pb-2 lg:pb-0">
          Freelancer Overview
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
            <div className="absolute right-0 mt-2 bg-white dark:bg-boxdark p-4 shadow-md rounded w-full md:w-1/2 lg:w-2/3 xl:w-100 z-50 border-1">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Text Reliability
                </label>
                <Select
                  placeholder="Select Reliability"
                  onChange={(value) => setReliabilityFilter(value)}
                  allowClear
                  className="w-full"
                  value={reliabilityFilter}
                >
                  <Select.Option value={1}>Green (0 to 10)</Select.Option>
                  <Select.Option value={2}>Yellow (11 to 25)</Select.Option>
                  <Select.Option value={3}>Red (Above 25)</Select.Option>
                </Select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Text Quality
                </label>
                <Select
                  placeholder="Select Quality"
                  onChange={(value) => setQualityFilter(value)}
                  allowClear
                  className="w-full"
                  value={qualityFilter}
                >
                  <Select.Option value={1}>Green (0 to 10)</Select.Option>
                  <Select.Option value={2}>Yellow (11 to 25)</Select.Option>
                  <Select.Option value={3}>Red (Above 25)</Select.Option>
                </Select>
              </div>

              {/* Other Filters */}
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
        <div className="mt-4 rounded-sm border border-stroke pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 w-full bg-slate-200 h-[350px] animate-pulse"></div>
      ) : (
        <FreelancerOverviewTable users={filteredFreelancers} />
      )}
    </div>
  );
};

export default FreelancerOverview;
