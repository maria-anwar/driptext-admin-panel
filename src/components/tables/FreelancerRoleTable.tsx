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
              <tr className="bg-gray-3 text-left dark:bg-meta-4">
                <th className="min-w-[200px] py-4 px-4 font-semibold text-black dark:text-white">
                {t('freelancer_overview.freelancer_overview_table.tableHeaders.name')}
                </th>
                <th className="min-w-[220px] py-4 px-4 font-semibold text-black dark:text-white">
                {t('freelancer_overview.freelancer_overview_table.tableHeaders.gmail')}
                </th>
                <th className="min-w-[180px] py-4 px-4 font-semibold text-black dark:text-white">
                {t('freelancer_overview.freelancer_overview_table.tableHeaders.role')}
                </th>
                <th className="min-w-[180px]  py-4 px-4 font-semibold text-black dark:text-white">
                {t('freelancer_overview.freelancer_overview_table.tableHeaders.reliabilityStatus')}
                </th>
                <th className="min-w-[180px] py-4 px-4 font-semibold text-black dark:text-white">
                {t('freelancer_overview.freelancer_overview_table.tableHeaders.textQualityStatus')}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedfreelancers.map((freelancer) => (
                <tr className="text-left" key={freelancer._id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white capitalize">
                      {freelancer?.freelancer?.firstName} {freelancer?.freelancer?.lastName}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {freelancer?.freelancer?.email}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {freelancer?.role}
                    </p>
                  </td>            
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div
                      className={`w-4 h-4 rounded-full ml-[60px] transition-all duration-300 ease-in-out ${
                        freelancer?.deadlineTasks <= 10
                          ? "bg-green-500"
                          : freelancer?.deadlineTasks >= 11 &&
                            freelancer?.deadlineTasks <= 25
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div
                      className={`w-4 h-4 rounded-full ml-[68px] transition-all duration-300 ease-in-out ${
                        freelancer?.returnTasks <= 10
                          ? "bg-green-500"
                          : freelancer?.returnTasks >= 11 &&
                            freelancer?.returnTasks <= 25
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