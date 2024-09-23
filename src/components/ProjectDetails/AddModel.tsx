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
    textType: "",
    wordCount: 1500,
    comment: "",
    companyInfo: "",
    companyAttributes: "",
    services: "",
    content: "",
    customers: "",
    contentPurpose: "",
    brand: "",
  };

  const validationSchema = Yup.object().shape({
    date: Yup.date().nullable().required("Please select a date"), // Ensure date is required and nullable
    topic: Yup.string().required("Please select a topic"),
    keywords: Yup.string().required("Please select keywords"),
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
      companyBackgorund: values.companyInfo,
      companyAttributes: values.companyAttributes,
      comapnyServices: values.services,
      customerContent: values.content,
      customerIntrest: values.customers,
      contentPurpose: values.contentPurpose,
      contentInfo: values.brand,
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
        setErrorMessage(err.response.data.message|| 'Error in adding task');
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
                <h2 className="text-black dark:text-white text-base font-semibold lg:mt-3.5">
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
                  dateFormat="yyyy-MM-dd"
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
                  disabled={true}
                />

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
                    errors={touched.companyInfo ? errors.companyInfo : ""}
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
                      touched.companyAttributes ? errors.companyAttributes : ""
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
                    errors={touched.services ? errors.services : ""}
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
                    errors={touched.customers ? errors.customers : ""}
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
                    errors={touched.contentPurpose ? errors.contentPurpose : ""}
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
                    className={`my-3 text-black dark:text-white flex justify-center rounded bg-transparent border border-primary py-1.5 px-6 font-medium ${
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
