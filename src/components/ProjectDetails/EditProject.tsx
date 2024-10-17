import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, {  useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import GroupTextArea from "../FormFields/GroupTextArea";
import { GroupField } from "../FormFields/GroupField";
import GroupDropdownField from "../FormFields/GroupDropdownField";
import { OnBoarding,FormData } from "../../Types/Type";

interface EditProjectProps {
  handleCloseEdit: () => void;
  handleRefreshData: () => void;
  projectId: string;
  domain: string;
  speech: string;
  perspective: string;
  onBoarding: OnBoarding | undefined | null;
}

const EditProject: React.FC<EditProjectProps> = ({
  projectId,
  domain,
  speech,
  perspective,
  handleCloseEdit,
  handleRefreshData,
  onBoarding,
}) => {
  const user = useSelector<any>((state) => state.user);
  const [userToken, setUserToken] = useState(user?.user?.token);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 
  const [formData, setFormData] = useState<FormData>({
    speech: speech,
    perspective: perspective,
    projectId: projectId,
    projectName: domain,
    companyInfo: onBoarding?.companyBackgorund,
    companyAttributes: onBoarding?.companyAttributes,
    services: onBoarding?.comapnyServices,
    content: onBoarding?.customerContent,
    customers: onBoarding?.customerIntrest,
    contentPurpose: onBoarding?.contentPurpose,
    brand: onBoarding?.contentInfo,
  });
  const validationSchema = Yup.object().shape({
    speech: Yup.string().required("Please select a speech"),
    perspective: Yup.string().required("Please select perspective"),
    projectName: Yup.string().required("Please enter projectName"),
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

  const onSubmit = (values) => {
    setLoading(true);
    const payLoad = {
      projectId: projectId,
      domain: values.projectName,
      speech: values.speech,
      prespective: values.perspective,
      companyBackgorund: values.companyInfo,
      companyAttributes: values.companyAttributes,
      comapnyServices: values.services,
      customerContent: values.content,
      customerIntrest: values.customers,
      contentPurpose: values.contentPurpose,
      contentInfo: values.brand,
    };

    let token = userToken;
    axios.defaults.headers.common["access-token"] = token;

    axios
      .post(`${import.meta.env.VITE_DB_URL}/admin/editProject`, payLoad)
      .then((response) => {
        const projectDataArray = response.data;

        handleRefreshData();
        handleCloseEdit();
        setLoading(false);
      })
      .catch((err) => {
        const error =
          err?.response?.data?.message || "Error editing project details:";
        setErrorMessage(error);
        setLoading(false);
      });
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
              <div className="bg-white dark:bg-black p-6 rounded shadow-lg lg:w-6/12 xl:w-6/12 2xl:w-6/12 3xl:w-5/12 max-h-[90vh] overflow-y-auto scrollbar-hide">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-bold dark:text-white pr-12">
                    Edit Project
                  </h2>
                  <FontAwesomeIcon
                    className="cursor-pointer text-lg text-red-500 pl-12"
                    onClick={handleCloseEdit}
                    icon={faTimes}
                  />
                </div>
                <div>
                  <div className="w-full py-2">
                    <h2 className="text-black dark:text-white text-base font-semibold">
                      1. General information:
                    </h2>                    
                    <GroupDropdownField
                      label="Speech"
                      type="text"
                      id="speech"
                      name="speech"
                      placeholder=""
                      option1="She"
                      option2="You (capitalized)"
                      option3="you (lowercase)"
                      option4="you"
                      option5="no direct address"
                      value={values.speech}
                      errors={touched.speech ? errors.speech : ""}
                      onChange={handleChange}
                    />
                    <GroupDropdownField
                      label="Writing Perspective"
                      type="text"
                      id="perspective"
                      name="perspective"
                      placeholder=""
                      option1="we/our shop/our company"
                      option2="the company/shop"
                      option3="the editorial office"
                      option4="I"
                      option5="neutral"
                      option6="uniform/but fundamentally irrelevant"
                      value={values.perspective}
                      errors={touched.perspective ? errors.perspective : ""}
                      onChange={handleChange}
                    />
                    <GroupField
                      label="Domain"
                      type="text"
                      placeholder="projectName"
                      name="projectName"
                      id="projectName"
                      value={values.projectName}
                      onChange={handleChange}
                      errors={touched.projectName ? errors.projectName : ""}
                      disabled={false}
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
                              <AccordionButton className="flex justify-between items-center bg-slate-200 dark:bg-meta-4 ">
                                <p className="font-semibold text-black dark:text-white ">
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
                                <div className="flex flex-col gap-3">
                                  <h2 className="text-black dark:text-white text-base font-semibold lg:mt-3">
                                    2. Company Information
                                  </h2>
                                  <GroupTextArea
                                    label="Background information about the company"
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
                                    placeholder="Please describe the target group as precisely as possible"
                                    id="content"
                                    name="content"
                                    value={values.content}
                                    errors={
                                      touched.content ? errors.content : ""
                                    }
                                    onChange={handleChange}
                                  />
                                  <GroupTextArea
                                    label="Customers we want to address have an interest in..."
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
                  </div>
                  <button
                    className={`w-full my-3 flex justify-center rounded bg-primary py-1.5 px-6 font-medium text-gray hover:bg-opacity-90 ${loading?'cursor-not-allowed':'cursor-pointer'}`}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                  {errorMessage && ( // Conditionally render the error message if it exists
                    <div className="text-red-500 mt-3 text-center">
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

export default EditProject;
