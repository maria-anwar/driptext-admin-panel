import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import GroupDropdownField from "../FormFields/GroupDropdownField";
import GroupTextArea from "../FormFields/GroupTextArea";
import { GroupField } from "../FormFields/GroupField";

interface AddModelProps {
  projectName: string;
  projectId: string;
  userId: string;
  handleCloseAdd: () => void;
}

const AddModel: React.FC<AddModelProps> = ({
  projectName,
  projectId,
  userId,
  handleCloseAdd,
}) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMesssage] = useState("");
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const initialValues = {
    projectId: projectId,
    projectName: projectName,
    userId: userId,
    date: date,
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
    date: Yup.date().required("please select date"),
    topic: Yup.string().required("please select topic"),
    keywords: Yup.string().required("please select keywords"),
    textType: Yup.string().required("please select text type"),
    wordCount: Yup.number().required("please enter word count"),
    companyInfo: Yup.string().required("please enter company information"),
    companyAttributes: Yup.string().required(
      "Please enter company's attributes"
    ),
    services: Yup.string().required("please enter company's services"),
    content: Yup.string().required("above information is required"),
    customers: Yup.string().required("above information is required"),
    contentPurpose: Yup.string().required("above information is required"),
    brand: Yup.string().required("above information is required"),
  });
  const onSubmit = (values: typeof initialValues) => {
    console.log("Form Data:", values)
    console.log("Form Data:", userId)
    console.log("Form Data:", projectId)
    handleCloseAdd();
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
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
                      selected={date}
                      onChange={(date: Date | null) => setDate(date)}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select a date"
                    />
                  </div>
                  <GroupField
                    label={"Project"}
                    type={"text"}
                    placeholder={"example.com"}
                    name={"projectName"}
                    id={"projectName"}
                    value={props.values.projectName}
                    onChange={props.handleChange}
                    errors={props.errors.projectName}
                    disabled={true}
                  />
                  <GroupField
                    label={"Topic"}
                    type={"text"}
                    placeholder={"topic"}
                    name={"topic"}
                    id={"topic"}
                    value={props.values.topic}
                    onChange={props.handleChange}
                    errors={props.errors.topic}
                  />

                  <GroupField
                    label={"Keyword"}
                    type={"text"}
                    placeholder={"keywords"}
                    name={"keywords"}
                    id={"keywords"}
                    value={props.values.keywords}
                    onChange={props.handleChange}
                    errors={props.errors.keywords}
                  />

                  <GroupDropdownField
                    label={"Text type"}
                    type={"text"}
                    id={"textType"}
                    name={"textType"}
                    placeholder={""}
                    option1={"Guide"}
                    option2={"Shop (Category)"}
                    option3={"Shop (Product)"}
                    option4={"Definition/Wiki"}
                    option5={"Shop (Home page)"}
                    option6={"CMS page"}
                    value={props.values.textType}
                    errors={props.errors.textType}
                    onChange={props.handleChange}
                  />
                  <GroupField
                    label={"Word Count Expected"}
                    type={"number"}
                    placeholder={"1500"}
                    name={"wordCount"}
                    id={"wordCount"}
                    value={props.values.wordCount}
                    onChange={props.handleChange}
                    errors={props.errors.wordCount}
                    defaultValue={1500}
                  />

                  <div className="flex flex-col gap-3">
                    <h2 className="text-black dark:text-white text-base font-semibold lg:mt-3">
                      2. Company Information
                    </h2>
                    <GroupTextArea
                      label={"Background information about the company"}
                      type={"text"}
                      placeholder={
                        "Please describe here, ideally in just one sentence, what you do as a company, what you offer and how it helps the customer."
                      }
                      id={"companyInfo"}
                      name={"companyInfo"}
                      value={props.values.companyInfo}
                      errors={props.errors.companyInfo}
                      onChange={(e) => {
                        props.handleChange(e);
                        setError(false);
                        setErrorMesssage("");
                      }}
                    />

                    <GroupTextArea
                      label={
                        "Which attributes best describe you as a company/your products/your services?"
                      }
                      type={"text"}
                      placeholder={
                        "Please give us as many attributes as you woulld like readers to perceive about you and your company in bullet points."
                      }
                      id={"companyAttributes"}
                      name={"companyAttributes"}
                      value={props.values.companyAttributes}
                      errors={props.errors.companyAttributes}
                      onChange={(e) => {
                        props.handleChange(e);
                        setError(false);
                        setErrorMesssage("");
                      }}
                    />
                    <GroupTextArea
                      label={"What are your services?"}
                      type={"text"}
                      placeholder={
                        "Please list all servicesoffered online here."
                      }
                      id={"services"}
                      name={"services"}
                      value={props.values.services}
                      errors={props.errors.services}
                      onChange={(e) => {
                        props.handleChange(e);
                        setError(false);
                        setErrorMesssage("");
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-3 py-3">
                    <h2 className="text-black dark:text-white text-base font-semibold lg:mt-3.5">
                      3. Information About the Target Customers
                    </h2>
                    <GroupTextArea
                      label={"Who is the content written for? "}
                      type={"text"}
                      placeholder={
                        "Please describe the target group as precisely as possible"
                      }
                      id={"content"}
                      name={"content"}
                      value={props.values.content}
                      errors={props.errors.content}
                      onChange={(e) => {
                        props.handleChange(e);
                        setError(false);
                        setErrorMesssage("");
                      }}
                    />

                    <GroupTextArea
                      label={
                        "Customers we want to address have an interest in..."
                      }
                      type={"text"}
                      placeholder={
                        "Please list here in bullet points which problems you solve for customers."
                      }
                      id={"customers"}
                      name={"customers"}
                      value={props.values.customers}
                      errors={props.errors.customers}
                      onChange={(e) => {
                        props.handleChange(e);
                        setError(false);
                        setErrorMesssage("");
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-3 py-3">
                    <h2 className="text-black dark:text-white  text-base font-semibold lg:mt-3.5">
                      4. Aim of the Content
                    </h2>
                    <GroupTextArea
                      label={"What is the purpose of the content?"}
                      type={"text"}
                      placeholder={
                        "Please briefly describe here how organic customers/readers should ideally react when thye land on your site."
                      }
                      id={"contentPurpose"}
                      name={"contentPurpose"}
                      value={props.values.contentPurpose}
                      errors={props.errors.contentPurpose}
                      onChange={(e) => {
                        props.handleChange(e);
                        setError(false);
                        setErrorMesssage("");
                      }}
                    />

                    <GroupTextArea
                      label={"Information about your brand and your content"}
                      type={"text"}
                      placeholder={
                        "Please give us bullet points on how potential readers should describe the content they consume"
                      }
                      id={"brand"}
                      name={"brand"}
                      value={props.values.brand}
                      errors={props.errors.brand}
                      onChange={(e) => {
                        props.handleChange(e);
                        setError(false);
                        setErrorMesssage("");
                      }}
                    />
                  </div>
                  <GroupTextArea
                    label={"Comment"}
                    type={"text"}
                    placeholder={"Add any comments."}
                    id={"comment"}
                    name={"comment"}
                    value={props.values.comment}
                    errors={props.errors.comment}
                    onChange={(e) => {
                      props.handleChange(e);
                      setError(false);
                      setErrorMesssage("");
                    }}
                  />
                  <div className="flex justify-end items-center gap-3 pt-4">
                    <button
                      className=" my-3 flex justify-center rounded bg-transparent border border-primary py-1.5 px-6 font-medium text-gray"
                      type="button"
                      onClick={handleCloseAdd}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      className=" my-3 flex justify-center rounded bg-primary py-1.5 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                      disabled={loading}S
                    >
                     {loading ? "Saving" : "Save"}
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
    </>
  );
};

export default AddModel;
