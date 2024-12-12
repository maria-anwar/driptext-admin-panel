import React, { ChangeEvent, useEffect, useState } from "react";
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
import { Task, Freelancer } from "../../Types/Type";
import { useTranslation } from "react-i18next";

interface TaskDetailModelProps {
  task: Task;
  closeModel: () => void;
  freelancer: Freelancer[];
  userId: string;
  projectId: string;
  projectName: string;
  handleRefreshData: () => void;
}

interface FormData {
  desiredWords: string;
  topic: string | null;
  keywords: string | null;
  projectId: string | null;
  projectName: string | null;
  userId: string | null;
  date: string | Date; // Initialize as null for date
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
  const {t} = useTranslation();
  const user = useSelector<any>((state) => state.user);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [userToken, setUserToken] = useState(user?.user?.token);

  const allRoles = ["Texter", "Lector","SEO-Optimizer"];

  const [showCard, setShowCard] = useState(task.readyToWork);
  const [memberModel, setMemberModel] = useState<boolean>(false);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    desiredWords: task.desiredNumberOfWords,
    topic: task.topic,
    textType: task.type,
    keywords: task.keywords,
    comments: task.comments,
    projectId: projectId,
    projectName: "",
    userId: userId,
    date: task?.dueDate,
    wordCount: task.desiredNumberOfWords,
  });

  useEffect(() => {
    let token = userToken;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      taskId: task._id,
    };
    axios
      .post(`${import.meta.env.VITE_DB_URL}/admin/wordCountTask`, payload)
      .then((response) => {
        console.log("word count");
      })
      .catch((err) => {
        console.error("Error updating word count of project:", err);
      });
  }, [task]);

  const validationSchema = Yup.object().shape({
    topic: Yup.string().required(t("projectDetails.taskDetailModel.formValidation.topicRequired")),
    textType: Yup.string().required(t("projectDetails.taskDetailModel.formValidation.textTypeRequired")),
    keywords: Yup.string().required(t("projectDetails.taskDetailModel.formValidation.keywordsRequired")),
    date: Yup.date().nullable().required(t("projectDetails.taskDetailModel.formValidation.dateRequired")),
  });

  const handleRoleSelect = (role: string, memberId: number) => {
    const token = userToken;
    axios.defaults.headers.common["access-token"] = token;

    const payload = {
      taskId: task._id,
      freelancerId: memberId?.toString(),
      role: role.toString(),
    };
    console.log(payload);

    axios
      .post(
        `${import.meta.env.VITE_DB_URL}/admin/assignFreelancersByTask`,
        payload
      )
      .then((response) => {
        const projectDataArray = response;
        console.log(payload);
        console.log(projectDataArray);
        setDropdownVisible(null);
        handleRefreshData();
        handleCloseMemberModel();
      })
      .catch((err) => {
        console.error(
          "Error fetching project details:",
          err.response || err.message || err
        );
        setDropdownVisible(null);
      });
  };

  const getAvailableRoles = () => {
    return allRoles;
  };

  const handleCloseMemberModel = () => {
    setMemberModel(false);
  };

  const toggleDropdown = (memberId: number) => {
    setDropdownVisible((prev) => (prev === memberId ? null : memberId));
  };

  const handleMembers = () => {
    setMemberModel(true);
    setDropdownVisible(null);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    closeModel();
  };

  const showAssignedRoles = (memberId: string | null) => {
    const foundFreelancer = freelancer.find((f) => f._id === memberId);
    if (foundFreelancer) {
      const fullName = `${foundFreelancer.firstName} ${foundFreelancer.lastName}`;
      return fullName;
    } else {
      return "";
    }
  };

  const onSubmit = async (values) => {
    setLoading(true);
    let localDate = new Date(values.date);
    let dueDateFormatted = localDate.toLocaleDateString("en-CA"); // 'en-CA' uses YYYY-MM-DD format
    const payLoad = {
      taskId: task._id,
      dueDate: dueDateFormatted,
      topic: values.topic,
      keywordType: values.textType,
      keyword: values.keywords,
      comment: values.comments,
      wordCount: values.wordCount,
    };
    console.log(payLoad);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DB_URL}/admin/editTask`,
        payLoad
      );
      if (response.status === 200) {
        handleRefreshData();
        closeModel();
      }
    } catch (error) {
      const err = error.response.data.message || "Failed to update task";
      setError(true);
      setErrorMessage(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
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
                      {/* {t("projectDetails.taskDetailModel.title")} */}
                      Details zu {task.taskName} ({task.keywords})
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
                        {t("projectDetails.taskDetailModel.status")}
                      </p>
                      <p
                        className={`w-full py-0 text-sm uppercase  ${
                          task?.status.toUpperCase() === "FINAL"
                            ? " text-green-500"
                            : task.status.toUpperCase() === "FREE TRIAL"
                            ? " text-yellow-500"
                            : task.status.toUpperCase() === "READY TO WORK"
                            ? " text-yellow-500"
                            : task.status.toUpperCase() === "IN PROGRESS"
                            ? " text-blue-500"
                            : task.status.toUpperCase() ===
                              "READY FOR PROOFREADING"
                            ? " text-orange-500"
                            : task.status.toUpperCase() ===
                              "PROOFREADING IN PROGRESS"
                            ? " text-purple-500"
                            : task.status.toUpperCase() ===
                              "READY FOR SEO OPTIMIZATION"
                            ? " text-indigo-500"
                            : task.status.toUpperCase() ===
                              "SEO OPTIMIZATION IN PROGRESS"
                            ? " text-pink-500"
                            : task.status.toUpperCase() ===
                              "READY FOR 2ND PROOFREADING"
                            ? " text-sky-500" // New color for "READY FOR 2ND PROOFREADING"
                            : task.status.toUpperCase() ===
                              "2ND PROOFREADING IN PROGRESS"
                            ? " text-lime-700" // Different color for "2ND PROOFREADING IN PROGRESS"
                            : " text-violet-500"
                        }`}
                      >
                        {task.status}
                      </p>
                    </div>
                    <div className="w-1/2">
                      <label
                        className="text-black dark:text-white text-sm lg:text-sm font-semibold 2xl:font-semibold pb-1"
                        htmlFor="wordReal"
                      >
                       {t("projectDetails.taskDetailModel.wordReal")}

                      </label>
                      <p className="w-full py-2 text-black dark:text-white">
                      {Number(task?.actualNumberOfWords) ===1? 0 :task?.actualNumberOfWords}

                      </p>
                    </div>
                  </div>

                  <div className="w-full flex justify-between items-center   gap-2">
                    <div className="w-1/2 ml-1">
                      <label
                        className="mb-3  text-black dark:text-white text-sm lg:text-sm font-semibold 2xl:font-semibold"
                        htmlFor="document"
                      >
                        {t("projectDetails.taskDetailModel.document")}
                      </label>
                      <p className="w-full py-2 text-black dark:text-white">
                        <a
                          href={task?.fileLink}
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
                    <div className="w-1/2 ">
                      <GroupField
                        label={t("projectDetails.taskDetailModel.wordCountExpected")}
                        type="number"
                        placeholder="1500"
                        name="wordCount"
                        id="wordCount"
                        value={values.wordCount}
                        onChange={handleChange}
                        errors={touched.wordCount ? errors.wordCount : ""}
                        disabled={false}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center w-full gap-2 ">
                    <div className="w-full">
                      <GroupDateField
                        label={t("projectDetails.taskDetailModel.dueDate")}
                        name="date"
                        id="date"
                        value={values.date}
                        onChange={(date) => setFieldValue("date", date)}
                        errors={touched.date ? errors.date : ""}
                        minDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                        placeholderText="Choose a date"
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-center ">
                    <div className="w-full mr-1">
                      <GroupField
                        label={t("projectDetails.taskDetailModel.topic")}
                        type="text"
                        placeholder="topic"
                        name="topic"
                        id="topic"
                        value={values.topic}
                        onChange={handleChange}
                        errors={touched.topic ? errors.topic : ""}
                      />
                    </div>
                  </div>
                  <div className="w-full mr-1">
                    <GroupDropdownField
                      label={t("projectDetails.taskDetailModel.keywordsType")}
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
                  </div>

                  <GroupField
                    label={t("projectDetails.taskDetailModel.keyword")}
                    type="text"
                    placeholder="keywords"
                    name="keywords"
                    id="keywords"
                    value={values.keywords}
                    onChange={handleChange}
                    errors={touched.keywords ? errors.keywords : ""}
                  />

                  <GroupTextArea
                    label={t("projectDetails.taskDetailModel.comment")}
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
                      {t("projectDetails.taskDetailModel.projectMembers")}
                      </h3>
                      {!(task.texter && task.lector && task.seo) ? (
                      <p
                        className="w-5 h-5 bg-blue-500 text-white flex items-center justify-center cursor-pointer"
                        onClick={handleMembers}
                      >
                        <FontAwesomeIcon icon={faPlus} className="text-sm" />
                      </p>
                    ) : null}
                    </div>

                    <TaskMember
                      name={showAssignedRoles(task.texter) ?? ""}
                      label={t("projectDetails.projectMembers.freelancerRole.texter")}
                      handleMembers={handleMembers}
                      hide={false}
                    />
                    <TaskMember
                      name={showAssignedRoles(task.lector) ?? ""}
                      label={t("projectDetails.projectMembers.freelancerRole.lector")}
                      handleMembers={handleMembers}
                      hide={false}
                    />
                    <TaskMember
                      name={showAssignedRoles(task.seo) ?? ""}
                      label={t("projectDetails.projectMembers.freelancerRole.seo")}
                      handleMembers={handleMembers}
                      hide={false}
                    />
                    <TaskMember
                      name={showAssignedRoles(task.metaLector) ?? ""}
                      label={t("projectDetails.projectMembers.freelancerRole.metaLector")}
                      handleMembers={handleMembers}
                      hide={false}
                    />
                  </div>
                </div>

                <div className="flex justify-end items-center mt-6 gap-3">
                  <button
                    type="reset"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 bg-transparent border border-neutral-200 text-black dark:text-white rounded"
                  >
                    {t("projectDetails.taskDetailModel.cancelButton")}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-500/90 text-white rounded"
                  >
                    {loading ? t("projectDetails.taskDetailModel.submittingButton") : t("projectDetails.taskDetailModel.submitButton")}
                  </button>
                </div>
                {error && (
                  <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
                )}
              </div>
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
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TaskDetailModel;
