import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import "./custompagination.css";

interface Role {
  _id: string;
  title: string;
  isActive: "Y" | "N";
}

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: "Y" | "N";
  role: Role;
}

interface PaginatedTableProps {
  users: User[];
}

const UserPaginatedTable: React.FC<PaginatedTableProps> = ({ users }) => {
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

  const handleActivite = (id: string) => {
    alert(`Status Activete for ${id}`);
  };

  const handleDeactivite = (id: string) => {
    alert(`Status Deactivete for ${id}`);
  };

  const offset = (page - 1) * rowsPerPage;
  const paginatedUsers = users.slice(offset, offset + rowsPerPage);

  return (
    <div className="mt-2">
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
                  Role
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
                      <p className="text-black uppercase dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs px-1 py-1 flex justify-center items-center">
                        {user.firstName.charAt(0)}
                        {user.lastName == "-" ? "" : user.lastName.charAt(0)}
                      </p>
                      <p className="text-black pl-2 dark:text-white capitalize">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black  dark:text-white">{user.email}</p>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black  dark:text-white capitalize">
                      {user.role.title === "ProjectManger"
                        ? "Project Manager"
                        : user.role.title}
                    </p>
                  </td>
                  <td className="border-b  border-[#eee] py-5  px-4 dark:border-strokedark">
                    <p className="text-black  dark:text-white">
                      {user.isActive === "Y" ? "Active" : "Inactive"}
                    </p>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark   ">
                    <div className="flex justify-start items-center px-4">
                    {user.isActive === "Y" ? (
                      <div
                        className={`ring-1 w-6 h-6 flex justify-center items-center rounded cursor-pointer 
                        ring-red-500
                      `}
                        onClick={() => handleDeactivite(user._id)}
                      >
                        <FontAwesomeIcon
                          className={`
                         text-red-500
                        `}
                          icon={faTrashCan}
                        />
                      </div>
                    ):(
                        <div
                          className={`ring-1 w-6 h-6 flex justify-center items-center rounded cursor-pointer 
                        ring-green-500  bg-green-500 
                      `}
                          onClick={() => handleActivite(user._id)}
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

export default UserPaginatedTable;
