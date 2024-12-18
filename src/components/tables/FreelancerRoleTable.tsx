import React, { useState } from "react";
import { Pagination } from "antd";
import "antd/dist/reset.css";
import "./custompagination.css";
import { freelancerData } from "../../Types/Type";
import { useTranslation } from "react-i18next";

interface FreelancerRoleTableProps {
  freelancers: any[];
}

const FreelancerRoleTable: React.FC<FreelancerRoleTableProps> = ({
  freelancers,
}) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  console.log(freelancers);

  const totalReturnTasks = freelancers
    .map((freelancer) => freelancer.returnTasks)
    .reduce((total, current) => total + current, 0);

  const totalDeadlineTasks = freelancers
    .map((freelancer) => freelancer.deadlineTasks)
    .reduce((total, current) => total + current, 0);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const offset = (page - 1) * rowsPerPage;
  const paginatedfreelancers = freelancers.slice(offset, offset + rowsPerPage);

  return (
    <div className="mt-6">
      <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 ">
        <div className="max-w-full overflow-x-auto px-4 py-2">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-3 text-left dark:bg-meta-4 ">
                <th className="min-w-[230px] py-5 px-4 font-semibold text-black dark:text-white">
                  {t(
                    "freelancer_overview.freelancer_overview_table.tableHeaders.name"
                  )}
                </th>
                <th className="min-w-[180px] py-5 px-4 font-semibold text-black dark:text-white ">
                  {t(
                    "freelancer_overview.freelancer_overview_table.tableHeaders.role"
                  )}
                </th>
                <th className="min-w-[250px] py-5 px-4 font-semibold text-black dark:text-white">
                  {t(
                    "freelancer_overview.freelancer_overview_table.tableHeaders.gmail"
                  )}
                </th>
   
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t(
                    "freelancer_overview.freelancer_overview_table.tableHeaders.phone"
                  )}
                  </th>
                <th className="min-w-[200px] py-4 px-4 font-semibold text-black dark:text-white">
                  <div className="text-center">
                  {t(
                    "freelancer_overview.freelancer_overview_table.tableHeaders.openThisMonth"
                  )}
                  </div>
                </th>
                <th className="min-w-[200px] py-4 px-4 font-semibold text-black dark:text-white">
                <div className="text-center">
                  {t(
                    "freelancer_overview.freelancer_overview_table.tableHeaders.assignedThisMonth"
                  )}
                  </div>
                </th>
                <th className="min-w-[200px] py-4 px-4 font-semibold text-black dark:text-white">
                <div className="text-center">
                  {t(
                    "freelancer_overview.freelancer_overview_table.tableHeaders.totalAssigned"
                  )}
                  </div>
                </th>
                <th className="min-w-[180px]  py-5 px-4 font-semibold text-black dark:text-white text-center">
                  <div className={"relative group text-center "}>
                    {t(
                      "freelancer_overview.freelancer_overview_table.tableHeaders.reliabilityStatus"
                    )}
                    <div className="z-99999 shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-6 left-16  transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {t(
                      "freelancer_overview.freelancer_overview_table.tableHeaders.totalDeadline"
                    )}: {totalDeadlineTasks}
                    </div>
                  </div>
                </th>
                <th className="min-w-[180px] py-5 px-4 font-semibold text-black dark:text-white text-center">
                  <div className={"relative group text-center"}>
                    {t(
                      "freelancer_overview.freelancer_overview_table.tableHeaders.textQualityStatus"
                    )}
                    <div className="z-99999 shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-6 left-18  transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {t(
                      "freelancer_overview.freelancer_overview_table.tableHeaders.totalReturn"
                    )}: {totalReturnTasks}
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedfreelancers.map((freelancer) => (
                <tr className="text-left" key={freelancer._id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-start items-center gap-x-2">
                      <div>
                      <p className="text-black uppercase w-7 h-7 text-center dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs  flex justify-center items-center">
                        {freelancer?.firstName.charAt(0)}
                        {freelancer?.lastName === "-"
                          ? ""
                          : freelancer?.lastName.charAt(0)}
                      </p>
                      </div>
                      <div>
                      <p className="text-black dark:text-white capitalize">
                        {freelancer?.firstName}{" "}
                        {freelancer?.lastName}
                      </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {freelancer?.role}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {freelancer?.email}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {freelancer?.phone}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white text-center">
                      {freelancer?.openTasksThisMonth
                        ? freelancer?.openTasksThisMonth
                        : 0}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white text-center">
                      {freelancer?.taskAssignThisMonth
                        ? freelancer?.taskAssignThisMonth
                        : 0}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white text-center">
                      {freelancer?.assignedTotalTasks
                        ? freelancer?.assignedTotalTasks
                        : 0}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className=" flex justify-center items-center">
                    <div
                      className={`w-4 h-4 relative group rounded-full  transition-all duration-300 ease-in-out  ${
                        freelancer?.deadlineTasks <= 10
                          ? "bg-green-500"
                          : freelancer?.deadlineTasks >= 11 &&
                            freelancer?.deadlineTasks <= 25
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      <div className="z-99999 shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-8 left-2  transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {t(
                      "freelancer_overview.freelancer_overview_table.tableHeaders.deadline"
                    )}: {freelancer?.deadlineTasks}/{freelancer?.assignedTotalTasks}
                      </div>
                    </div>
                    </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className=" flex justify-center items-center">

                    <div
                      className={`w-4 h-4 relative group rounded-full  transition-all duration-300 ease-in-out ${
                        freelancer?.returnTasks <= 10
                          ? "bg-green-500"
                          : freelancer?.returnTasks >= 11 &&
                            freelancer?.returnTasks <= 25
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      <div className="z-99999 shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-8 left-2  transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {t(
                      "freelancer_overview.freelancer_overview_table.tableHeaders.return"
                    )}: {freelancer?.returnTasks}/{freelancer?.assignedTotalTasks}
                      </div>
                    </div>
                    </div>
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
              <option className="dark:text-black" value={5}>
                5
              </option>
              <option className="dark:text-black" value={10}>
                10
              </option>
              <option className="dark:text-black" value={25}>
                25
              </option>
              <option className="dark:text-black" value={50}>
                50
              </option>
            </select>
            <Pagination
              current={page}
              pageSize={rowsPerPage}
              total={freelancers.length}
              onChange={handlePageChange}
              className="ant-pagination"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerRoleTable;
