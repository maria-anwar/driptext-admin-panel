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
  const { t, i18n } = useTranslation();
  const user = useSelector<any>((state) => state.user);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [userToken, setUserToken] = useState(user?.user?.token);

  const allRoles = [t('projectDetails.role.Texter'), t('projectDetails.role.Lektor'), t('projectDetails.role.SEO-Optimierer') ];

  const [showCard, setShowCard] = useState(task.readyToWork);
  const [memberModel, setMemberModel] = useState<boolean>(false);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const currentLanguage = i18n.language;

  if (currentLanguage === "de") {
    if (task.type === "Guide text") {
      task.type = "Ratgebertext";
    } else if (task.type === "Shop (Category)") {
      task.type = "Shop (Kategorie)";
    } else if (task.type === "Shop (Product)") {
      task.type = "Shop (Produkt)";
    } else if (task.type === "Definition/Wiki") {
      task.type = "Definition/Wiki"; // No change needed
    } else if (task.type === "Shop (Homepage)") {
      task.type = "Shop (Startseite)";
    } else if (task.type === "CMS Page") {
      task.type = "CMS-Seite";
    }
  }

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
  console.log("formData", formData);

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
    topic: Yup.string().required(
      t("projectDetails.taskDetailModel.formValidation.topicRequired")
    ),
    textType: Yup.string().required(
      t("projectDetails.taskDetailModel.formValidation.textTypeRequired")
    ),
    keywords: Yup.string().required(
      t("projectDetails.taskDetailModel.formValidation.keywordsRequired")
    ),
    date: Yup.date()
      .nullable()
      .required(
        t("projectDetails.taskDetailModel.formValidation.dateRequired")
      ),
  });

  const handleRoleSelect = (role: string, memberId: number) => {
     if (currentLanguage === "de") {
      if (role === "Texter") {
        role = "Texter";
      } else if (role === "Lektor") {
        role = "Lector";
      } else if (role === "SEO-Optimierer") {
        role = "SEO-Optimizer";
      } else if(role === "Meta-Lektor") {
        role = "Meta-lector";
      }
    }
    
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
        setDropdownVisible(null);
        handleCloseMemberModel();
        closeModel();
        handleRefreshData();
      })
      .catch((err) => {
        console.error(
          "Error fetching project details:",
          err.response || err.message || err
        );
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
    if (currentLanguage === "de") {
      if (values.textType === "Ratgebertext") {
        values.textType = "Guide text";
      } else if (values.textType === "Shop (Kategorie)") {
        values.textType = "Shop (Category)";
      } else if (values.textType === "Shop (Produkt)") {
        values.textType = "Shop (Product)";
      } else if (values.textType === "Definition/Wiki") {
        values.textType = "Definition/Wiki";
      } else if (values.textType === "Shop (Startseite)") {
        values.textType = "Shop (Homepage)";
      } else if (values.textType === "CMS-Seite") {
        values.textType = "CMS Page";
      }
    }
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

    console.log("Payload", payLoad);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DB_URL}/admin/editTask`,
        payLoad
      );
      if (response.status === 200) {
        handleRefreshData();
      }
    } catch (error) {
      const err = error.response.data.message || "Failed to update task";
      setError(true);
      setErrorMessage(err);
      setLoading(false);
    }
  };

  const statusMap: { [key: string]: string } = {
    "ready to work": "Bereit zu starten",
    "in progress": "In Bearbeitung",
    "ready for rivision (lector)": "Bereit für Revision (Lektor)",
    "in rivision (lector)": "In Revision (Lektor)",
    "ready for rivision (meta lector)": "Bereit für Revision (Meta-Lektor)",
    "in rivision (meta lector)": "In Revision (Meta-Lektor)",
    "ready for proofreading": "Wird lektoriert",
    "proofreading in progress": "Im Lektorat",
    "ready for seo optimization": "Bereit für SEO-Optimierung",
    "seo optimization in progress": "Wird SEO-optimiert",
    "ready for 2nd proofreading": "Im Meta-Lektorat",
    "2nd proofreading in progress": "Im Meta-Lektorat",
    "free trial": "Kostenlose Testversion",
    "final": "Texterstellung abgeschlossen"
  };
  
  const handleStatusGerman = (statusFilter: string): string => {
    return currentLanguage === "de" && statusMap[statusFilter]
      ? statusMap[statusFilter]  
      : statusFilter;           
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
                        { handleStatusGerman(task.status.toLowerCase())}
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
                        {Number(task?.actualNumberOfWords) === 1
                          ? 0
                          : task?.actualNumberOfWords}
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
                        label={t(
                          "projectDetails.taskDetailModel.wordCountExpected"
                        )}
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
                      option1={
                        currentLanguage === "en" ? "Guide text" : "Ratgebertext"
                      }
                      option2={
                        currentLanguage === "en"
                          ? "Shop (Category)"
                          : "Shop (Kategorie)"
                      }
                      option3={
                        currentLanguage === "en"
                          ? "Shop (Product)"
                          : "Shop (Produkt)"
                      }
                      option4={
                        currentLanguage === "en"
                          ? "Definition/Wiki"
                          : "Definition/Wiki"
                      }
                      option5={
                        currentLanguage === "en"
                          ? "Shop (Homepage)"
                          : "Shop (Startseite)"
                      }
                      option6={
                        currentLanguage === "en" ? "CMS Page" : "CMS-Seite"
                      }
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
                      label={t(
                        "projectDetails.projectMembers.freelancerRole.texter"
                      )}
                      handleMembers={handleMembers}
                      hide={false}
                    />
                    <TaskMember
                      name={showAssignedRoles(task.lector) ?? ""}
                      label={t(
                        "projectDetails.projectMembers.freelancerRole.lector"
                      )}
                      handleMembers={handleMembers}
                      hide={false}
                    />
                    <TaskMember
                      name={showAssignedRoles(task.seo) ?? ""}
                      label={t(
                        "projectDetails.projectMembers.freelancerRole.seo"
                      )}
                      handleMembers={handleMembers}
                      hide={false}
                    />
                    <TaskMember
                      name={showAssignedRoles(task.metaLector) ?? ""}
                      label={t(
                        "projectDetails.projectMembers.freelancerRole.metaLector"
                      )}
                      handleMembers={handleMembers}
                      hide={false}
                    />
                  </div>
                </div>

                <div className="flex justify-end items-center mt-6 gap-3">
                  <button
                    type="reset"
                    onClick={handleCancel}
                    className="flex justify-center bg-transparent rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white hover:border-primary transition-all duration-300"
                  >
                    {t("projectDetails.taskDetailModel.cancelButton")}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  >
                    {loading
                      ? t("projectDetails.taskDetailModel.submittingButton")
                      : t("projectDetails.taskDetailModel.submitButton")}
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
