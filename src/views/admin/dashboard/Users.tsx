import React, { useState } from "react";
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

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    permission: "leads",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Inactive",
    permission: "Developer",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "Active",
    permission: "Worker",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob@example.com",
    status: "Inactive",
    permission: "Client",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    status: "Active",
    permission: "Developer",
  },
  {
    id: 6,
    name: "Diana Evans",
    email: "diana@example.com",
    status: "Inactive",
    permission: "Client",
  },
  {
    id: 7,
    name: "Edward Foster",
    email: "edward@example.com",
    status: "Active",
    permission: "leads",
  },
  {
    id: 8,
    name: "Fiona Green",
    email: "fiona@example.com",
    status: "Inactive",
    permission: "Worker",
  },
  {
    id: 9,
    name: "George Harris",
    email: "george@example.com",
    status: "Active",
    permission: "Client",
  },
  {
    id: 10,
    name: "Hannah Ives",
    email: "hannah@example.com",
    status: "Inactive",
    permission: "leads",
  },
  {
    id: 11,
    name: "Ian Jones",
    email: "ian@example.com",
    status: "Active",
    permission: "Worker",
  },
  {
    id: 12,
    name: "Julia King",
    email: "julia@example.com",
    status: "Inactive",
    permission: "Client",
  },
  {
    id: 13,
    name: "Kevin Lewis",
    email: "kevin@example.com",
    status: "Active",
    permission: "Worker",
  },
  {
    id: 14,
    name: "Laura Miller",
    email: "laura@example.com",
    status: "Inactive",
    permission: "leads",
  },
  {
    id: 15,
    name: "Michael Nelson",
    email: "michael@example.com",
    status: "Active",
    permission: "Client",
  },
  {
    id: 16,
    name: "Nina Ortiz",
    email: "nina@example.com",
    status: "Inactive",
    permission: "Worker",
  },
  {
    id: 17,
    name: "Oscar Peterson",
    email: "oscar@example.com",
    status: "Active",
    permission: "leads",
  },
  {
    id: 18,
    name: "Pamela Quinn",
    email: "pamela@example.com",
    status: "Inactive",
    permission: "Client",
  },
  {
    id: 19,
    name: "Quincy Roberts",
    email: "quincy@example.com",
    status: "Active",
    permission: "Worker",
  },
  {
    id: 20,
    name: "Rachel Scott",
    email: "rachel@example.com",
    status: "Inactive",
    permission: "leads",
  },
  {
    id: 21,
    name: "Steven Taylor",
    email: "steven@example.com",
    status: "Active",
    permission: "Client",
  },
  {
    id: 22,
    name: "Tina Underwood",
    email: "tina@example.com",
    status: "Inactive",
    permission: "Worker",
  },
  {
    id: 23,
    name: "Ulysses Vaughn",
    email: "ulysses@example.com",
    status: "Active",
    permission: "leads",
  },
  {
    id: 24,
    name: "Vera Walker",
    email: "vera@example.com",
    status: "Inactive",
    permission: "Client",
  },
  {
    id: 25,
    name: "Walter Xiong",
    email: "walter@example.com",
    status: "Active",
    permission: "Worker",
  },
  {
    id: 26,
    name: "Xena Young",
    email: "xena@example.com",
    status: "Inactive",
    permission: "leads",
  },
  {
    id: 27,
    name: "Yvonne Zhang",
    email: "yvonne@example.com",
    status: "Active",
    permission: "Client",
  },
  {
    id: 28,
    name: "Zachary Adams",
    email: "zachary@example.com",
    status: "Inactive",
    permission: "Worker",
  },
  {
    id: 29,
    name: "Alice Bennett",
    email: "aliceb@example.com",
    status: "Active",
    permission: "leads",
  },
  {
    id: 30,
    name: "Bradley Carter",
    email: "bradley@example.com",
    status: "Inactive",
    permission: "Client",
  },
  {
    id: 31,
    name: "Catherine Dawson",
    email: "catherine@example.com",
    status: "Active",
    permission: "Worker",
  },
  {
    id: 32,
    name: "Daniel Evans",
    email: "daniel@example.com",
    status: "Inactive",
    permission: "leads",
  },
  {
    id: 33,
    name: "Emma Fisher",
    email: "emma@example.com",
    status: "Active",
    permission: "Client",
  },
  {
    id: 34,
    name: "Franklin Grant",
    email: "franklin@example.com",
    status: "Inactive",
    permission: "Worker",
  },
  {
    id: 35,
    name: "Grace Hall",
    email: "grace@example.com",
    status: "Active",
    permission: "leads",
  },
  {
    id: 36,
    name: "Henry Ingram",
    email: "henry@example.com",
    status: "Inactive",
    permission: "Client",
  },
  {
    id: 37,
    name: "Irene James",
    email: "irene@example.com",
    status: "Active",
    permission: "Worker",
  },
  {
    id: 38,
    name: "James Kelly",
    email: "james@example.com",
    status: "Inactive",
    permission: "leads",
  },
  {
    id: 39,
    name: "Karen Lewis",
    email: "karen@example.com",
    status: "Active",
    permission: "Client",
  },
  {
    id: 40,
    name: "Liam Mitchell",
    email: "liam@example.com",
    status: "Inactive",
    permission: "Worker",
  },
];

