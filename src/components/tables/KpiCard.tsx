import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faChartBar,
  faUsers,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import "antd/dist/reset.css";
import "./custompagination.css";

interface KpiCardProps {
  texter: number;
  lector: number;
  seo: number;
  meta: number;
  totalCost: number;
  income: number;
  margin: number;
}

const KpiCard: React.FC<KpiCardProps> = ({
  texter,
  lector,
  seo,
  meta,
  totalCost,
  income,
  margin,
}) => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 4xl:grid-cols-4 gap-x-5 gap-y-5">
      {/* Cost Blocks with Font Awesome Icons */}
      <div className="rounded-sm border border-stroke bg-white px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center gap-8 px-2 py-2">
          <div>
            <p className="bg-slate-200 dark:bg-boxdark-2 w-12 h-12 rounded-full flex justify-center items-center">
              <FontAwesomeIcon
                icon={faMoneyBillWave}
                className="text-black dark:text-white w-6 h-6"
              />
            </p>
          </div>
          <div>
            <p className="text-black dark:text-white">Texter Cost</p>
            <h1 className="text-black dark:text-white font-semibold text-2xl">
              € {texter}
            </h1>
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center gap-8 px-2 py-2">
          <div>
            <p className="bg-slate-200 dark:bg-boxdark-2 w-12 h-12 rounded-full flex justify-center items-center">
              <FontAwesomeIcon
                icon={faMoneyBillWave}
                className="text-black dark:text-white w-6 h-6"
              />
            </p>
          </div>
          <div>
            <p className="text-black dark:text-white">Lector Cost</p>
            <h1 className="text-black dark:text-white font-semibold text-2xl">
              € {lector}
            </h1>
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center gap-8 px-2 py-2">
          <div>
            <p className="bg-slate-200 dark:bg-boxdark-2 w-12 h-12 rounded-full flex justify-center items-center">
              <FontAwesomeIcon
                icon={faMoneyBillWave}
                className="text-black dark:text-white w-6 h-6"
              />
            </p>
          </div>
          <div>
            <p className="text-black dark:text-white">Seo Optimizer Cost</p>
            <h1 className="text-black dark:text-white font-semibold text-2xl">
              € {seo}
            </h1>
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center gap-8 px-2 py-2">
          <div>
            <p className="bg-slate-200 dark:bg-boxdark-2 w-12 h-12 rounded-full flex justify-center items-center">
              <FontAwesomeIcon
                icon={faMoneyBillWave}
                className="text-black dark:text-white w-6 h-6"
              />
            </p>
          </div>
          <div>
            <p className="text-black dark:text-white">Meta-Lector Cost</p>
            <h1 className="text-black dark:text-white font-semibold text-2xl">
              € {meta}
            </h1>
          </div>
        </div>
      </div>


      <div className="rounded-sm border border-stroke bg-white px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center gap-8 px-2 py-2">
          <div>
            <p className="bg-slate-200 dark:bg-boxdark-2 w-12 h-12 rounded-full flex justify-center items-center">
              <FontAwesomeIcon
                icon={faRocket}
                className="text-black dark:text-white w-6 h-6"
              />
            </p>
          </div>
          <div>
            <p className="text-black dark:text-white">Total Revenue</p>
            <h1 className="text-black dark:text-white font-semibold text-2xl">
              € {income}
            </h1>
          </div>
        </div>
      </div>
      
      <div className="rounded-sm border border-stroke bg-white px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center gap-8 px-2 py-2">
          <div>
            <p className="bg-slate-200 dark:bg-boxdark-2 w-12 h-12 rounded-full flex justify-center items-center">
              <FontAwesomeIcon
                icon={faUsers}
                className="text-black dark:text-white w-6 h-6"
              />
            </p>
          </div>
          <div>
            <p className="text-black dark:text-white">Total Cost</p>
            <h1 className="text-black dark:text-white font-semibold text-2xl">
              € {totalCost}
            </h1>
          </div>
        </div>
      </div>


      <div className="rounded-sm border border-stroke bg-white px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center gap-8 px-2 py-2">
          <div>
            <p className="bg-slate-200 dark:bg-boxdark-2 w-12 h-12 rounded-full flex justify-center items-center">
              <FontAwesomeIcon
                icon={faChartBar}
                className="text-black dark:text-white w-6 h-6"
              />
            </p>
          </div>
          <div>
            <p className="text-black dark:text-white">Margin</p>
            <h1 className="text-black dark:text-white font-semibold text-2xl">
              € {margin}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
