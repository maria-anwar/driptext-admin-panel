import React from 'react';

interface InfoCardProps {
  title: string;
  revenue: string | number;
  cost: string | number;
  margin: string | number;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, revenue, cost, margin }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white pt-6 pb-6 shadow-default dark:border-strokedark dark:bg-boxdark px-7.5">
      <h2 className="text-lg font-semibold text-black dark:text-white ">
        {title}
      </h2>
      {/* Revenue, Cost, Margin */}
      <div className="mt-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Revenue:
          </span>
          <span className="text-sm font-medium text-black dark:text-white">
            ${revenue}
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Cost:
          </span>
          <span className="text-sm font-medium text-black dark:text-white">
            ${cost}
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Margin:
          </span>
          <span className="text-sm font-medium text-black dark:text-white">
            ${margin}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
