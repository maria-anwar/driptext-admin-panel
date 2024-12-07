import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlay, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import "./custompagination.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import react-toastify styles
import EditManager from "../FormFields/EditManager";
import { User } from "../../Types/Type";
import { useTranslation } from "react-i18next";

interface PaginatedTableProps {
  users: User[];
  refreshUser: () => void;
}

const UserPaginatedTable: React.FC<PaginatedTableProps> = ({
  users,
  refreshUser,
}) => {
  const { t } = useTranslation();
  const user = useSelector<any>((state) => state.user);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [userToken, setUserToken] = useState(user.user.token);
  const [localUsers, setLocalUsers] = useState<User[]>([]);
  const [editModel, setEditModel] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // State to hold selected user

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleActivite = (id: string) => {
    let token = userToken;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      userId: id,
      isActive: true,
    };

    axios
      .post(`${import.meta.env.VITE_DB_URL}/admin/updateUserStatus`, payload)
      .then((response) => {
        refreshUser();
        toast.success(t("user.userPaginatedTable.toast.userActivated"));
      })
      .catch((err) => {
        console.error("Error updating status:", err);
        toast.error(t("user.userPaginatedTable.toast.error"));
      });
  };

  const handleDeactivite = (id: string) => {
    let token = userToken;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      userId: id,
      isActive: false,
    };

    axios
      .post(`${import.meta.env.VITE_DB_URL}/admin/updateUserStatus`, payload)
      .then((response) => {
        refreshUser();
        toast.success(t("user.userPaginatedTable.toast.userDeactivated"));
      })
      .catch((err) => {
        console.error("Error updating status:", err);
        toast.error(t("user.userPaginatedTable.toast.error"));
      });
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user); // Set the selected user in state
    setEditModel(true); // Open the modal
  };

  const offset = (page - 1) * rowsPerPage;
  const paginatedUsers = localUsers.slice(offset, offset + rowsPerPage);

  return (
    <div className="mt-2">
      <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-3 text-left dark:bg-meta-4">
                <th className="min-w-[140px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("user.userPaginatedTable.table.headers.name")}
                </th>
                <th className="min-w-[120px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("user.userPaginatedTable.table.headers.email")}
                </th>
                <th className="min-w-[130px] py-4 px-4 font-medsemiboldium text-black dark:text-white">
                  {t("user.userPaginatedTable.table.headers.role")}
                </th>
                <th className="min-w-[130px] py-4 px-4 font-medsemiboldium text-black dark:text-white">
                  {t("user.userPaginatedTable.table.headers.status")}
                </th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                  {t("user.userPaginatedTable.table.headers.action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  className="text-left hover:bg-slate-100 dark:hover:bg-boxdark-2"
                  key={user?._id}
                >
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-start items-center">
                      <p className="text-black uppercase w-7 h-7 text-center dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs  flex justify-center items-center">
                        {user?.firstName.charAt(0)}
                        {user?.lastName === "-" ? "" : user?.lastName.charAt(0)}
                      </p>
                      <p className="text-black pl-2 dark:text-white capitalize">
                        {user?.firstName} {user?.lastName}
                      </p>
                    </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{user?.email}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white capitalize">
                      {user?.role?.title === "ProjectManger"
                        ? "Project Manager"
                        : user?.role?.title === "leads"
                        ? "Lead"
                        : user?.role?.title}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {user?.isActive === "Y"
                        ? t("user.userPaginatedTable.table.status.active")
                        : t("user.userPaginatedTable.table.status.inactive")}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-start items-center px-4">
                      {user?.isActive === "Y" ? (
                        <div className="relative group">
                          <div
                            className="ring-1 w-6 h-6 flex justify-center items-center rounded cursor-pointer ring-red-500"
                            onClick={() => handleDeactivite(user._id)}
                          >
                            <FontAwesomeIcon
                              className="text-red-500"
                              icon={faTrashCan}
                            />
                          </div>

                          {/* Tooltip for Deactivate Icon */}
                          <div className="z-99999 shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-7 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {t(
                              "user.userPaginatedTable.table.actions.deactivate"
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="relative group">
                          <div
                            className="ring-1 w-6 h-6 flex justify-center items-center rounded cursor-pointer ring-green-500 bg-green-500"
                            onClick={() => handleActivite(user._id)}
                          >
                            <FontAwesomeIcon
                              className="text-white"
                              icon={faPlay}
                            />
                          </div>

                          {/* Tooltip for Activate Icon */}
                          <div className="z-99999 shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-7 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {t(
                              "user.userPaginatedTable.table.actions.activate"
                            )}
                          </div>
                        </div>
                      )}
                      {user?.role?.title === "ProjectManger" ? (
                        <div className="relative group">
                          <div
                            className="ring-1 w-6 h-6 flex justify-center items-center rounded cursor-pointer ring-green-500 bg-green-500 mx-3"
                            onClick={() => handleEdit(user)} // Set the clicked user
                          >
                            <FontAwesomeIcon
                              className="text-white"
                              icon={faEdit}
                            />
                          </div>

                          {/* Tooltip */}
                          <div className="z-99999 shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-7 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {t(
                              "user.userPaginatedTable.table.actions.editProjectManager"
                            )}
                          </div>
                        </div>
                      ) : (
                        <p></p>
                      )}
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
            </select>

            <Pagination
              current={page}
              total={localUsers.length}
              pageSize={rowsPerPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      <ToastContainer />
      {editModel && selectedUser && (
        <EditManager
          editUser={selectedUser}
          handleClose={() => {
            setEditModel(false);
            refreshUser();
          }}
        />
      )}
    </div>
  );
};

export default UserPaginatedTable;