const Users: React.FC = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showInactive, setShowInactive] = useState<boolean>(false);
  const [data, setData] = useState(users);
  const [search, setSearch] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [toggleLeads, setToggleLeads] = useState<boolean>(false);
  const [toggleClient, setToggleClient] = useState<boolean>(false);

  const handleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    applyFilters(searchTerm, showInactive);
  };

  const handleStatusToggle = () => {
    const newShowInactive = !showInactive;
    setShowInactive(newShowInactive);
    applyFilters(search, newShowInactive);
  };

  const applyFilters = (searchTerm: string, showInactive: boolean) => {
    let filteredData = users;

    if (showInactive) {
      filteredData = users.filter((user) => user.status === "Inactive");
    }

    if (searchTerm) {
      filteredData = filteredData.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setData(filteredData);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleToggleLeads = () => {
    let filteredData = users;
    if(!toggleLeads){
      filteredData = users.filter((user) => user.permission.toLowerCase() === "leads");
      setData(filteredData);
    }
    setData(filteredData);
    setToggleLeads(!toggleLeads);
    setToggleClient(false);
  };

  const handleToggleClient = () => {
    let filteredData = users;
    if(!toggleClient){
      filteredData = users.filter((user) => user.permission.toLowerCase() === "client");
      setData(filteredData);
    }
    setData(filteredData);
    setToggleClient(!toggleClient);
    setToggleLeads(false);
  };


  return (
    <>
      <div className="mx-auto 3xl:px-6">
        <div className="flex flex-col sm:flex-row items-start justify-between lg:items-center xl:items-center">
          <div className="flex flex-col sm:flex-row gap-2 lg:gap-30 xl:gap-30 items-start lg:items-center xl:items-center">
            <ol className="flex items-center gap-2 text-left">
              <li>
                <Link
                  className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
                  to="/dashboard"
                >
                  Dashboard /
                </Link>
              </li>
              <li className="font-medium text-primary">User</li>
            </ol>

            <div className="flex items-center mb-2 lg:mb-0 xl:mb-0">
              <div
                onClick={handleSearch}
                className="h-8 w-8 ring-1 my-2 flex justify-center items-center cursor-pointer rounded mr-2 ring-slate-300 bg-slate-100 dark:bg-transparent"
              >
                <FontAwesomeIcon icon={faSearch} />
              </div>
              {showSearch && (
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchFilter}
                  placeholder="Searching..."
                  className="rounded ring-1 outline-none py-1 px-4 ring-slate-200 bg-slate-0 dark:bg-transparent w-60 lg:w-80 xl:w-80"
                />
              )}
            </div>
          </div>

          {/* Dropdown Trigger */}
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

        <h2 className="text-title-md2 font-semibold text-black dark:text-white py-2">
          Users
        </h2>
        <UserPaginatedTable users={data} />
      </div>
    </>
  );
};

export default Users;
