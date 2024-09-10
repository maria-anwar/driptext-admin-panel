import React, { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/accordion";
import {
  faFolder,
  faTimes,
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "antd/dist/reset.css";
import ToggleSwitch from "../buttons/ToggleButton";
import MemberModal from "../ProjectDetails/MemberModel";
import TaskMember from "./TaskMembers";
import GroupTextArea from "../FormFields/GroupTextArea";
import { GroupDateField } from "../FormFields/GroupDateField";
import { GroupField } from "../FormFields/GroupField";
import GroupDropdownField from "../FormFields/GroupDropdownField";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  freelancer: any;
  userId: string;
  projectId: string;
  projectName: string;
  handleRefreshData: () => void;
}

interface FormData {
  desiredWords: string;
  topic: string | null;
  type: string | null;
  keywords: string | null;
  projectId: string | null;
  projectName: string | null;
  userId: string | null;
  date: string | null; // Initialize as null for date
  textType: string | null;
  wordCount: 1500;
  comments: string | null;
  companyInfo: string | null;
  companyAttributes: string | null;
  services: string | null;
  content: string | null;
  customers: string | null;
  contentPurpose: string | null;
  brand: string | null;
}
const TaskDetailModel: React.FC<TaskDetailModelProps> = ({
  task,
  closeModel,
  freelancer,
  userId,
  projectId,
  projectName,
  handleRefreshData,
}) => {
  const user = useSelector<any>((state) => state.user);
  const [userToken, setUserToken] = useState(user.user.token);
  const [date, setDate] = useState<Date | null>(
    task.dueDate ? new Date(task.dueDate) : null
  );

  const allRoles = ["texter", "lector", "seo-optimizer"];
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
    projectId: projectId,
    projectName: "",
    userId: userId,
    date: task?.dueDate, // Initialize as null for date
    textType: "",
    wordCount: task.desiredNumberOfWords,
    companyInfo: task.onBoarding.companyBackgorund,
    companyAttributes: task.onBoarding.companyAttributes,
    services: task.onBoarding.comapnyServices,
    content: task.onBoarding.customerContent,
    customers: task.onBoarding.customerIntrest,
    contentPurpose: task.onBoarding.contentPurpose,
    brand: task.onBoarding.contentInfo,
  });

  const validationSchema = Yup.object().shape({
    desiredWords: Yup.string().required("Please enter desired number of words"),
    topic: Yup.string().required("Please select a topic"),
    type: Yup.string().required("Please select type"),
    keywords: Yup.string().required("Please select keywords"),
    comments: Yup.string(), // Allow comments to be optional
    date: Yup.date().nullable().required("Please select a date"), // Ensure date is required and nullable
    textType: Yup.string().required("Please select text type"),
    wordCount: Yup.number().required("Please enter word count"),
    companyInfo: Yup.string().required("Please enter company information"),
    companyAttributes: Yup.string().required(
      "Please enter company's attributes"
    ),
    services: Yup.string().required("Please enter company's services"),
    content: Yup.string().required("Above information is required"),
    customers: Yup.string().required("Above information is required"),
    contentPurpose: Yup.string().required("Above information is required"),
    brand: Yup.string().required("Above information is required"),
  });

  const handleCloseMemberModel = () => {
    setMemberModel(false);
  };

  const toggleDropdown = (memberId: number) => {
    setDropdownVisible((prev) => (prev === memberId ? null : memberId));
  };

  const getAvailableRoles = (memberId: number) => {
    return allRoles;
  };

  const handleRoleSelect = (role: string, memberId: number) => {
    const token = userToken;
    axios.defaults.headers.common["access-token"] = token;

    const payload = {
      taskId: task._id,
      freelancerId: memberId?.toString(),
      role: role.toString(),
    };
    console.log(payload); // Log payload to verify

    axios
      .post(
        `${import.meta.env.VITE_DB_URL}/admin/assignFreelancersByTask`,
        payload
      )
      .then((response) => {
        const projectDataArray = response;
        console.log(payload); // Log payload to verify
        console.log(projectDataArray); // Log payload to verify
        setDropdownVisible(null);
        handleRefreshData();
      })
      .catch((err) => {
        console.error(
          "Error fetching project details:",
          err.response || err.message || err
        );
        setDropdownVisible(null);
      });
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

  const handlePublishedTask = () => {
    setShowCard(!showCard);
  };

  const showAssignedRoles = (memberId: number) => {
    const foundFreelancer = freelancer.find((f) => f._id === memberId);
    if (foundFreelancer) {
      const fullName = `${foundFreelancer.firstName} ${foundFreelancer.lastName}`;
      return fullName;
    } else {
      return "";
    }
  };

  const onSubmit = async (values) => {
    // Combine form data and selected roles
    const combinedData = {
      ...values,
    };
    // console.log(JSON.stringify(combinedData)); // For debugging purposes
    // alert(JSON.stringify(combinedData, null, 2)); // Display the combined data in a readable format
    closeModel(); // Close the modal
  };

  return (
    <>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values, errors, touched, handleChange }) => (
          <Form>
            <div className="w-auto fixed inset-0 flex items-center justify-center z-[9999] bg-neutral-200 dark:bg-slate dark:bg-opacity-15 bg-opacity-60 px-4">
              <div className="bg-white dark:bg-black p-6 rounded shadow-lg lg:w-6/12 xl:w-6/12 2xl:w-6/12 3xl:w-6/12 max-h-[90vh] overflow-y-auto scrollbar-hide">
                <div className="space-y-1 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold dark:text-white">
                    Task Details
                  </h2>
                  <FontAwesomeIcon
                    className="cursor-pointer text-lg text-red-500 "
                    onClick={closeModel}
                    icon={faTimes}
                  />
                </div>
                <div className="w-full flex justify-between items-center gap-2 ">
                  <div className="w-1/2">
                    <p className="mb-3 block text-black dark:text-white text-sm lg:text-sm font-semibold 2xl:font-semibold">
                      Status
                    </p>
                    <p className={`w-full py-0 text-sm uppercase ${
                  task.status.toUpperCase() === "FINAL"
                    ? " text-success"
                    : task.status.toUpperCase() === "FREE TRIAL"
                    ? " text-warning"
                    : task.status.toUpperCase() === "READY TO START"
                    ? " text-warning"
                    : task.status.toUpperCase() ===
                      "READY FOR PROFEADING"
                    ? " text-warning"
                    : " text-violet-500"
                }`}>
                      {task.status}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <label
                      className="text-black dark:text-white text-sm lg:text-sm font-semibold 2xl:font-semibold pb-1"
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
                </div>

              

                
                
                    <div className="w-full flex justify-between items-center   gap-2">
                      <div className="w-1/2">
                        
                          <label
                            className="mb-3 block  text-black dark:text-white text-sm lg:text-sm font-semibold 2xl:font-semibold"
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
                      <div className="w-1/2 ">
                        <GroupField
                          label="Word Count Expected"
                          type="number"
                          placeholder="1500"
                          name="wordCount"
                          id="wordCount"
                          value={values.wordCount}
                          onChange={handleChange}
                          errors={touched.wordCount ? errors.wordCount : ""}
                          defaultValue={1500}
                        />
                      </div>
                    </div>
                  
                  <div className="flex justify-between items-center w-full gap-2 ">
                    <div className="w-1/2 mr-1">
                      <GroupDateField
                        label="Due Date"
                        name="date"
                        id="date"
                        value={values.date}
                        onChange={(date) => setFieldValue("date", date)}
                        errors={touched.date ? errors.date : ""}
                        minDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Choose a date"
                      />
                    </div>
                    <div className="w-1/2 ml-1">
                      <label
                        className="mb-3  text-black dark:text-white text-sm lg:text-sm font-semibold 2xl:font-semibold"
                        htmlFor="document"
                      >
                        Document
                      </label>
                      <p className="w-full py-2 text-black dark:text-white">
                        <a
                          href={task.googleLink || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline-none"
                        >
                          <FontAwesomeIcon
                            icon={faFolder}
                            className="text-blue-500"
                          />
                          {""} {task.taskName ?? ""}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-center ">
                    <div className="w-full mr-1">
                      <GroupField
                        label="Topic"
                        type="text"
                        placeholder="topic"
                        name="topic"
                        id="topic"
                        value={values.topic}
                        onChange={handleChange}
                        errors={touched.topic ? errors.topic : ""}
                      />
                    </div>
                    {/* <div className="w-1/2 mr-1">
                      <GroupDropdownField
                        label="Text type"
                        type="text"
                        id="textType"
                        name="textType"
                        placeholder=""
                        option1="Guide"
                        option2="Shop (Category)"
                        option3="Shop (Product)"
                        option4="Definition/Wiki"
                        option5="Shop (Home page)"
                        option6="CMS page"
                        value={values.textType}
                        errors={touched.textType ? errors.textType : ""}
                        onChange={handleChange}
                      />
                    </div> */}
                  </div>

                  <GroupField
                    label="Keyword"
                    type="text"
                    placeholder="keywords"
                    name="keywords"
                    id="keywords"
                    value={values.keywords}
                    onChange={handleChange}
                    errors={touched.keywords ? errors.keywords : ""}
                  />

                  <Accordion
                    allowToggle
                    className={`appearance-none border-none py-4 `}
                  >
                    <AccordionItem
                      className={`border-none bg-slate-100 dark:bg-meta-4 rounded`}
                    >
                      {({ isExpanded }) => (
                        <>
                          <h2>
                            <AccordionButton className="flex justify-between items-center ">
                              <p className=" text-black dark:text-white">
                                OnBoarding
                              </p>
                              {isExpanded ? (
                                <MinusIcon fontSize="12px" />
                              ) : (
                                <AddIcon fontSize="12px" />
                              )}
                            </AccordionButton>
                          </h2>
                          <AccordionPanel className="" pb={4}>
                            <div className="bg-white dark:bg-boxdark rounded py-2 px-4">
                              <p className="dark:text-white pt-2">
                                1. General information:
                              </p>
                              <div className="px-2">
                                <p className="dark:text-white">Website</p>
                                <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                                  {projectName}
                                </p>
                              </div>

                              <div className="flex flex-col gap-3">
                                <h2 className="text-black dark:text-white text-base font-semibold lg:mt-3">
                                  2. Company Information
                                </h2>
                                <GroupTextArea
                                  label="Background information about the company"
                                  type="text"
                                  placeholder="Please describe here, ideally in just one sentence, what you do as a company, what you offer and how it helps the customer."
                                  id="companyInfo"
                                  name="companyInfo"
                                  value={values.companyInfo}
                                  errors={
                                    touched.companyInfo
                                      ? errors.companyInfo
                                      : ""
                                  }
                                  onChange={handleChange}
                                />

                                <GroupTextArea
                                  label="Which attributes best describe you as a company/your products/your services?"
                                  type="text"
                                  placeholder="Please give us as many attributes as you would like readers to perceive about you and your company in bullet points."
                                  id="companyAttributes"
                                  name="companyAttributes"
                                  value={values.companyAttributes}
                                  errors={
                                    touched.companyAttributes
                                      ? errors.companyAttributes
                                      : ""
                                  }
                                  onChange={handleChange}
                                />
                                <GroupTextArea
                                  label="What are your services?"
                                  type="text"
                                  placeholder="Please list all services offered online here."
                                  id="services"
                                  name="services"
                                  value={values.services}
                                  errors={
                                    touched.services ? errors.services : ""
                                  }
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="flex flex-col gap-3 py-3">
                                <h2 className="text-black dark:text-white text-base font-semibold lg:mt-3.5">
                                  3. Information About the Target Customers
                                </h2>
                                <GroupTextArea
                                  label="Who is the content written for?"
                                  type="text"
                                  placeholder="Please describe the target group as precisely as possible"
                                  id="content"
                                  name="content"
                                  value={values.content}
                                  errors={touched.content ? errors.content : ""}
                                  onChange={handleChange}
                                />

                                <GroupTextArea
                                  label="Customers we want to address have an interest in..."
                                  type="text"
                                  placeholder="Please list here in bullet points which problems you solve for customers."
                                  id="customers"
                                  name="customers"
                                  value={values.customers}
                                  errors={
                                    touched.customers ? errors.customers : ""
                                  }
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="flex flex-col gap-3 py-3">
                                <h2 className="text-black dark:text-white text-base font-semibold lg:mt-3.5">
                                  4. Aim of the Content
                                </h2>
                                <GroupTextArea
                                  label="What is the purpose of the content?"
                                  type="text"
                                  placeholder="Please briefly describe here how organic customers/readers should ideally react when they land on your site."
                                  id="contentPurpose"
                                  name="contentPurpose"
                                  value={values.contentPurpose}
                                  errors={
                                    touched.contentPurpose
                                      ? errors.contentPurpose
                                      : ""
                                  }
                                  onChange={handleChange}
                                />

                                <GroupTextArea
                                  label="Information about your brand and your content"
                                  type="text"
                                  placeholder="Please give us bullet points on how potential readers should describe the content they consume"
                                  id="brand"
                                  name="brand"
                                  value={values.brand}
                                  errors={touched.brand ? errors.brand : ""}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                  </Accordion>

                  <GroupTextArea
                    label="Comment"
                    type="text"
                    placeholder="Add any comments."
                    id="comments"
                    name="comments"
                    value={values.comments}
                    errors={touched.comments ? errors.comments : ""}
                    onChange={handleChange}
                  />

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
                          getAvailableRoles={getAvailableRoles}
                          handleRoleSelect={handleRoleSelect}
                        />
                      )}
                    </div>

                    <TaskMember
                      name={showAssignedRoles(task.texter) ?? ""}
                      label="Texter"
                      handleMembers={handleMembers}
                    />
                    <TaskMember
                      name={showAssignedRoles(task.lector) ?? ""}
                      label="Lector"
                      handleMembers={handleMembers}
                    />
                    <TaskMember
                      name={showAssignedRoles(task.seo) ?? ""}
                      label="SEO"
                      handleMembers={handleMembers}
                    />
                    <TaskMember
                      name={showAssignedRoles(task.metaLector) ?? ""}
                      label="Meta Lector"
                      handleMembers={handleMembers}
                    />
                  </div>
                </div>

                <div className="flex justify-end items-center mt-6 gap-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 bg-transparent border border-neutral-200 text-black dark:text-white rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={onSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TaskDetailModel;
