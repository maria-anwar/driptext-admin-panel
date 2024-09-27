import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface GroupDateFieldProps {
  label: string;
  name: string;
  id: string;
  value: Date | null; // Date or null for DatePicker
  onChange: (date: Date | null) => void; // Handle date change
  errors?: string;
  disabled?: boolean;
  minDate?: Date;
  dateFormat?: string;
  placeholderText?: string;
}

export const GroupDateField: React.FC<GroupDateFieldProps> = ({
  label,
  value,
  onChange,
  errors,
  minDate,
  dateFormat = "yyyy-MM-dd",
  placeholderText = "Select a date"
}) => {
  return (
    <div className="w-full flex flex-col gap-1 py-2.5">
      <label className="text-black dark:text-white text-sm lg:text-sm font-semibold 2xl:font-semibold pb-1">
        {label}
        <span className="text-red-600 text:lg 2xl:text-[17px] mt-6 pl-1">
          *
        </span>
      </label>
      <DatePicker
        className="w-full bg-slate-200 placeholder:text-black/60 dark:placeholder:text-white/50 rounded border border-transparent bg-gray-100 py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        minDate={minDate || new Date()}
        selected={value}
        onChange={onChange}
        dateFormat={dateFormat}
        placeholderText={placeholderText}
      />
      {errors ? <div className="text-sm text-red-700">{errors}</div> : null}
    </div>
  );
};
