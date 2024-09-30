import React from "react";

const TaskComponent: React.FC<{ label: string; name: undefined | number | string }> = ({
  label,
  name,
}) => {


  return (
    <div >
      <p className="text-xs text-slate-700 dark:text-slate-300">{label}</p>
      <p className="text-black dark:text-white">{name}</p>
    </div>
  );
};

export default TaskComponent;
