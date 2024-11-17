import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import DropdownUser from "./DropdownUser";
import DropdownNotification from "./DropdownNotification";
import DarkModeSwitcher from "./DarkModeSwitcher";
import GoogleTranslation from "../../GoogleTransalation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { changeLanguage } from "../../i18n";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  // Ref for dropdown menu
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeYourLanguage = (language: string) => {
    setSelectedLanguage(language);
    changeLanguage(language);
    localStorage.setItem("language", language);
    setIsOpen(false);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);  // Close dropdown if clicked outside
      }
    };

    // Add event listener for click outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const tasks = [
    {
      id: "1",
      domain: "example.com | 96 - DT",
    },
    {
      id: "2",
      domain: "Instance.com | 74 - DT",
    },
    {
      id: "3",
      domain: "Driptext.com | 62 - DT",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          <Link className="block flex-shrink-0 lg:hidden" to="/">
            {/* <img src={LogoIcon} alt="Logo" /> */}
          </Link>
        </div>

        <div className="hidden sm:block">
          {/* Optional search form or other content */}
        </div>

        <div className="flex items-center gap-5 2xsm:gap-2">
          <ul className="flex items-center gap-y-5 gap-x-3 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            {/* <DarkModeSwitcher /> */}
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}
          </ul>

          {/* Language Switcher Icon (Font Awesome Globe icon) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="text-2xl bg-boxdark dark:bg-white  border-2 border-boxdark dark:border-white flex justify-center items-center rounded-full"
              title="Select Language"
            >
              <FontAwesomeIcon
                icon={faGlobe}
                className="dark:text-black text-white"
              />{" "}
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-boxdark ring-1 p-4 shadow-md rounded py-2">
                <button
                  onClick={() => changeYourLanguage("en")}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left hover:text-primary"
                  title="Switch to English"
                >
                  English
                </button>
                <span className="block border-t border-gray-200 my-2"></span>
                <button
                  onClick={() => changeYourLanguage("de")}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left hover:text-primary"
                  title="Switch to German"
                >
                  German
                </button>
              </div>
            )}
          </div>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <GoogleTranslation /> */}
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
