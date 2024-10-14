import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TaskDetails: React.FC = () => {
  const user = useSelector<any>((state) => state.user);
  const [taskdetails, setTaskDetails] = useState(null);
  const [project, setproject] = useState(null);
  const taskId = localStorage.getItem("taskID");

  useEffect(() => {
    getTaskData();
  }, [taskId]);

  const getTaskData = async () => {
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
      })
      .catch((err) => {
        console.error("Error fetching project details:", err);
      });
  };
  console.log(taskdetails);
  console.log(project);
  return (
    <div className="mx-auto 3xl:px-4">
      <div className="flex items-center justify-between space-x-4 mb-6 mt-2">
        <ol className="flex items-center gap-2 text-left">
          <li>
            <Link
              className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
              to="/dashboard"
            >
              Dashboard /{" "}
              <Link
                className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
                to="/dashboard/tasks"
              >
                Tasks /
              </Link>
            </Link>
          </li>
          <li className="font-medium text-primary">Task Detail</li>
        </ol>
      </div>
      <h2 className="text-title-md2 font-semibold text-black dark:text-white pb-2 lg:pb-0">
        Task Detail
      </h2>
      <div className="grid grid-cols-5  mt-6">
        <div className="col-span-5">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="py-6 px-7 dark:border-strokedark">
              <div>
                <h1 className="dark:text-white text-black text-xl pt-1">
                  User
                </h1>
                <div className="w-full flex justify-between items-center gap-x-2">
                  <div className="w-1/2">
                    <label className="text-xs ">Name</label>
                    <h1 className="dark:text-white text-black text-base">
                      {taskdetails?.user.firstName} {taskdetails?.user.lastName}
                    </h1>
                  </div>
                  <div className="w-1/2">
                    <label className="text-xs ">Emails</label>
                    <h1 className="dark:text-white text-black text-base">
                      {taskdetails?.user.email}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <h1 className="dark:text-white text-black text-xl pb-2">
                  Project
                </h1>
                <div className="w-full flex justify-between items-center gap-x-2">
                  <div className="w-1/2">
                    <label className="text-xs ">Project name</label>
                    <h1 className="dark:text-white text-black text-base">
                      {project?.projectName}
                    </h1>
                  </div>
                  <div className="w-1/2">
                    <label className="text-xs ">Project Id</label>
                    <h1 className="dark:text-white text-black text-base">
                      {project?.projectId}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
