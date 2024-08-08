import React, { useEffect, useState } from "react";
import { Product } from "../../../types/products";
import Breadcrumb from "../breeadcrumbs/Breadcrumb";
import { Checkbox } from "@material-tailwind/react";
import TableCheckbox from "../TableCheckbox";
import BlueBtn from "../buttons/BlueBtn";
import DarkBtn from "../buttons/DarkBtn";
import { Link, useLocation } from "react-router-dom";
import CheckboxThree from "../buttons/CheckboxThree";
import CheckboxTwo from "../buttons/CheckboxTwo";
import axios from "axios";
import { useSelector } from "react-redux";

const productData: Product[] = [
  {
    id: 0,
    // published: <CheckboxThree />,
    select: false,
    orderId: "96-DT-1",
    title: "Apple Watch Series 7",
    duration: "June 2024",
    keyword: "Test task",
    status: "In progress",
  },
  {
    id: 1,
    // published: <CheckboxThree />,
    select: false,
    orderId: "96-DT-2",
    title: "Apple Watch Series 7",
    duration: "June 2024",
    keyword: "Test task",
    status: "Uninitialized",
  },
  {
    id: 2,
    // published: <CheckboxThree />,
    select: true,
    orderId: "96-DT-3",
    title: "Apple Watch Series 7",
    duration: "June 2024",
    keyword: "Test task",
    status: "Ready to Start",
  },
  {
    id: 3,
    // published: <CheckboxThree />,
    select: true,
    orderId: "96-DT-4",
    title: "Apple Watch Series 7",
    duration: "June 2024",
    keyword: "Test task",
    status: "In progress",
  },
  {
    id: 4,
    // published: <CheckboxThree />,
    select: true,
    orderId: "96-DT-4",
    title: "Apple Watch Series 7",
    duration: "June 2024",
    keyword: "Test task",
    status: "Ready For Proofreading",
  },
  {
    id: 5,
    // published: <CheckboxThree />,
    select: false,
    orderId: "96-DT-4",
    title: "Apple Watch Series 7",
    duration: "June 2024",
    keyword: "Test task",
    status: "Final",
  },
];
const data = [
  { id: 1, title: "Article 1", published: true },
  { id: 2, title: "Article 2", published: false },
  { id: 3, title: "Article 3", published: true },
  { id: 4, title: "Article 3", published: true },
  { id: 5, title: "Article 3", published: true },
  { id: 6, title: "Article 3", published: true },
];

const Checkbox1 = () => (
  <div className="relative">
    <input type="checkbox" id="checkboxLabelThree" className="sr-only" />
    <div
      className={`box mr-4 flex h-4 w-4 items-center justify-center rounded border
      border-red-400 bg-gray dark:bg-transparent`}
    >
      <span className={`text-red-500 !opacity-100 `}>
        <svg
          className="h-3.5 w-3.5 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </span>
    </div>
  </div>
);

const Checkbox2 = () => (
  <div className="relative">
    <input type="checkbox" id="checkboxLabelTwo" className="sr-only" />
    <div
      className={`mr-4 flex h-4 w-4 items-center justify-center rounded border border-success bg-gray dark:bg-transparent`}
    >
      <span className={`text-success !opacity-100`}>
        <svg
          width="11"
          height="8"
          viewBox="0 0 11 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* #3056D3  */}
          <path
            d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
            fill="#219653"
            stroke="#219653"
            strokeWidth="0.4"
          ></path>
        </svg>
      </span>
    </div>
  </div>
);

