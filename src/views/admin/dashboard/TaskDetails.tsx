import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import formatDate from "../../../components/Helpers/DateFormat";
import getInitials from "../../../components/Helpers/UpperCaseName";
import useTitle from "../../../hooks/useTitle";
import { useTranslation } from "react-i18next";

const TaskDetails: React.FC = () => {
  const {t,i18n} = useTranslation();
  const user = useSelector<any>((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [taskdetails, setTaskDetails] = useState(null);
  const [project, setproject] = useState(null);
  const taskId = localStorage.getItem("taskID");
  const currentLanguage = i18n.language;

  useEffect(() => {
    getTaskData();
  }, [taskId]);

  const getTaskData = async () => {
    setLoading(true);
    let token = user?.user?.token;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      taskId: taskId,
    };
    await axios
      .post(`${import.meta.env.VITE_DB_URL}/admin/getTaskDetail`, payload)
      .then((response) => {
        const task = response?.data?.data;
        setTaskDetails(task);
        setproject(task.project);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project details:", err);
      });
  };
  useTitle(`${taskdetails?.taskName ?? ''}:Task`);

  const statusMap: { [key: string]: string } = {
    "ready to work": "Bereit zu starten",
    "in progress": "In Bearbeitung",
    "ready for rivision (lector)": "Bereit für Revision (Lektor)",
    "in rivision (lector)": "In Revision (Lektor)",
    "ready for rivision (meta lector)": "Bereit für Revision (Meta-Lektor)",
    "in rivision (meta lector)": "In Revision (Meta-Lektor)",
    "ready for proofreading": "Wird lektoriert",
    "proofreading in progress": "Im Lektorat",
    "ready for seo optimization": "Bereit für SEO-Optimierung",
    "seo optimization in progress": "Wird SEO-optimiert",
    "ready for 2nd proofreading": "Im Meta-Lektorat",
    "2nd proofreading in progress": "Im Meta-Lektorat",
    "free trial": "Kostenlose Testversion",
    "final": "Texterstellung abgeschlossen"
  };
  
  const handleStatusGerman = (statusFilter: string): string => {
    return currentLanguage === "de" && statusMap[statusFilter]
      ? statusMap[statusFilter]  
      : statusFilter;           
  };


  const FreelancerInfo = ({ label, name }) => {
    return (
      <div>
        <p className="text-sm">{label}</p>
        <div className="flex justify-between items-center py-1.5">
          <div className="flex justify-start items-center">
          <p className="text-black uppercase w-7 h-7 text-center dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs  flex justify-center items-center">
          {getInitials(name)}
            </p>
            <p className="px-2.5 text-black dark:text-white">{name}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto 3xl:px-4">
      <div className="flex items-center justify-between space-x-4 mb-6 mt-2">
        <ol className="flex items-center gap-2 text-left">
          <li>
            <Link
              className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
              to="/dashboard"
            >
             {t('taskDetailPage.breadcrumb.dashboard')}{" "}
              <Link
                className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
                to="/dashboard/tasks"
              >
               {t('taskDetailPage.breadcrumb.tasks')}
              </Link>
            </Link>
          </li>
          <li className="font-medium text-primary"> {t('taskDetailPage.breadcrumb.taskDetail')}</li>
        </ol>
      </div>
      <h2 className="text-title-md2 font-semibold text-black dark:text-white pb-2 lg:pb-0">
      {t('taskDetailPage.breadcrumb.taskDetail')}
      </h2>
      {loading ? (
        <div className="grid grid-cols-5 gap-8 mt-6">
          <div className="col-span-5 xl:col-span-3 rounded-sm border border-stroke  pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1   w-full bg-slate-200 h-[350px] animate-pulse"></div>
          <div className=" col-span-5 xl:col-span-2 rounded-sm border border-stroke  pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1   w-full bg-slate-200 h-[350px] animate-pulse"></div>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-8 mt-6">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="py-6 px-7 dark:border-strokedark">
                <p className="text-xl font-semibold text-black dark:text-white pb-2">
                  {project?.projectName}
                  {" | "}
                  {project?.projectId}
                </p>
                <div className="py-2">
                  <h3 className="font-medium text-black dark:text-white">
                   {t('taskDetailPage.project.client')}
                  </h3>
                  <p className="text-sm text-black dark:text-white">
                    {taskdetails?.user?.firstName} {taskdetails?.user?.lastName}{" "}
                    {"("}
                    {taskdetails?.user?.email}
                    {")"}
                  </p>
                </div>

                <div className="pt-1 pb-3">
                  <h2>{t('taskDetailPage.project.folder')}</h2>
                  <a
                    href={project?.folderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline-none flex justify-start items-center py-1"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5.5 h-5.5"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5"
                          stroke="#3b82f6"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                    </svg>

                    <span className="px-1">{project?.projectId}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="pt-8 pb-4 px-7 dark:border-strokedark flex justify-between items-center">
                <h3 className="font-medium text-black dark:text-white">
                {t('taskDetailPage.taskFreelancer')}
                </h3>
              </div>
              <div className="px-7">
                {taskdetails?.texter && (
                  <FreelancerInfo
                    label=  {t('taskDetailPage.freelancerInfo.texter')}
                    name={`${taskdetails.texter.firstName ?? ""} ${
                      taskdetails.texter.lastName ?? ""
                    }`}
                  />
                )}
                {taskdetails?.lector && (
                  <FreelancerInfo
                    label={t('taskDetailPage.freelancerInfo.lector')}
                    name={`${taskdetails.lector.firstName ?? ""} ${
                      taskdetails.lector.lastName ?? ""
                    }`}
                  />
                )}
                {taskdetails?.seo && (
                  <FreelancerInfo
                    label={t('taskDetailPage.freelancerInfo.seo')}
                    name={`${taskdetails.seo.firstName ?? ""} ${
                      taskdetails.seo.lastName ?? ""
                    }`}
                  />
                )}
                {taskdetails?.metaLector && (
                  <FreelancerInfo
                    label={t('taskDetailPage.freelancerInfo.metaLector')}
                    name={`${taskdetails.metaLector.firstName ?? ""} ${
                      taskdetails.metaLector.lastName ?? ""
                    }`}
                  />
                )}
              </div>

              <div className="px-7 py-2.5"></div>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <div className="grid grid-cols-5 gap-8 mt-6">
          <div className="col-span-5 rounded-sm border border-stroke  pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1   w-full bg-slate-200 h-[350px] animate-pulse"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="col-span-1 md:col-span-2">
            <div className="rounded border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex justify-start items-start flex-col">
                  <span className="text-sm">{t('taskDetailPage.taskInfo.taskName')}:</span>
                  <span className=" text-black dark:text-white">
                    {taskdetails?.taskName || ""}
                  </span>
                </div>
                <div className="flex justify-start items-start flex-col">
                  <span className="text-sm">{t('taskDetailPage.taskInfo.topic')}:</span>
                  <span className=" text-black dark:text-white">
                    {taskdetails?.topic || ""}
                  </span>
                </div>
                <div className="flex justify-start items-start flex-col">
                  <span className="text-sm">{t('taskDetailPage.taskInfo.type')}:</span>
                  <span className=" text-black dark:text-white">
                    {taskdetails?.type || ""}
                  </span>
                </div>
                <div className="flex justify-start items-start flex-col">
                  <span className="text-sm">{t('taskDetailPage.taskInfo.status')}:</span>
                  <span
                    className={`text-sm uppercase text-center py-0.5 px-3 rounded-full
                      ${
                        {
                          FINAL: "bg-green-500/20 text-green-500",
                          "FREE TRIAL": "bg-yellow-500/20 text-yellow-500",
                          "READY TO WORK": "bg-yellow-500/20 text-yellow-500",
                          "IN PROGRESS": "bg-blue-500/20 text-blue-500",
                          "READY FOR PROOFREADING":
                            "bg-orange-500/20 text-orange-500",
                          "PROOFREADING IN PROGRESS":
                            "bg-purple-500/20 text-purple-500",
                          "READY FOR SEO OPTIMIZATION":
                            "bg-indigo-500/20 text-indigo-500",
                          "SEO OPTIMIZATION IN PROGRESS":
                            "bg-pink-500/20 text-pink-500",
                          "READY FOR 2ND PROOFREADING":
                            "bg-violet-500/20 text-violet-500", // New color for "READY FOR 2ND PROOFREADING"
                          "2ND PROOFREADING IN PROGRESS":
                            "bg-lime-300/20 text-lime-700", // Different color for "2ND PROOFREADING IN PROGRESS"
                        }[taskdetails?.status?.toUpperCase()] ||
                        "bg-red-500/20 text-red-500"
                      }`}
                  >
                    {handleStatusGerman(taskdetails?.status?.toLowerCase()) || ""}
                  </span>
                </div>
                <div className="flex justify-start items-start flex-col">
                  <span className="text-sm">{t('taskDetailPage.taskInfo.actualWords')}:</span>
                  <span className=" text-black dark:text-white">
                  {Number(taskdetails?.actualNumberOfWords) ===1? 0 :taskdetails?.actualNumberOfWords}

                  </span>
                </div>
                <div className="flex justify-start items-start flex-col">
                  <span className="text-sm">{t('taskDetailPage.taskInfo.desiredWords')}:</span>
                  <span className=" text-black dark:text-white">
                    {taskdetails?.desiredNumberOfWords || ""}
                  </span>
                </div>
                <div className="flex justify-start items-start flex-col">
                  <span className="text-sm">{t('taskDetailPage.taskInfo.dueDate')}:</span>
                  <span
                    className={`text-sm text-white px-2 py-0.5 rounded-full text-center flex justify-center items-center 
                    ${new Date(taskdetails?.dueDate).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0) || taskdetails?.status==='Final' ? 'bg-green-600' : 'bg-red-600'}
                    `}
                  >
                   <span className="px-1">
                      {taskdetails?.status==='Final' ? "Finished" :formatDate(taskdetails?.dueDate)}
                      </span>
                  </span>
                </div>
                <div className="flex justify-start items-start flex-col">
                  <span className="text-sm">{t('taskDetailPage.taskInfo.keywords')}:</span>
                  <span className=" text-black dark:text-white">
                    {taskdetails?.keywords || " "}
                  </span>
                </div>
                <div className="flex justify-start items-start flex-col">
                  <span className="text-sm">{t('taskDetailPage.taskInfo.fileLink')}:</span>
                  <a
                    href={taskdetails?.fileLink || "#"}
                    className="text-blue-500 "
                  >
                    {taskdetails?.fileLink ? t('taskDetailPage.taskInfo.fileLink') : " "}
                  </a>
                </div>
                <div className="flex justify-start items-start flex-col">
                  <span className="text-sm">{t('taskDetailPage.taskInfo.comments')}:</span>
                  <span className=" text-black dark:text-white">
                    {taskdetails?.comments || t('taskDetailPage.taskInfo.noComments')}
                  </span>
                </div>
                <div className="flex justify-start items-start flex-col">
                  <span className="text-sm">{t('taskDetailPage.taskInfo.feedback')}:</span>
                  <span className=" text-black dark:text-white">
                    {taskdetails?.feedback || t('taskDetailPage.taskInfo.noFeedback')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
