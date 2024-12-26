import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";
import { GroupField } from "./GroupField";
import { useTranslation } from "react-i18next";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

interface AddManagerProps {
  handleClose: () => void;
}

const AddManager: React.FC<AddManagerProps> = ({ handleClose }) => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const currentLanguage = i18n.language;

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(
      t("user.addManager.form.fields.firstName.error")
    ),
    lastName: Yup.string().required(
      t("user.addManager.form.fields.lastName.error")
    ),
    email: Yup.string()
      .email(t("user.addManager.form.fields.email.invalidEmail"))
      .required(t("user.addManager.form.fields.email.error")),
    password: Yup.string()
      .min(8, t("user.addManager.form.fields.password.shortPassword"))
      .required(t("user.addManager.form.fields.password.error")),
  });

  const onSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    setError(false);
    setErrorMessage("");
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };
    console.log(payload);
    try {
      // const token = user.token;
      // axios.defaults.headers.common["access-token"] = token;

      await axios.post(
        `${import.meta.env.VITE_DB_URL}/admin/createProjectManager`,
        payload
      );
      handleClose(); // Close the modal after success
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Error adding manager";

      if (currentLanguage === "de") {
        const errorMessageLower = errorMessage.toLowerCase();
        if (errorMessageLower === "email already exists as freelancer") {
          setErrorMessage("E-Mail existiert bereits als Freelancer");
        } else if (errorMessageLower === "email already exists as user") {
          setErrorMessage("E-Mail existiert bereits als Benutzer");
        } else if (
          errorMessageLower === "project manager role does not exists"
        ) {
          setErrorMessage("Projektmanager-Rolle existiert nicht");
        } else {
          setErrorMessage(errorMessage);
        }
      } else {
        setErrorMessage(errorMessage);
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true} // Ensure reinitialization is enabled
    >
      {({ handleChange, errors, touched, values }) => (
        <Form>
          <div className="w-auto fixed inset-0 flex items-center justify-center z-[9999] bg-neutral-200 dark:bg-slate dark:bg-opacity-15 bg-opacity-60 px-4">
            <div className="bg-white dark:bg-black p-6 rounded shadow-lg lg:w-6/12 xl:w-6/12 2xl:w-6/12 3xl:w-5/12 max-h-[90vh] overflow-y-auto scrollbar-hide">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold dark:text-white pr-12">
                  {t("user.addManager.form.header")}
                </h2>
                <FontAwesomeIcon
                  className="cursor-pointer text-lg text-red-500 pl-12"
                  onClick={handleClose}
                  icon={faTimes}
                />
              </div>

              <div>
                <GroupField
                  label={t("user.addManager.form.fields.firstName.label")}
                  type="text"
                  placeholder={t(
                    "user.addManager.form.fields.firstName.placeholder"
                  )}
                  name="firstName"
                  id="firstName"
                  value={values.firstName} // Ensure value is set
                  onChange={handleChange}
                  errors={touched.firstName ? errors.firstName : ""}
                />

                <GroupField
                  label={t("user.addManager.form.fields.lastName.label")}
                  type="text"
                  placeholder={t(
                    "user.addManager.form.fields.lastName.placeholder"
                  )}
                  name="lastName"
                  id="lastName"
                  value={values.lastName} // Ensure value is set
                  onChange={handleChange}
                  errors={touched.lastName ? errors.lastName : ""}
                />

                <GroupField
                  label={t("user.addManager.form.fields.email.label")}
                  type="email"
                  placeholder={t(
                    "user.addManager.form.fields.email.placeholder"
                  )}
                  name="email"
                  id="email"
                  value={values.email} // Ensure value is set
                  onChange={handleChange}
                  errors={touched.email ? errors.email : ""}
                />

                <div className="relative">
                  <GroupField
                    label={t("user.addManager.form.fields.password.label")}
                    type={passwordVisible ? "text" : "password"} // Toggle type based on visibility state
                    placeholder={t(
                      "user.addManager.form.fields.password.placeholder"
                    )}
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    errors={touched.password ? errors.password : ""}
                  />
                  <FontAwesomeIcon
                    className="absolute right-3 top-15 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
                    icon={passwordVisible ? faEyeSlash : faEye}
                  />
                </div>

                <div className="flex justify-end items-center gap-3 pt-4">
                  <button
                    className="flex justify-center bg-transparent rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white hover:border-primary transition-all duration-300"
                    type="button"
                    onClick={handleClose}
                  >
                    {t("user.addManager.form.buttons.cancel")}
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                    disabled={loading}
                  >
                    {loading
                      ? t("user.addManager.form.buttons.saving")
                      : t("user.addManager.form.buttons.save")}
                  </button>
                </div>

                {error && (
                  <div id="error" className="mt-2 text-sm text-red-500">
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

export default AddManager;
