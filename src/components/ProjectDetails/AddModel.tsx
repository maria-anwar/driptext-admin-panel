import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";

interface AddModelProps {
  handleCloseAdd: () => void;
}

const AddModel: React.FC<AddModelProps> = ({ handleCloseAdd }) => {
  const [date, setDate] = useState("");
  return (
    <div className="w-auto fixed inset-0 flex items-center justify-center z-[9999] bg-neutral-200 dark:bg-slate dark:bg-opacity-15 bg-opacity-60 px-4">
      <div className="bg-white dark:bg-black p-6 rounded shadow-lg lg:w-6/12 xl:w-6/12 2xl:w-6/12 3xl:w-5/12 max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold dark:text-white pr-12">Add Task</h2>
          <FontAwesomeIcon
            className="cursor-pointer text-lg text-red-500 pl-12"
            onClick={handleCloseAdd}
            icon={faTimes}
          />
        </div>
        <div>
          <div className="w-full py-2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="dueUntil"
            >
              Due until
            </label>
            <DatePicker
              className="w-full rounded border border-transparent bg-gray-100 py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              minDate={new Date()}
              selected={"2025-01-01"}
              onChange={(date: Date | null) => setDate("2025-04-05")}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
            />
          </div>

          <div className="w-full py-2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="topic"
            >
              Topic
            </label>
            <input
              className="w-full rounded border border-transparent bg-gray py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="topic"
              id="topic"
              placeholder="topic"
              defaultValue={""}
            />
          </div>
          <div className="w-full py-2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="Keywords"
            >
              Keyword
            </label>
            <input
              className="w-full rounded border border-transparent bg-gray py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="Keyword"
              id="Keywords"
              placeholder="Keywords"
              defaultValue={""}
            />
          </div>
          <div className="w-full py-2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="dropdown"
            >
              Text type
            </label>
            <div className="relative">
              {" "}
              <select
                id="dropdown"
                className="w-full appearance-none rounded border border-transparent bg-gray py-2.5 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              >
                <option>Guide</option>
                <option>Shop (Category)</option>
                <option>Shop (Product)</option>
                <option>Definition/Wiki</option>
                <option>Shop (Home page)</option>
                <option>CMS page</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                {/* Custom arrow icon */}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full py-2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="wordExpected"
            >
              Word Count Expected
            </label>
            <input
              className="w-full  rounded border border-transparent bg-gray py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="number"
              name="wordExpected"
              id="wordExpected"
              placeholder="1500"
              min={0}
            />
          </div>
          <div className="w-full py-2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white "
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              id="comment"
              rows={3}
              className="w-full rounded border border-transparent bg-gray py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>
          <button
            className="w-full my-3 flex justify-center rounded bg-primary py-1.5 px-6 font-medium text-gray hover:bg-opacity-90"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModel;
