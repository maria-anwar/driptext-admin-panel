import React from "react";

const CheckboxThree = () => {
  // const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div className="relative">
      <input type="checkbox" className="sr-only" checked />
      <div
        className={`box mr-4 flex h-4 w-4 items-center justify-center rounded border
              border-red-400 bg-gray dark:bg-transparent`}
      >
        <span className={`text-red-500 !opacity-100 `}>
          <svg
            className="h-3.5 w-3.5 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default CheckboxThree;