const TaskTable = () => {
  const location = useLocation();
  const { projectId } = location.state || {};

  const user = useSelector((state) => state.user);

  const [taskData, setTaskData] = useState([]);
  const [userToken, setUserToken] = useState(user.user.token);
  const [openBarIndex, setOpenBarIndex] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);


  useEffect(() => {
    let token = userToken;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      projectId: projectId,
    };

    axios
    .post("https://driptext-api.vercel.app/api/project/tasks/detail", payload)
    .then((response) => {
      const tasks = response.data.data;
      if (Array.isArray(tasks)) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        setTaskData(tasks);
      } else {
        console.error("Received data is not an array");
      }
      setRefreshTrigger(0);
    })
    .catch((err) => {
      console.error("Error fetching project details:", err);
      setRefreshTrigger(0);
    });
  }, [projectId,refreshTrigger]);



  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const tasks = JSON.parse(storedTasks);
        if (Array.isArray(tasks)) {
          setTaskData(tasks);
        } else {
          console.error("Stored data is not an array");
        }
        setRefreshTrigger(0);
      } catch (error) {
        console.error("Error parsing stored tasks:", error);
        setRefreshTrigger(0);
      }
    }
  }, [projectId,refreshTrigger]);
  

  const handleCheckboxClick = () => {
    setOpenBarIndex(!openBarIndex);
  };

  // const [data, setData] = useState(productData);
  // const [editing, setEditing] = useState(null);

  // const startEditing = (id) => {
  //   console.log("editing", id);
  //   setEditing(id);
  // };

  // const selectCheckbox = (id, symbol) => {
  //   console.log("symbol");
  //   setData((prevData) =>
  //     prevData.map((item) =>
  //       item.id === id ? { ...item, published: symbol } : item
  //     )
  //   );
  //   setEditing(null);
  // };

  // const renderCheckbox = (symbol, id) => {
  //   const handleClick = () => startEditing(id);

  //   return React.cloneElement(symbol, { onClick: handleClick });
  // };

  const handleCrossApi =  (projectTaskId) => {
    let token = userToken;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      projectId: projectId,
      projectTaskId: projectTaskId,
    };

      axios
      .post(
        "https://driptext-api.vercel.app/api/project/tasks/projecttaskupdate",
        payload
      )
      .then((response) => {
        setRefreshTrigger(prev => prev + 1);

      })
      .catch((err) => {
        console.error("Error fetching project details:", err);
      });
  };

  // Define handleTickApi using Axios
  const handleTickApi =  (projectTaskId) => {
    let token = userToken;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      projectId: projectId,
      projectTaskId: projectTaskId,
    };

    axios
      .post(
        "https://driptext-api.vercel.app/api/project/tasks/projecttaskupdate",
        payload
      )
      .then((response) => {
        setRefreshTrigger(prev => prev + 1);

      })
      .catch((err) => {
        console.error("Error fetching project details:", err);
      });
  };

  

  return (
    <>
      <div className="2xl:px-6 3xl:px-10">
        <Breadcrumb pageName="Project Tasks" />
        <div className="w-full flex justify-start 2xl:justify-end mb-5">
          <DarkBtn
            name={"Extend Monthly Package"}
            url={"https://driptext.de/buchung/"}
          />
        </div>
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Order Id
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="min-w-[170px] py-4 px-4 font-medium text-black dark:text-white">
                    Service Duration
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Keyword
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Published
                  </th>
                </tr>
              </thead>
              <tbody>
                {taskData.map((task, index) => (
                  <tr key={task._id}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-5 sm:pl-9 dark:border-strokedark xl:pl-11">
                      <Link to="#" className="text-blue-500 text-sm">
                        {"DT-"}
                        {task._id.slice(-4)}
                      </Link>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          task.status === "Final"
                            ? "bg-success text-success"
                            : task.status === "Not initalized"
                            ? "bg-danger text-danger"
                            : task.status === "Ready to Start"
                            ? "bg-warning text-warning"
                            : task.status === "Ready For Proofreading"
                            ? "bg-warning text-warning"
                            : "bg-blue-400 text-blue-400"
                        }`}
                      >
                        {task.status}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-5  dark:border-strokedark ">
                      <p className="text-sm">{task.serviceDuration}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {task.keywords}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                      <p className="text-black dark:text-white flex-inline justify-center pl-5">
                        <div
                          onClick={
                            task.status === "ready to start"
                              ? handleCheckboxClick
                              : ""
                          }
                          className="cursor-pointer"
                        >
                          {task.published === false ? (
                            <Checkbox1 />
                          ) : (
                            <Checkbox2 />
                          )}
                        </div>
                        <div className="relative w-full">
                          <div className="absolute right-20">
                            {openBarIndex && (
                              <div className="w-full py-2 pl-3 flex mt-2 space-x-2 border border-zinc-200 bg-white shadow-md">
                                <div
                                  onClick={() => {
                                    handleCheckboxClick()
                                    if (task.published === true) {
                                      handleCrossApi(task._id);
                                    }
                                  }}
                                  className="cursor-pointer"
                                >
                                  <Checkbox1 />
                                </div>
                                <div
                                  onClick={() => {
                                    handleCheckboxClick()
                                    if (task.published === false) {
                                      handleTickApi(task._id);
                                    }
                                  }}
                                  className="cursor-pointer"
                                >
                                  <Checkbox2 />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default TaskTable;
