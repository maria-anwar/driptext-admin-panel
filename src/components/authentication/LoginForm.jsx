import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(8).required("Password is required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    let userData = {
      email: values.email,
      password: values.password,
    };
    const apiUrl = 'https://driptext-api.vercel.app/api/auth/login';

    try {
      // const response = await axios.post(apiUrl, userData);
      // dispatch(setUser(response?.data));
      // toast.success("Login successfully");
      // localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      // const errorMessage = error.response?.data?.message || error.message || 'Error logging';
      // toast.error(`Error logging in: ${errorMessage}`);
    }
  };

  return (
<div className="w-full flex flex-col mt-10 bg-white text-black">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <ToastContainer />
            <div className="mb-1 flex flex-col gap-6">
              <label
                htmlFor="email"
                className="-mb-3 font-semibold text-sm text-blue-gray-700 text-black"
              >
                Your email
              </label>
              <input
                size="lg"
                id="email"
                value={props.values.email}
                name="email"
                type="email"
                placeholder="jhon@gmail.com"
                onChange={props.handleChange}
                className="outline-none border border-blue-gray-200 focus:border-gray-900 focus:ring-1 ring-black p-2 rounded-lg bg-transparent text-black"
              />
              {props.errors.email && (
                <div id="email" className="-mt-4 text-sm text-red-500">
                  {props.errors.email}
                </div>
              )}
              <label
                htmlFor="password"
                className="-mb-3 font-semibold text-sm text-blue-gray-700 text-black"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={props.values.password}
                onChange={props.handleChange}
                placeholder="********"
                className="outline-none border border-blue-gray-200 focus:border-gray-900 focus:ring-1 ring-black p-2 rounded-lg bg-transparent text-black"
              />
              {props.errors.password && (
                <div id="password" className="-mt-4 text-red-500 text-sm">
                  {props.errors.password}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2 items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 rounded dark:bg-white"
                />
                <label
                  htmlFor="default-checkbox"
                  className="text-sm text-gray-700 font-semibold text-black "
                >
                  Save password
                </label>
              </div>
              <Link to="/auth/lost/request" className="text-sm text-gray-900 font-semibold text-black hover:text-black">
                Forgot Password
              </Link>
            </div>
            <button
              className={`mt-6 w-full font-semibold h-10 bg-black text-white text-sm p-2 rounded-lg ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              type="submit"
            >
              Sign In
            </button>
          </Form>
        )}
      </Formik>

      <div className="xl:hidden w-full flex justify-center gap-2.5 p-4 text-sm text-gray-700 border-gray-200">
        <Link to="/imprint" className="hover:underline">
          Imprint
        </Link>
        <Link to="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
