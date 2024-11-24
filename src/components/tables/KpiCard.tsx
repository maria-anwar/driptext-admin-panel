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

// Define the types for props
interface KpiCardProps {
  texter: number;
  lector: number;
  seo: number;
  meta: number;
  totalCost: number;
  income: number;
  margin: number;
}

// Reusable component for KPI card
const KpiBlock: React.FC<{ icon: React.ComponentProps<typeof FontAwesomeIcon>['icon'], title: string, value: number }> = ({ icon, title, value }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center gap-8 px-2 py-2">
        <div>
          <p className="bg-slate-200 dark:bg-boxdark-2 w-12 h-12 rounded-full flex justify-center items-center">
            <FontAwesomeIcon icon={icon} className="text-black dark:text-white w-6 h-6" />
          </p>
        </div>
        <div>
          <p className="text-black dark:text-white">{title}</p>
          <h1 className="text-black dark:text-white font-semibold text-2xl">€ {value}</h1>
        </div>
      </div>
    </div>
  );
};

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
      <KpiBlock icon={faMoneyBillWave} title="Texter Cost" value={texter} />
      <KpiBlock icon={faMoneyBillWave} title="Lector Cost" value={lector} />
      <KpiBlock icon={faMoneyBillWave} title="Seo Optimizer Cost" value={seo} />
      <KpiBlock icon={faMoneyBillWave} title="Meta-Lector Cost" value={meta} />
      <KpiBlock icon={faRocket} title="Total Revenue" value={income} />
      <KpiBlock icon={faUsers} title="Total Cost" value={totalCost} />
      <KpiBlock icon={faChartBar} title="Margin" value={margin} />
    </div>
  );
};

export default KpiCard;
