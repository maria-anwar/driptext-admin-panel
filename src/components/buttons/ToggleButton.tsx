import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ToggleSwitchProps {
  icon: any;
  isOn: boolean;
  onToggle: (isOn: boolean) => void;
  hoverText?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  icon,
  isOn,
  onToggle,
  hoverText,
}) => {
  const handleToggle = () => {
    onToggle(!isOn);
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer group">
      {/* Tooltip text */}

      <input
        type="checkbox"
        className="sr-only peer"
        checked={isOn}
        onChange={handleToggle}
      />
      <div
        className={`flex ${
          isOn
            ? "justify-start pl-1.5 peer-checked:bg-blue-600"
            : "justify-end pr-1.5 dark:bg-graydark bg-slate-200"
        } items-center w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
      >
        <FontAwesomeIcon
          icon={icon}
          className="text-current"
          width="12"
          height="12"
        />
      </div>
      {hoverText && (
        <div className="z-99999 shadow-md w-max text-center absolute hidden group-hover:block top-0 -mt-7 left-1/2 transform -translate-x-1/2 bg-slate-100 ring-1 ring-slate-200v dark:ring-0 text-black dark:bg-black dark:text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {hoverText}
        </div>
      )}
    </label>
  );
};

export default ToggleSwitch;
