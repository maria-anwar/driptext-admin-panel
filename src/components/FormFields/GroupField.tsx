import React from "react";

interface GroupFieldProps{
  label: string;
  type: string ;
  placeholder: string;
  name: string;
  id: string;
  value: string | number  | undefined | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: string;
  disabled?: boolean;
}

export const GroupField:React.FC<GroupFieldProps> = ({
  label,
  type,
  placeholder,
  name,
  id,
  value,
  onChange,
  errors,
  disabled=false,
}) => {
  return (
    <>
      <div className="w-full flex flex-col gap-1 py-2.5">
        <label className="text-black dark:text-white text-sm lg:text-sm font-semibold  2xl:font-semibold pb-1">
          {label}
          <span className="text-red-600 text:lg 2xl:text-[17px] mt-6 pl-1">*</span>
        </label>
        <input
          className={`${disabled ? ' text-black bg-slate-200':''} placeholder:text-black/60 dark:placeholder:text-white/50 bg-slate-200 w-full text-black dark:text-white text-xs xs:text-sm px-2 xs:px-3.5 font-normal py-3 focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary rounded`}
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          errors={errors}
          disabled={disabled}
        />
        {errors ? <div className="text-sm text-red-700">{errors}</div> : ""}
      </div>
    </>
  );
};
