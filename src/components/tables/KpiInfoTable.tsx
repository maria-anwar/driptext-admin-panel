import React, { useState } from "react";
import { Pagination } from "antd";
import "antd/dist/reset.css";
import "./custompagination.css";
import { Tracking } from "../../Types/Type";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface KpiTableProps {
  tableData: Tracking[];
  forecast: boolean;
}

const KpiInfoTable: React.FC<KpiTableProps> = ({ tableData, forecast }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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

  const formatCurrency = (value) => {
    try {
      if (value == null || isNaN(value)) return `${value} €`;
      const number = parseFloat(value).toFixed(2); 
      let [integer, decimal] = number.split('.'); 
      integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); 
      return `${integer},${decimal} €`; 
    } catch (error) {
      return  `${value} €`; 
    }
  };

  const offset = (page - 1) * rowsPerPage;
  const paginatedProjects = tableData.slice(offset, offset + rowsPerPage);
  const handleProjectOverview = (id) => {
    localStorage.setItem("projectID", id);
    navigate("/dashboard/project-details");
  }

  return (
    <div className="mt-6">
      <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 ">
        <div className="max-w-full overflow-x-auto px-4 py-2">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-3 text-left dark:bg-meta-4">
                <th className="min-w-[100px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("track_forcast.tableHeaders.projectId")}
                </th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("track_forcast.tableHeaders.projectName")}
                </th>
                <th className={` ${forecast? "min-w-[140px] text-center":"min-w-[200px] text-center"} py-4 px-4 font-semibold text-black dark:text-white`}>
                  {forecast
                    ? t("track_forcast.tableHeaders.tasks.openTasks")
                    : t("track_forcast.tableHeaders.tasks.inProgressTasks")}
                </th>
                <th className="min-w-[130px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("track_forcast.tableHeaders.revenue")}
                </th>

                <th className="min-w-[130px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("track_forcast.tableHeaders.cost")}
                </th>
                <th className="min-w-[130px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("track_forcast.tableHeaders.margin")}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.map((data) => (
                <tr className="text-left" key={data?._id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="relative group">
                    <p className="text-primary cursor-pointer " onClick={()=>handleProjectOverview(data?.project?._id)}>
                      {data?.project?.projectId}
                    </p>
                    <div className="z-99999 shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-6 left-4  transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {t(
                      "projectDetails.breadcrumb.peojectdetail"
                    )}
                      </div>
                      </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white ">
                      {data?.project?.projectName}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white text-center">
                      {}
                      {forecast ? data?.openTasks : data?.inProgressTasks}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white ">
                      {data?.revenue ==0 ? `${data?.revenue} €` : formatCurrency(data?.revenue)}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white capitalize">
                      {data?.cost ==0 ? `${data?.cost} €` : formatCurrency(data?.cost)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white capitalize">
                      {data?.margin ==0 ? `${data?.margin} €` : formatCurrency(data?.margin)}
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
              total={tableData.length}
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
