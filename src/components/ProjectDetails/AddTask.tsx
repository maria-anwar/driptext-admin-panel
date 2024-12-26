import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import GroupDropdownField from "../FormFields/GroupDropdownField";
import GroupTextArea from "../FormFields/GroupTextArea";
import { GroupField } from "../FormFields/GroupField";
import { GroupDateField } from "../FormFields/GroupDateField";
import axios from "axios";
import { useSelector } from "react-redux";
import { set } from "react-datepicker/dist/date_utils";
import { useTranslation } from "react-i18next";

interface AddModelProps {
  projectName: string;
  projectId: string;
  userId: string;
  handleCloseAdd: () => void;
  getTaskData: () => void;
}

const AddModel: React.FC<AddModelProps> = ({
  projectName,
  projectId,
  userId,
  handleCloseAdd,
  getTaskData,
}) => {
  const { t, i18n } = useTranslation();
  const user = useSelector<any>((state) => state.user);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(user.user.token);
  const currentLanguage = i18n.language;

  const initialValues = {
    projectId: projectId,
    projectName: projectName,
    userId: userId,
    date: null,
    topic: "",
    keywords: "",
    textType: currentLanguage === "en" ? "Guide text" : "Ratgebertext",
    wordCount: 1500,
    comment: "",
  };

  const validationSchema = Yup.object().shape({
    date: Yup.date()
      .nullable()
      .required(t("projectDetails.addTask.validationNames.date")), // Ensure date is required and nullable
    topic: Yup.string().required(
      t("projectDetails.addTask.validationNames.topic")
    ),
    keywords: Yup.string().required(
      t("projectDetails.addTask.validationNames.keywords")
    ),
    textType: Yup.string().required(
      t("projectDetails.addTask.validationNames.textType")
    ),
    wordCount: Yup.number().required(
      t("projectDetails.addTask.validationNames.wordCount")
    ),
  });

  const onSubmit = (values: typeof initialValues) => {
    if (values.keywords !== null && currentLanguage === "de") {
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
    let token = userToken;
    axios.defaults.headers.common["access-token"] = token;
    let localDate = new Date(values.date);
    let dueDateFormatted = localDate.toLocaleDateString("en-CA"); // 'en-CA' uses YYYY-MM-DD format
    let payload = {
      dueDate: dueDateFormatted,
      topic: values.topic,
      keyword: values.keywords,
      keywordType: values.textType,
      comment: values.comment,
      projectName: values.projectName,
      projectId: values.projectId,
      userId: values.userId,
      wordCount: values.wordCount,
    };
    console.log(payload);
    axios
      .post(`${import.meta.env.VITE_DB_URL}/admin/addTask`, payload)
      .then((response) => {
        const projectDataArray = response.data;

        setLoading(false);
        handleCloseAdd();
        setError(false);
        getTaskData();
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.message || "Error in adding task"; // Define errorMessage here
        if (currentLanguage === "de") {
          const errorMessageLower = errorMessage.toLowerCase();
          if (errorMessageLower === "as free trial gives only 1 task") {
            setErrorMessage(
              "Da die kostenlose Probeversion nur 1 Aufgabe ermöglicht"
            );
          } else if (errorMessageLower === "user don't have subscription") {
            setErrorMessage("Der Benutzer hat kein Abonnement");
          } else if (
            errorMessageLower === "this user's have used all his texts"
          ) {
            setErrorMessage("Dieser Benutzer hat alle seine Texte verbraucht");
          } else if (
            errorMessageLower === "this user's subscription is expired"
          ) {
            setErrorMessage("Das Abonnement dieses Benutzers ist abgelaufen");
          } else {
            setErrorMessage(errorMessage);
          }
        } else {
          setErrorMessage(errorMessage);
        }

        setError(true);
        setLoading(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values, errors, touched, handleChange }) => (
        <Form>
          <div className="w-auto fixed inset-0 flex items-center justify-center z-[9999] bg-neutral-200 dark:bg-slate dark:bg-opacity-15 bg-opacity-60 px-4">
            <div className="bg-white dark:bg-black p-6 rounded shadow-lg lg:w-6/12 xl:w-6/12 2xl:w-6/12 3xl:w-5/12 max-h-[90vh] overflow-y-auto scrollbar-hide">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold dark:text-white pr-12">
                  {t("projectDetails.addTask.label")}
                </h2>
                <FontAwesomeIcon
                  className="cursor-pointer text-lg text-red-500 pl-12"
                  onClick={handleCloseAdd}
                  icon={faTimes}
                />
              </div>
              <div>
                <h2 className="text-black dark:text-white text-base font-semibold lg:mt-3">
                  {t("projectDetails.addTask.form.generalInformation")}
                </h2>
                <GroupDateField
                  label={t("projectDetails.addTask.form.selectDateLabel")}
                  name="date"
                  id="date"
                  value={values.date}
                  onChange={(date) => setFieldValue("date", date)}
                  errors={touched.date ? errors.date : ""}
                  minDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                  placeholderText={t(
                    "projectDetails.addTask.placeholders.selectDateTooltip"
                  )}
                />
                <GroupField
                  label={t("projectDetails.addTask.form.projectLabel")}
                  type="text"
                  placeholder={t(
                    "projectDetails.addTask.placeholders.projectPlaceholder"
                  )}
                  name="projectName"
                  id="projectName"
                  value={values.projectName}
                  onChange={handleChange}
                  errors={touched.projectName ? errors.projectName : ""}
                  disabled={true}
                />
                <GroupField
                  label={t("projectDetails.addTask.form.topicLabel")}
                  type="text"
                  placeholder={t(
                    "projectDetails.addTask.placeholders.topicPlaceholder"
                  )}
                  name="topic"
                  id="topic"
                  value={values.topic}
                  onChange={handleChange}
                  errors={touched.topic ? errors.topic : ""}
                />

                <GroupField
                  label={t("projectDetails.addTask.form.keywordLabel")}
                  type="text"
                  placeholder={t(
                    "projectDetails.addTask.placeholders.keywordsPlaceholder"
                  )}
                  name="keywords"
                  id="keywords"
                  value={values.keywords}
                  onChange={handleChange}
                  errors={touched.keywords ? errors.keywords : ""}
                />

                <GroupDropdownField
                  label={t("projectDetails.addTask.form.keywordTypeLabel")}
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
                  option6={currentLanguage === "en" ? "CMS Page" : "CMS-Seite"}
                  value={values.textType}
                  errors={touched.textType ? errors.textType : ""}
                  onChange={handleChange}
                />
                <GroupField
                  label={t("projectDetails.addTask.form.wordCountLabel")}
                  type="number"
                  placeholder={t(
                    "projectDetails.addTask.placeholders.wordCountPlaceholder"
                  )}
                  name="wordCount"
                  id="wordCount"
                  value={values.wordCount}
                  onChange={handleChange}
                  errors={touched.wordCount ? errors.wordCount : ""}
                  disabled={false}
                />

                <GroupTextArea
                  label={t("projectDetails.addTask.form.commentLabel")}
                  type="text"
                  placeholder={t(
                    "projectDetails.addTask.placeholders.commentPlaceholder"
                  )}
                  id="comment"
                  name="comment"
                  value={values.comment}
                  errors={touched.comment ? errors.comment : ""}
                  onChange={handleChange}
                />
                <div className="flex justify-end items-center gap-3 pt-6">
                  <button
                    className={`flex justify-center bg-transparent rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white hover:border-primary transition-all duration-300 ${
                      loading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    type="button"
                    onClick={handleCloseAdd}
                    disabled={loading}
                  >
                    {t("projectDetails.addTask.form.cancelButton")}
                  </button>
                  <button
                    className={`flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 ${
                      loading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    type="submit"
                    disabled={loading}
                  >
                    {loading
                      ? t("projectDetails.addTask.form.savingButton")
                      : t("projectDetails.addTask.form.saveButton")}
                  </button>
                </div>
                {error && (
                  <div
                    id="email"
                    className="mt-2 text-sm text-red-500 text-center"
                  >
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddModel;
