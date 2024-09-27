import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../components/breeadcrumbs/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCheck,
  faTimes,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import UserPaginatedTable from "../../../components/tables/UserPaginatedTable";
import { Link } from "react-router-dom";
import ToggleSwitch from "../../../components/buttons/ToggleButton";
import axios from "axios";
import Loading from "../../../components/Helpers/Loading";
import { useSelector } from "react-redux";
import AddManager from "../../../components/FormFields/AddManager";

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

const Users: React.FC = () => {
  const user = useSelector<any>((state) => state.user);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showInactive, setShowInactive] = useState<boolean>(false); // Show all users initially
  const [search, setSearch] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [toggleLeads, setToggleLeads] = useState<boolean>(false);
  const [toggleClient, setToggleClient] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User[]>([]);
  const [filteredUserData, setFilteredUserData] = useState<User[]>([]);
  const [showAddManager, setShowAddManager] = useState<boolean>(false);

  useEffect(() => {
    getUser();
  }, [user.user.token]);

  const getUser = () => {
    const token = user.user.token;
    axios.defaults.headers.common["access-token"] = token;

    axios
      .get(`${import.meta.env.VITE_DB_URL}/admin/getAllUsers`)
      .then((response) => {
        const allUsers = response.data.users;
        setUserData(allUsers);
        console.log(allUsers);
        setFilteredUserData(allUsers);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    applyFilters();
  }, [search, showInactive, toggleLeads, toggleClient, userData]);

  const handleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleStatusToggle = () => {
    setShowInactive(!showInactive);
  };

  const applyFilters = () => {
    console.log("Applying filters...");
    let filteredData = userData;

    if (showInactive) {
      filteredData = filteredData.filter((user) => user.isActive === "N");
    }

    if (search) {
      filteredData = filteredData.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(search.toLowerCase());
      });
    }

    if (toggleLeads) {
      filteredData = filteredData.filter(
        (user) => user.role.title.toLowerCase() === "leads"
      );
    }

    if (toggleClient) {
      filteredData = filteredData.filter(
        (user) => user.role.title.toLowerCase() === "client"
      );
    }

    setFilteredUserData(filteredData);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleToggleLeads = () => {
    setToggleLeads(!toggleLeads);
    if (toggleClient) setToggleClient(false);
  };

  const handleToggleClient = () => {
    setToggleClient(!toggleClient);
    if (toggleLeads) setToggleLeads(false);
  };
  const handleAddManager = () => {
    setShowAddManager(true)
  };
  const handleCloseManager = () => {
    setShowAddManager(false)
  };

  return (
    <>
      <div className="mx-auto 3xl:px-6 py-3">
        <ol className="flex items-center gap-2 text-left">
          <li>
            <Link
              className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
              to="/dashboard"
            >
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary">Users</li>
        </ol>
        <div className="flex justify-between items-center sm:flex-row gap-3 pt-3">

        </div>
        <div className="flex justify-between items-center sm:flex-row gap-3 pt-3">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Users
          </h2>
          <div className="flex  items-center gap-2">
            {showSearch && (
              <input
                type="text"
                value={search}
                onChange={handleSearchFilter}
                placeholder="Search by name"
                className="rounded ring-1 outline-none py-1 px-4 ring-slate-200 bg-slate-0 dark:bg-transparent w-45 lg:w-80 xl:w-80"
              />
            )}
            <div
              onClick={handleSearch}
              className="h-8 w-8 ring-1 my-2 flex justify-center items-center cursor-pointer rounded mr-2 ring-slate-300 bg-slate-100 dark:bg-transparent"
            >
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <div
              onClick={handleAddManager}
              className="inline-flex items-center justify-center gap-2.5 bg-black py-3 text-sm xl:text-base  text-center font-medium text-white hover:bg-opacity-90 px-5"
            >
              <h2>Add Manager</h2>
            </div>
          </div>
          {showAddManager && <AddManager handleClose={handleCloseManager}/>}
        </div>
        <div className="flex justify-end items-end pt-3 pb-3 pr-2">
          
          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className="flex items-center border-none rounded text-black bg-gray-200 dark:bg-gray-800 dark:text-white"
            >
              <span>Settings</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`ml-2 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Content */}
            {dropdownOpen && (
              <div className="absolute top-full mt-2 w-60 lg:right-0 xl:right-0 bg-white dark:bg-boxdark border border-gray-300 dark:border-gray-700 rounded shadow-lg z-10">
                <div className="p-4 space-y-4">
                  {/* Checkbox */}
                  <div className="flex items-center text-left">
                    <input
                      type="checkbox"
                      className="h-5 w-5"
                      checked={showInactive}
                      onChange={handleStatusToggle}
                    />
                    <span className="pl-2">Show inactive users</span>
                  </div>

                  {/* Toggle Button */}
                  <div className="flex items-center text-left">
                    <ToggleSwitch
                      icon={toggleLeads ? faCheck : faTimes}
                      isOn={toggleLeads}
                      onToggle={handleToggleLeads}
                    />
                    <span className="pl-2">Show leads</span>
                  </div>
                  <div className="flex items-center text-left">
                    <ToggleSwitch
                      icon={toggleClient ? faCheck : faTimes}
                      isOn={toggleClient}
                      onToggle={handleToggleClient}
                    />
                    <span className="pl-2">Show Client</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {loading ? (
          <div className="rounded-sm border border-stroke mt-5 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1  w-full bg-slate-200 h-[300px] animate-pulse"></div>
        ) : (
          <UserPaginatedTable users={filteredUserData} refreshUser={getUser} />
        )}
      </div>
    </>
  );
};

export default Users;
