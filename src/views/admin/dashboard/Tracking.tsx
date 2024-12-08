import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import KpiInfoTable from "../../../components/tables/KpiInfoTable";
import useTitle from "../../../hooks/useTitle";
import { useTranslation } from "react-i18next";

const Tracking: React.FC = () => {
  const { t } = useTranslation();
  useTitle(t("track_forcast.tracking.trackingOverview"));
  const user = useSelector<any>((state) => state.user);
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const { fullName, clientId, email } = location.state || {}; // Destructure fullName from state

  useEffect(() => {
    if (user) {
      getTaskData();
    }
  }, [user]);

  const getTaskData = async () => {
    let token = user?.user?.token;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      clientId: clientId,
    };
    await axios
      .post(`${import.meta.env.VITE_DB_URL}/admin/getTracking`, payload)
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
              {t("track_forcast.breadcrumbs.dashboard")}{" "}
              <Link
                className="font-medium text-black hover:text-black dark:text-bodydark dark:hover:text-bodydark"
                to="/dashboard/kpi"
              >
                {t("track_forcast.breadcrumbs.kpi")}
              </Link>
            </Link>
          </li>
          <li className="font-medium text-primary">
            {t("track_forcast.breadcrumbs.tracking")}
          </li>
        </ol>
      </div>
      <div className="flex justify-between items-center relative">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white pb-2 lg:pb-0">
          {t("track_forcast.tracking.title")}
        </h2>
      </div>
      <div className="flex justify-start items-center mt-2 space-x-2">
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {fullName}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{`(${email})`}</p>
      </div>

      {loading ? (
        <div className="mt-4 rounded-sm border border-stroke pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 w-full bg-slate-200 h-[350px] animate-pulse"></div>
      ) : (
        <KpiInfoTable tableData={users} forecast={false} />
      )}
    </div>
  );
};

export default Tracking;
