import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface ToggleSwitchProps {
  icon: any;
  isOn: boolean;
  onToggle: (isOn: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({icon, isOn, onToggle }) => {
  const handleToggle = () => {
    onToggle(!isOn);
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isOn}
        onChange={handleToggle}
      />
      <div
        className={`flex ${
          isOn ? "justify-start pl-1.5 peer-checked:bg-blue-600" : "justify-end pr-1.5 dark:bg-graydark bg-slate-200"
        } items-center w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
      >
         <FontAwesomeIcon icon={icon} className="text-current" width="12" height="12" />

      </div>
    </label>
  );
};

export default ToggleSwitch;
