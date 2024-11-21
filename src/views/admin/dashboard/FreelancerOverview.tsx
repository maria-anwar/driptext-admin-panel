import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import KpiTable from "../../../components/tables/KpiTable";
import useTitle from "../../../hooks/useTitle";
import FreelancerOverviewTable from "../../../components/tables/FreelancerOvervireTable";


const freelancers = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Texter",
    tasksOpenThisMonth: 5,
    tasksAssignedThisMonth: 8,
    totalTasksAssigned: 30,
    reliabilityStatus: 26,  // yellow (1-10 missed deadlines)
    textQualityStatus: 2   // yellow (11-25 returns from lector)
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    role: "Texter",
    tasksOpenThisMonth: 3,
    tasksAssignedThisMonth: 6,
    totalTasksAssigned: 18,
    reliabilityStatus: 15,  // green (no missed deadlines)
    textQualityStatus: 29   // green (1-10 returns from lector)
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alicejohnson@example.com",
    role: "Texter",
    tasksOpenThisMonth: 7,
    tasksAssignedThisMonth: 12,
    totalTasksAssigned: 40,
    reliabilityStatus: 11,  // red (more than 10 missed deadlines)
    textQualityStatus: 14   // red (more than 25 returns from lector)
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bobbrown@example.com",
    role: "Texter",
    tasksOpenThisMonth: 2,
    tasksAssignedThisMonth: 4,
    totalTasksAssigned: 15,
    reliabilityStatus: 29,  // yellow (1-10 missed deadlines)
    textQualityStatus: 3   // green (1-10 returns from lector)
  },
  {
    id: 5,
    name: "Charlie Williams",
    email: "charliewilliams@example.com",
    role: "Texter",
    tasksOpenThisMonth: 6,
    tasksAssignedThisMonth: 9,
    totalTasksAssigned: 35,
    reliabilityStatus: 1,  // red (more than 10 missed deadlines)
    textQualityStatus: 2   // yellow (11-25 returns from lector)
  },
  {
    id: 6,
    name: "Diana Scott",
    email: "dianascott@example.com",
    role: "Texter",
    tasksOpenThisMonth: 4,
    tasksAssignedThisMonth: 7,
    totalTasksAssigned: 25,
    reliabilityStatus: 12,  // green (no missed deadlines)
    textQualityStatus: 6   // yellow (11-25 returns from lector)
  },
  {
    id: 7,
    name: "Ethan Davis",
    email: "ethandavis@example.com",
    role: "Lector",
    tasksOpenThisMonth: 5,
    tasksAssignedThisMonth: 10,
    totalTasksAssigned: 20,
    reliabilityStatus: 2,  // yellow (1-10 missed deadlines)
    textQualityStatus: 0 // No text quality status for Lectors
  },
  {
    id: 8,
    name: "Fiona Miller",
    email: "fionamiller@example.com",
    role: "Texter",
    tasksOpenThisMonth: 3,
    tasksAssignedThisMonth: 5,
    totalTasksAssigned: 20,
    reliabilityStatus: 3,  // green (no missed deadlines)
    textQualityStatus: 3   // green (1-10 returns from lector)
  },
  {
    id: 9,
    name: "George Clark",
    email: "georgeclark@example.com",
    role: "Texter",
    tasksOpenThisMonth: 8,
    tasksAssignedThisMonth: 15,
    totalTasksAssigned: 50,
    reliabilityStatus: 2,  // yellow (1-10 missed deadlines)
    textQualityStatus: 1   // red (more than 25 returns from lector)
  },
  {
    id: 10,
    name: "Hannah Lewis",
    email: "hannahlewis@example.com",
    role: "Texter",
    tasksOpenThisMonth: 1,
    tasksAssignedThisMonth: 2,
    totalTasksAssigned: 10,
    reliabilityStatus: 12,  // green (no missed deadlines)
    textQualityStatus: 2   // yellow (11-25 returns from lector)
  },
  {
    id: 11,
    name: "Isabel Martinez",
    email: "isabelmartinez@example.com",
    role: "Texter",
    tasksOpenThisMonth: 10,
    tasksAssignedThisMonth: 20,
    totalTasksAssigned: 80,
    reliabilityStatus: 2,  // yellow (1-10 missed deadlines)
    textQualityStatus: 27   // red (more than 25 returns from lector)
  },
  {
    id: 12,
    name: "Jack Thompson",
    email: "jackthompson@example.com",
    role: "Texter",
    tasksOpenThisMonth: 4,
    tasksAssignedThisMonth: 7,
    totalTasksAssigned: 22,
    reliabilityStatus: 28,  // red (more than 10 missed deadlines)
    textQualityStatus: 3   // green (1-10 returns from lector)
  }
];

const FreelancerOverview: React.FC = () => {
  useTitle('Freelancer Overview')

  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState([]);

 

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
      </div>
      {loading ? (
        <div className="mt-4 rounded-sm border border-stroke pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 w-full bg-slate-200 h-[350px] animate-pulse"></div>
      ) : (
        <FreelancerOverviewTable users={freelancers} />
      )}
    </div>
  );
};

export default FreelancerOverview;
