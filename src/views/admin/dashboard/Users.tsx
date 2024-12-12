import React, { useEffect, useRef, useState } from "react";
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
import { useSelector } from "react-redux";
import AddManager from "../../../components/FormFields/AddManager";
import { User } from "../../../Types/Type";
import useTitle from "../../../hooks/useTitle";
import { useTranslation } from "react-i18next";

const Users: React.FC = () => {
  const { t } = useTranslation();
  useTitle(t("user.overviewUser"));
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

  const dropdownRef = useRef(null);

  useEffect(() => {
    // Close the dropdown if clicking outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getUser();
  }, [user?.user?.token]);

  const getUser = () => {
    const token = user?.user?.token;
    axios.defaults.headers.common["access-token"] = token;

    axios
      .get(`${import.meta.env.VITE_DB_URL}/admin/getAllUsers`)
      .then((response) => {
        const allUsers = response.data.users;
        setUserData(allUsers);
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
    setShowAddManager(true);
  };
  const handleCloseManager = () => {
    setShowAddManager(false);
    getUser();
  };

  return (
    <>
      <div className="mx-auto 3xl:px-6 py-3">
        <div className="flex justify-between items-center gap-x-2">
          <ol className="flex items-center gap-2 text-left">
            <li>
              <Link
                className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
                to="/dashboard"
              >
                {t("user.breadcrumb.dashboard")}
              </Link>
            </li>
            <li className="font-medium text-primary">
              {t("user.breadcrumb.users")}
            </li>
          </ol>
          <div className=" flex justify-center items-center gap-3">
            <div className="flex items-center text-left relative group">
              <input
                type="checkbox"
                className="h-6 w-6"
                checked={showInactive}
                onChange={handleStatusToggle}
              />
              <div className="z-99999 shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-5 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
               {showInactive? `${t("user.showInactive")}` : `${t("user.hideInactive")}`}
              </div>
            </div>

            <div className="flex items-center text-left relative group">
              <ToggleSwitch
                icon={toggleLeads ? faCheck : faTimes}
                isOn={toggleLeads}
                onToggle={handleToggleLeads}
              />
              <div className="z-99999 shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-5 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {!toggleLeads
                  ? t("user.toggle.leads.show")
                  : t("user.toggle.leads.hide")}
              </div>
            </div>
            <div className="flex items-center text-left relative group">
              <ToggleSwitch
                icon={toggleClient ? faCheck : faTimes}
                isOn={toggleClient}
                onToggle={handleToggleClient}
              />
              <div className="z-99999 shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-5 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {!toggleClient
                  ? t("user.toggle.client.show")
                  : t("user.toggle.client.hide")}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center sm:flex-row gap-3 pt-3"></div>
        <div className="flex justify-between items-center sm:flex-row gap-3 pt-3">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            {t("user.breadcrumb.users")}
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {showSearch && (
                <input
                  type="search"
                  value={search}
                  onChange={handleSearchFilter}
                  placeholder={t("user.search.placeholder")}
                  className="rounded ring-1 outline-none py-1 px-4 ring-slate-200 bg-slate-0 dark:bg-transparent w-45 lg:w-80 xl:w-80"
                />
              )}

              <div className="relative group">
                <div
                  onClick={handleSearch}
                  className="h-8 w-8 ring-1 my-2 flex justify-center items-center cursor-pointer rounded mr-2 ring-slate-300 bg-slate-100 dark:bg-transparent"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </div>

                {/* Tooltip for Search Icon */}
                <div className="z-99999 shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-5 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {t("user.search.button")}
                </div>
              </div>
            </div>

            <div
              onClick={handleAddManager}
              className="relative group inline-flex items-center cursor-pointer justify-center gap-2.5 bg-black py-1.5 text-sm xl:text-base  text-center font-medium text-white hover:bg-opacity-90 px-2"
            >
              <span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </span>
              <div className="z-99999 shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-7 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {t("user.addUser")}
              </div>
            </div>
          </div>
        </div>
        {showAddManager ? (
          <AddManager handleClose={handleCloseManager} />
        ) : null}
        {/* <div className="flex justify-end items-end pt-3 pb-3 pr-2">
          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className="flex items-center border-none rounded text-black bg-gray-200 dark:bg-gray-800 dark:text-white"
            >
              <span>{t("user.settings")}</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`ml-2 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute top-full mt-2 w-60 lg:right-0 xl:right-0 bg-white dark:bg-boxdark border border-gray-300 dark:border-gray-700 rounded shadow-lg z-10"
              >
                <div className="p-4 space-y-4">
                  <div className="flex items-center text-left">
                    <input
                      type="checkbox"
                      className="h-5 w-5"
                      checked={showInactive}
                      onChange={handleStatusToggle}
                    />
                    <span className="pl-2">{t("user.showInactive")}</span>
                  </div>
                  <div className="flex items-center text-left">
                    <ToggleSwitch
                      icon={toggleLeads ? faCheck : faTimes}
                      isOn={toggleLeads}
                      onToggle={handleToggleLeads}
                    />
                    <span className="pl-2">
                      {!toggleLeads
                        ? t("user.toggle.leads.show")
                        : t("user.toggle.leads.hide")}
                    </span>
                  </div>
                  <div className="flex items-center text-left">
                    <ToggleSwitch
                      icon={toggleClient ? faCheck : faTimes}
                      isOn={toggleClient}
                      onToggle={handleToggleClient}
                    />
                    <span className="pl-2">
                      {!toggleClient
                        ? t("user.toggle.client.show")
                        : t("user.toggle.client.hide")}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div> */}
        {loading ? (
          <div className="rounded-sm border border-stroke mt-5 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1  w-full bg-slate-200 h-[300px] animate-pulse"></div>
        ) : (

          <UserPaginatedTable
            users={filteredUserData.sort((a, b) => {
              const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
              const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
              return nameA.localeCompare(nameB); 
            })}
            refreshUser={getUser}
          />
        )}
      </div>
    </>
  );
};

export default Users;
