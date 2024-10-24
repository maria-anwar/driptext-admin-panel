import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import KpiTable from "../../../components/tables/KpiTable";

const KPI: React.FC = () => {
  const user = useSelector<any>((state) => state.user);
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user){
    getTaskData();
    }
  }, [user]);

  const getTaskData = async () => {
    let token = user?.user?.token;
    axios.defaults.headers.common["access-token"] = token;
    await axios
      .get(`${import.meta.env.VITE_DB_URL}/admin/getAllClients`)
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project details:", err);
        setLoading(false);
      });
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
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary">KPI</li>
        </ol>
      </div>
      <div className="flex justify-between items-center relative">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white pb-2 lg:pb-0">
          KPI
        </h2>
      </div>
      {loading ? (
        <div className="mt-4 rounded-sm border border-stroke pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 w-full bg-slate-200 h-[350px] animate-pulse"></div>
      ) : (
        <KpiTable users={users} />
      )}
    </div>
  );
};

export default KPI;
