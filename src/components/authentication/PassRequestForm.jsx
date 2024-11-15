import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useTranslation } from 'react-i18next';

const PassRequestForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t("passRequest.validationErrors.emailInvalid")).required(t("passRequest.validationErrors.emailRequired")),
  });

  const onSubmit = async (values) => {
    const emailData = {
      email: values.email,
    };

    const apiUrl = 'https://driptext-api.vercel.app/api/auth/forgot/password';
    try {
      const response = await axios.post(apiUrl, emailData);
      toast.success(t("passRequest.successMessage"));
    } catch (error) {
      const errorMessage = error.response?.data?.message || t("passRequest.errorMessage");
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full flex flex-col mt-10">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <div className="mb-1 flex flex-col gap-6">
              <ToastContainer />
              <label
                htmlFor="email"
                className="-mb-3 font-semibold text-sm text-blue-gray-700 text-black"
              >
                {t("passRequest.labels.email")}
              </label>
              <input
                size="lg"
                id="email"
                value={props.values.email}
                name="email"
                type="email"
                placeholder={t("passRequest.placeholders.email")}
                onChange={props.handleChange}
                className="outline-none border border-blue-gray-200 focus:border-gray-900 focus:ring-2 ring-1 ring-black p-2.5 rounded-lg bg-transparent text-black"
              />
              {props.errors.email && (
                <div id="email" className="-mt-4 text-sm text-red-500">
                  {props.errors.email}
                </div>
              )}
            </div>

            <button
              className="mt-6 w-full font-semibold h-11 bg-black text-white text-sm p-2 rounded-lg"
              type="submit"
            >
              {t("passRequest.buttons.submit")}
            </button>
          </Form>
        )}
      </Formik>

      <div className="space-y-4 mt-8">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 py-2.5 text-sm shadow-md text-black font-semibold hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            width={16}
            height={16}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-arrow-left"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>{t("passRequest.backToLogin")}</span>
        </Link>
      </div>
    </div>
  );
};

export default PassRequestForm;
