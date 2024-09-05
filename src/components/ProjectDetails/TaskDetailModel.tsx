import React, { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faTimes,
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "antd/dist/reset.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ToggleSwitch from "../buttons/ToggleButton";
import MemberModal from "../ProjectDetails/MemberModel";
import TaskMember from "./TaskMembers";

interface Task {
  actualNumberOfWords: number | null;
  comments: string | null;
  createdAt: string; // ISO 8601 date string
  desiredNumberOfWords: string; // or number, depending on how it is used
  dueDate: string | null; // ISO 8601 date string or null
  googleLink: string | null;
  isActive: "Y" | "N"; // Assuming 'Y' and 'N' are the only possible values
  keywords: string;
  lector: string | null;
  metaLector: string | null;
  project: string; // or a more specific type if it's an ObjectId
  published: boolean;
  readyToWork: boolean;
  seo: string | null;
  status: string;
  taskId: number;
  taskName: string;
  texter: string | null;
  topic: string | null;
  type: string | null;
  updatedAt: string; // ISO 8601 date string
  __v: number;
  _id: string; // or a more specific type if it's an ObjectId
}

interface TaskDetailModelProps {
  task: Task;
  closeModel: () => void;
}

interface FormData {
  desiredWords: string;
  topic: string | null;
  type: string | null;
  keywords: string | null;
  comments: string | null;
}

const TaskDetailModel: React.FC<TaskDetailModelProps> = ({
  task,
  closeModel,
  freelancer,
}) => {
  const [date, setDate] = useState<Date | null>(
    task.dueDate ? new Date(task.dueDate) : null
  );
  const allRoles = ["Texter", "Lector", "SEO", "Meta-lector"];
  const [showCard, setShowCard] = useState(task.readyToWork);
  const [memberModel, setMemberModel] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<{ [key: number]: string }>(
    {}
  );
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    desiredWords: task.desiredNumberOfWords,
    topic: task.topic,
    type: task.type,
    keywords: task.keywords,
    comments: task.comments,
  });
  const handleCloseMemberModel = () => {
    setMemberModel(false);
  };

  const toggleDropdown = (memberId: number) => {
    setDropdownVisible((prev) => (prev === memberId ? null : memberId));
  };
  const getAvailableRoles = (memberId: number) => {
    const usedRoles = Object.values(selectedRoles);
    return allRoles.filter((role) => !usedRoles.includes(role));
  };
  const handleRoleSelect = (role: string, memberId: number) => {
    setSelectedRoles((prevRoles) => ({
      ...prevRoles,
      [memberId]: role,
    }));
    setDropdownVisible(null);
    alert(`Added member ${memberId} as ${role}`);
  };
  const handleMembers = () => {
    setMemberModel(true);
    setDropdownVisible(null);
  };

  const handleEditData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    closeModel();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    alert(formData);
    closeModel();
  };

  const handlePublishedTask = () => {
    setShowCard(!showCard);
  };

  const getInitials = (name: string): string => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  return (
    <div className="w-auto fixed inset-0 flex items-center justify-center z-[9999] bg-neutral-200 dark:bg-slate dark:bg-opacity-15 bg-opacity-60 px-4">
      <div className="bg-white dark:bg-black p-6 rounded shadow-lg lg:w-6/12 xl:w-6/12 2xl:w-6/12 3xl:w-6/12 max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold dark:text-white">Task Details</h2>
          <FontAwesomeIcon
            className="cursor-pointer text-lg dark:text-white text-black"
            onClick={closeModel}
            icon={faTimes}
          />
        </div>
        <div className="flex justify-end items-end flex-col py-2 ">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="readyToWork"
          >
            Ready to Work
          </label>
          <ToggleSwitch
            icon={showCard ? faTimes : faCheck}
            isOn={showCard}
            onToggle={handlePublishedTask}
          />
        </div>

        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center w-full ">
            <div className="w-1/2">
              <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                Status
              </p>
              <p className="w-full py-0 text-black dark:text-white uppercase">
                {task.status}
              </p>
            </div>
            <div className="w-1/2 flex justify-between items-center ">
              <div className="w-1/2 mr-1">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="wordReal"
                >
                  Word Real
                </label>
                <p className="w-full py-2 text-black dark:text-white">
                  {task.actualNumberOfWords !== null
                    ? task.actualNumberOfWords
                    : "N/A"}
                </p>
              </div>
              <div className="w-1/2 ml-1">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="desiredWords"
                >
                  Word Expected
                </label>
                <input
                  className="w-full rounded border border-transparent bg-gray py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="number"
                  name="desiredWords"
                  id="desiredWords"
                  placeholder="1500"
                  min={0}
                  value={formData.desiredWords}
                  onChange={handleEditData}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-full ">
            <div className="w-1/2 mr-1">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="dueUntil"
              >
                Due Until
              </label>
              <DatePicker
                className="w-full rounded border border-transparent bg-gray py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                selected={date}
                minDate={new Date()} // Prevents selecting past dates
                dateFormat="yyyy-MM-dd"
                onChange={(date: Date | null) => setDate(date)}
              />
            </div>
            <div className="w-1/2 ml-1">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="document"
              >
                Document
              </label>
              <p className="w-full py-0 text-black dark:text-white">
                <a
                  href={task.googleLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  <FontAwesomeIcon icon={faFolder} className="text-blue-500" />
                  {""} {task.taskName ?? ""}
                </a>
              </p>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="w-1/2 mr-1">
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
                placeholder="Topic"
                value={formData.topic || ""}
                onChange={handleEditData}
              />
            </div>
            <div className="w-1/2 ml-1">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="type"
              >
                Text Type
              </label>
              <div className="relative">
                <select
                  id="type"
                  name="type"
                  className="w-full appearance-none rounded border border-transparent bg-gray py-2.5 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  value={formData.type || ""}
                  onChange={handleSelectChange}
                >
                  <option value="">Select Type</option>
                  <option value="Guide">Guide</option>
                  <option value="Shop (Category)">Shop (Category)</option>
                  <option value="Shop (Product)">Shop (Product)</option>
                  <option value="Definition/Wiki">Definition/Wiki</option>
                  <option value="Shop (Home page)">Shop (Home page)</option>
                  <option value="CMS page">CMS page</option>
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
          </div>
          <div className="w-full">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="keywords"
            >
              Keywords
            </label>
            <input
              className="w-full rounded border border-transparent bg-gray py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="keywords"
              id="keywords"
              placeholder="Keywords"
              value={formData.keywords || ""}
              onChange={handleEditData}
            />
          </div>
          <div className="w-full">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="comments"
            >
              Comment
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments || ""}
              onChange={handleEditData}
              className="w-full rounded border border-transparent bg-gray py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>
          <div className="w-full pt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-black dark:text-white">
                Project members
              </h3>
              <p
                className="w-5 h-5 bg-blue-500 text-white flex items-center justify-center cursor-pointer"
                onClick={handleMembers}
              >
                <FontAwesomeIcon icon={faPlus} className="text-sm" />
              </p>
              {memberModel && (
                <MemberModal
                  isOpen={memberModel}
                  freelancer={freelancer}
                  handleCloseMemberModel={handleCloseMemberModel}
                  toggleDropdown={toggleDropdown}
                  dropdownVisible={dropdownVisible}
                  getInitials={getInitials}
                  getAvailableRoles={getAvailableRoles}
                  handleRoleSelect={handleRoleSelect}
                />
              )}
            </div>

            <TaskMember name={"task.texter" ?? ""} label="Texter" />
            <TaskMember name={"task.lector" ?? ""} label="Lector" />
            <TaskMember name={"task.seo" ?? ""} label="SEO" />
            <TaskMember name={"task.metaLector" ?? ""} label="Meta-Lector" />
          </div>
          <div className="flex justify-end items-center pt-6 pb-2 space-x-4">
            <button
              className="flex justify-center bg-transparent rounded border border-stroke py-1.5 px-5 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="flex justify-center rounded bg-primary py-1.5 px-6 font-medium text-gray hover:bg-opacity-90"
              type="button"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModel;
