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
  const user = useSelector<any>((state) => state.user);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(user.user.token);

  const initialValues = {
    projectId: projectId,
    projectName: projectName,
    userId: userId,
    date: null, // Initialize as null for date
    topic: "",
    keywords: "",
    textType: "Guide",
    wordCount: 1500,
    comment: "",
  };

  const validationSchema = Yup.object().shape({
    date: Yup.date().nullable().required("Please select a date"), // Ensure date is required and nullable
    topic: Yup.string().required("Please select a topic"),
    keywords: Yup.string().required("Please select keywords"),
    textType: Yup.string().required("Please select text type"),
    wordCount: Yup.number().required("Please enter word count"),
  });

  const onSubmit = (values: typeof initialValues) => {
    setLoading(true);
    let token = userToken;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      dueDate: values.date, // Initialize as null for date
      topic: values.topic,
      keyword: values.keywords,
      keywordType: values.textType,
      comment: values.comment,
      projectName: values.projectName,
      projectId: values.projectId,
      userId: values.userId,
      wordCount: values.wordCount,
    };
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
        setErrorMessage(err.response.data.message || "Error in adding task");
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
                  Add Task
                </h2>
                <FontAwesomeIcon
                  className="cursor-pointer text-lg text-red-500 pl-12"
                  onClick={handleCloseAdd}
                  icon={faTimes}
                />
              </div>
              <div>
                <h2 className="text-black dark:text-white text-base font-semibold lg:mt-3">
                  1. General Information
                </h2>
                <GroupDateField
                  label="Select Date"
                  name="date"
                  id="date"
                  value={values.date}
                  onChange={(date) => setFieldValue("date", date)}
                  errors={touched.date ? errors.date : ""}
                  minDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Choose a date"
                />
                <GroupField
                  label="Project"
                  type="text"
                  placeholder="example.com"
                  name="projectName"
                  id="projectName"
                  value={values.projectName}
                  onChange={handleChange}
                  errors={touched.projectName ? errors.projectName : ""}
                  disabled={true}
                />
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

                <GroupDropdownField
                  label="Keyword type"
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
                <GroupField
                  label="Word Count Expected"
                  type="number"
                  placeholder="1500"
                  name="wordCount"
                  id="wordCount"
                  value={values.wordCount}
                  onChange={handleChange}
                  errors={touched.wordCount ? errors.wordCount : ""}
                  disabled={false}
                />

                <GroupTextArea
                  label="Comment"
                  type="text"
                  placeholder="Add any comments."
                  id="comment"
                  name="comment"
                  value={values.comment}
                  errors={touched.comment ? errors.comment : ""}
                  onChange={handleChange}
                />
                <div className="flex justify-end items-center gap-3 pt-4">
                  <button
                    className={`my-3 text-black dark:text-white flex justify-center rounded bg-transparent border border-slate-200 py-1.5 px-6 font-medium ${
                      loading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    type="button"
                    onClick={handleCloseAdd}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    className={`my-3 flex justify-center rounded bg-primary py-1.5 px-6 font-medium text-gray hover:bg-opacity-90 ${
                      loading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
                {error && (
                  <div id="email" className="mt-2 text-sm text-red-500">
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
