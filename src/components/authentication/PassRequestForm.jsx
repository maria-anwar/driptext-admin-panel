import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const PassRequestForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("email is required"),
  });

  const onSubmit = async (values) => {

    const emailData = {
      email: values.email
    }

    const apiUrl = 'https://driptext-api.vercel.app/api/auth/forgot/password';
    console.log('API:' , apiUrl);
    try {
      const response = await axios.post(apiUrl, emailData);
      console.log('Data submitted successfully:', response.emailData);
      toast.success("Link sent successfully, click the link to reset password");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error sending the link";
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
            <ToastContainer/>
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Your email
              </Typography>
              <Input
                size="lg"
                id="email"
                value={props.values.email}
                name="email"
                type="email"
                placeholder="jhon@gmail.com"
                onChange={props.handleChange}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 focus:ring:none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {props.errors.email && (
                <div id="email" className="-mt-4 text-sm text-red-500">
                  {props.errors.email}
                </div>
              )}
            </div>

            <Button
              className="mt-6 bg-black text-white text-sm"
              fullWidth
              type="submit"
            >
              Request Link
            </Button>
          </Form>
        )}
      </Formik>
      <div className="space-y-4  mt-8">
        <Link
          to="/"
          size="lg"
          color="white"
          className="flex items-center gap-2 justify-center py-2.5 shadow-md"
          fullWidth
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            width={16}
            height={16}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-left"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Sign in</span>
        </Link>
        {/* <Typography
          variant="paragraph"
          className="text-center text-blue-gray-500 font-medium mt-4"
        >
          Not registered?
          <Link to="/probetext" className="text-gray-900 ml-1">
            Create account
          </Link>
        </Typography> */}
      </div>
    </div>
  );
};

export default PassRequestForm;
