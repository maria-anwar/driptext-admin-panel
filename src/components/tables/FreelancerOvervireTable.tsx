import React, { useState } from "react";
import { Pagination } from "antd";
import "antd/dist/reset.css";
import "./custompagination.css"; // For custom pagination styles

interface Freelancer {
  id: string;
  name: string;
  email: string;
  role: string;
  tasksOpenThisMonth: number;
  tasksAssignedThisMonth: number;
  totalTasksAssigned: number;
  reliabilityStatus: number; // number of missed deadlines in the last 90 days
  textQualityStatus: number; // number of returns from lector
}

interface FreelancerOverviewTableProps {
  users: Freelancer[];
}

const FreelancerOverviewTable: React.FC<FreelancerOverviewTableProps> = ({ users }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle page change
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  // Handle number of rows per page change
  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  // Pagination calculation
  const offset = (page - 1) * rowsPerPage;
  const paginatedUsers = users.slice(offset, offset + rowsPerPage);

  return (
    <div className="mt-6">
      <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 ">
        <div className="max-w-full overflow-x-auto px-4 py-2">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-3 text-left dark:bg-meta-4">
                <th className="min-w-[180px] py-4 px-4 font-semibold text-black dark:text-white">Name</th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">Gmail</th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">Role</th>
                <th className="min-w-[180px] py-4 px-4 font-semibold text-black dark:text-white">Open This Month</th>
                <th className="min-w-[200px] py-4 px-4 font-semibold text-black dark:text-white">Assigned This Month</th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">Total Assigned</th>
                <th className="min-w-[180px] py-4 px-4 font-semibold text-black dark:text-white">Reliability Status</th>
                <th className="min-w-[180px] py-4 px-4 font-semibold text-black dark:text-white">Text Quality Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr className="text-left" key={user.id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white capitalize">{user.name}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{user.email}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white capitalize">{user.role}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{user.tasksOpenThisMonth}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{user.tasksAssignedThisMonth}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{user.totalTasksAssigned}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div
                      className={`w-4 h-4 rounded-full mx-auto transition-all duration-300 ease-in-out ${
                        user.reliabilityStatus <= 10
                          ? "bg-green-500"
                          : user.reliabilityStatus >= 11 && user.reliabilityStatus <= 25
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div
                      className={`w-4 h-4 rounded-full mx-auto transition-all duration-300 ease-in-out ${
                        user.textQualityStatus <= 10
                          ? "bg-green-500"
                          : user.textQualityStatus >= 11 && user.textQualityStatus <= 25
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 mb-2 flex justify-between items-center">
            <select
              className="p-2 ring-1 ml-2 ring-slate-200 bg-transparent rounded outline-none shadow-2 "
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option className="dark:text-black" value={5}>5</option>
              <option className="dark:text-black" value={10}>10</option>
              <option className="dark:text-black" value={25}>25</option>
              <option className="dark:text-black" value={50}>50</option>
            </select>
            <Pagination
              current={page}
              pageSize={rowsPerPage}
              total={users.length}
              onChange={handlePageChange}
              className="ant-pagination"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerOverviewTable;
