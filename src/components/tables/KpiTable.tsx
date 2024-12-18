import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Types/Type";
import { Pagination } from "antd";
import { useTranslation } from "react-i18next";

interface KpiTableProps {
  users: User[];
}

const KpiTable: React.FC<KpiTableProps> = ({ users }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleTracking = (
    clientId: string,
    firstName: string,
    lastName: string,
    email: string
  ) => {
    const fullName = `${firstName} ${lastName}`;
    navigate("tracking", { state: { fullName, clientId, email } });
  };

  const handleForercasting = (
    clientId: string,
    firstName: string,
    lastName: string,
    email: string
  ) => {
    const fullName = `${firstName} ${lastName}`;
    navigate("forecast", { state: { fullName, clientId, email } });
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
                <th className="min-w-[230px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("kpi.tableHeaders.0")}
                </th>
                <th className="min-w-[130px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("kpi.tableHeaders.1")}
                </th>
                <th className="min-w-[130px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("kpi.tableHeaders.2")}
                </th>
                <th className="min-w-[230px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("kpi.tableHeaders.3")}
                </th>
                <th className="min-w-[230px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("kpi.tableHeaders.4")}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.map((user) => (
                <tr className="text-left" key={user?._id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-start items-center gap-2 ">
                      <div>
                        <p className="text-black uppercase w-7 h-7 text-center dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs  flex justify-center items-center">
                          {user?.firstName.charAt(0)}
                          {user?.lastName === "-"
                            ? ""
                            : user?.lastName.charAt(0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-black  dark:text-white capitalize">
                          {user?.firstName} {user?.lastName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white ">{user?.email}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white capitalize">
                      {user?.role?.title === "leads"
                        ? "Lead"
                        : user?.role?.title}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div
                      className={`bg-blue-500 hover:bg-blue-500/90 px-2 h-9 flex justify-center items-center rounded cursor-pointer`}
                      onClick={() =>
                        handleTracking(
                          user?._id,
                          user?.firstName,
                          user?.lastName,
                          user?.email
                        )
                      }
                    >
                      <FontAwesomeIcon className="text-white" icon={faEye} />
                      <p className="text-white text-base font-medium text-center py-1 px-2">
                        {t("kpi.actions.tracking")}
                      </p>
                    </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div
                      className={`bg-blue-500 hover:bg-blue-500/90 px-2 h-9 flex justify-center items-center rounded cursor-pointer`}
                      onClick={() =>
                        handleForercasting(
                          user?._id,
                          user?.firstName,
                          user?.lastName,
                          user?.email
                        )
                      }
                    >
                      <FontAwesomeIcon className="text-white" icon={faEye} />
                      <p className="text-white text-base font-medium text-center py-1 px-2">
                        {t("kpi.actions.forecast")}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 mb-2 flex justify-between items-center">
            <select
              className="p-2 ring-1 ml-2 ring-slate-200 bg-transparent rounded outline-none shadow-2"
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
              <option className="dark:text-black" value={100}>
                100
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

export default KpiTable;
