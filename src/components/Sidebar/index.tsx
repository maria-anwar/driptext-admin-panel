import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/homeimages/driptext-logo.png";
import SidebarIcons from "../icons/SidebarIcons";
import { useDispatch } from "react-redux";
import { clearPersistedState } from "../../redux/store";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("projectID");
    dispatch(clearPersistedState());
  };

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <div className="w-full flex items-center justify-normal gap-1.5 cursor-pointer">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-md " />
            <div>
              <h1 className="text-[17px] font-bold text-white">DRIPTEXT</h1>
              <p className="text-gray-900 text-bodydark2 text-[13px]">
                {t("logo.subtitle")}
              </p>
            </div>
          </div>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* SIDEBAR HEADER Ends */}

      {/* SIDEBAR MENU */}
      <div className="no-scrollbar h-full flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="h-full mt-5 py-4 px-4 lg:mt-6 lg:px-6">
          <div className="h-full">
            <div className="mb-6 h-full flex flex-col justify-between">
              <ul className="flex flex-col gap-1.5">
                <li>
                  <NavLink
                    to="/dashboard"
                    className={`group relative   flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname === "/dashboard" && "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    {SidebarIcons[0].dashboard}
                    {t("menu.projects")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="tasks"
                    className={`group relative   flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("tasks") && "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    {SidebarIcons[4].contact}
                    {t("menu.tasks")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="kpi"
                    className={`group relative   flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("kpi") && "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    {SidebarIcons[6].kpi}
                    {t("menu.kpis")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="freelancer-overview"
                    className={`group relative   flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("freelancer-overview") &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                   {SidebarIcons[6].freelancerOerview}

                    {t("menu.freelancerOverview")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="users"
                    className={`group relative   flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 hover:text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("users") && "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    {SidebarIcons[2].profile}
                    {t("menu.users")}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="system-settings"
                    className={`group relative   flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 hover:text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("system-settings") &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    {SidebarIcons[1].settings}
                    {t("menu.systemSettings")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    className={`group text-zinc-500   cursor-not-allowed relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out 
                      "bg-graydark dark:bg-meta-4" : ""
                   }`}
                  >
                    {SidebarIcons[5].edution}
                    {t("menu.driptextAcademy")}
                  </NavLink>
                </li>
              </ul>
              <ul className="flex flex-col gap-1.5">
                <li>
                  <NavLink
                    to="profile-settings"
                    className={`group relative flex    items-center gap-2.5 rounded-sm py-2 px-4 font-medium hover:text-bodydark1 text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("profile-settings") &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    {SidebarIcons[1].settings}
                    {t("menu.profileSettings")}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <hr className="text-zinc-600" />
        <ul>
          <li className="">
            <NavLink
              onClick={handleLogout}
              to="/"
              className={`group relative    flex items-center gap-2.5 rounded-sm py-4 px-4 lg:px-8 font-medium hover:text-bodydark1 text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
            >
              {SidebarIcons[3].auth}
              {t("logout")}
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
