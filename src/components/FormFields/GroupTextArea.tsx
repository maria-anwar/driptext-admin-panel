import React from "react";

// Define the props interface
interface GroupTextAreaProps {
  label: string;
  type: string; // Optional, as textarea does not actually use this
  placeholder?: string;
  name: string;
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  errors?: string; // Optional, as errors might not always be present
}

// Use the props interface in the component
const GroupTextArea: React.FC<GroupTextAreaProps> = ({
  label,
  type,
  placeholder,
  name,
  id,
  value,
  onChange,
  errors,
}) => {
  return (
    <div className="w-full flex flex-col gap-2.5">
      <label className="text-black dark:text-white text-sm 3xl:text-[15px] font-semibold 2xl:font-semibold pt-0">
        {label}
        {name === "comment" ? (
          ""
        ) : (
          <span className="text-red-600 text:lg 2xl:text-[17px] mt-6 pl-1">
            *
          </span>
        )}
      </label>
      <textarea
        className="w-full text-black dark:text-white border border-transparent text-sm h-24 px-3 xs:px-3 py-2 font-normal rounded focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
      {errors && <div className="text-sm text-red-700">{errors}</div>}
    </div>
  );
};

export default GroupTextArea;
