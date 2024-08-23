import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import "./custompagination.css";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  stripe: string | "-"; // Allows either a URL string or '-'
}

interface PaginatedTableProps {
  users: User[];
}

const CustomerPaginatedTable: React.FC<PaginatedTableProps> = ({ users }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset to first page when rows per page changes
  };

  const handleStatusToggle = (user: User) => {
    alert(`Status toggled for ${user.name}`);
  };

  const offset = (page - 1) * rowsPerPage;
  const paginatedUsers = users.slice(offset, offset + rowsPerPage);

  return (
    <div className="mt-6">
      <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto ">
          <table className="w-full table-auto ">
            <thead>
              <tr className="bg-gray-3 text-left dark:bg-meta-4 ">
                <th className="min-w-[140px]  py-4 px-4 font-semibold text-black dark:text-white ">
                  Name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-semibold  text-black dark:text-white">
                  Email
                </th>
                <th className="min-w-[130px] py-4 px-4 font-medsemiboldium text-black dark:text-white">
                  Stripe
                </th>
                <th className="min-w-[130px] py-4 px-4 font-medsemiboldium text-black dark:text-white">
                  Status
                </th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  className="text-left hover:bg-slate-100 dark:hover:bg-boxdark-2"
                  key={user.id}
                >
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-start items-center">
                      <p className="text-black dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs px-1 py-1 flex justify-center items-center">
                        {`${user.name.split(" ")[0][0]}${
                          user.name.split(" ").slice(-1)[0][0]
                        }`}
                      </p>
                      <p className="text-black pl-2 dark:text-white">
                        {user.name}
                      </p>
                    </div>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black  dark:text-white">{user.email}</p>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark cursor-pointer">
                    <Link
                      to={user.stripe}
                      className="text-blue-500 hover:text-blue-400 flex items-center justify-start"
                    >
                      {/* <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5.5 h-5.5"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5"
                            stroke="#3b82f6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </g>
                      </svg> */}
                      {user.stripe || "-"}
                    </Link>
                  </td>
                  <td className="border-b  border-[#eee] py-5  px-4 dark:border-strokedark">
                    <p className="text-black  dark:text-white">{user.status}</p>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark   ">
                    <div className="flex">
                      <div
                        className={`ring-1 w-6 h-6 flex justify-center items-center rounded cursor-pointer 
                        ring-red-500
                      `}
                        onClick={() => handleStatusToggle(user)}
                      >
                        <FontAwesomeIcon
                          className={`
                         text-red-500
                        `}
                          icon={faTrashCan}
                        />
                      </div>
                      {user.status === "Inactive" && (
                        <div
                          className={`ring-1 w-6 h-6 flex justify-center items-center rounded cursor-pointer 
                        ring-green-500 ml-2 bg-green-500 
                      `}
                          onClick={() => alert("activate")}
                        >
                          <FontAwesomeIcon
                            className="text-white"
                            icon={faPlay}
                          />
                        </div>
                      )}
                    </div>
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

export default CustomerPaginatedTable;
