import React, { useState } from "react";
import { Pagination } from "antd";
import "antd/dist/reset.css";
import "./custompagination.css";
import { Tracking } from "../../Types/Type";

interface KpiTableProps {
  users: Tracking[];
  forecast: boolean;
}

const KpiInfoTable: React.FC<KpiTableProps> = ({ users,forecast }) => {
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
  const paginatedProjects = users.slice(offset, offset + rowsPerPage);

  return (
    <div className="mt-6">
      <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 ">
        <div className="max-w-full overflow-x-auto px-4 py-2">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-3 text-left dark:bg-meta-4">
                <th className="min-w-[170px] py-4 px-4 font-semibold text-black dark:text-white">
                  Project Id
                </th>
                <th className="min-w-[170px] py-4 px-4 font-semibold text-black dark:text-white">
                  Project Name
                </th>
                <th className="min-w-[170px] py-4 px-4 font-semibold text-black dark:text-white">
                  {forecast ? "Open Tasks" : "Final Tasks"}
                </th>
                <th className="min-w-[130px] py-4 px-4 font-semibold text-black dark:text-white">
                  Revenue
                </th>

                <th className="min-w-[130px] py-4 px-4 font-semibold text-black dark:text-white">
                  Cost
                </th>
                <th className="min-w-[130px] py-4 px-4 font-semibold text-black dark:text-white">
                  Margin
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.map((user) => (
                <tr className="text-left" key={user?._id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white ">
                      {user?.project?.projectId}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white ">
                      {user?.project?.projectName}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white ">
                      {}
                      {forecast ? user?.project?.openTasks : user?.project?.finalTasks}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white ">
                      {user?.revenue.toFixed(3)}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white capitalize">
                      {user?.cost.toFixed(3)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white capitalize">
                      {user?.margin.toFixed(3)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 mb-2 flex justify-between items-center">
            <select
              className="p-2 ring-1 ml-2  ring-slate-200 bg-transparent rounded outline-none shadow-2 "
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option className="dark:text-black " value={5}>
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

export default KpiInfoTable;
