import  { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {

  const [loading,setLoading] = useState(false)
 
  const navigate = useNavigate();
 
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("email is required"),
    password: Yup.string().min(8).required("password is required"),
  });

  const onSubmit = async(values) => {
    setLoading(true)
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
      navigate("/client-dashboard");
    } catch (error) {
      // const errorMessage = error.response?.data?.message || error.message || 'Error logging';
      // toast.error(`Error logging in: ${errorMessage}`);
    }
    

    // window.location.href = "https://driptext.de/danke-probetext/";
    
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
          <ToastContainer/>
            <div className="mb-1 flex flex-col gap-6">
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
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Password
              </Typography>
              <Input
                id="password"
                name="password"
                type="password"
                value={props.values.password}
                onChange={props.handleChange}
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 focus:ring:none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
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
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 rounded focus:ring-blue-500 "
                />
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center justify-start font-medium"
                >
                  Save password
                </Typography>
              </div>
              <Typography variant="small" className="font-medium text-gray-900">
                <Link to="/auth/lost/request">Forgot Password</Link>
              </Typography>
            </div>
            <Button className={`mt-6 bg-black text-white text-sm ${loading?'cursor-not-allowed':'cursor-pointer'}`} fullWidth type="submit">
              Sign In
            </Button>
          </Form>
        )}
      </Formik>

      {/* <div className="space-y-4  mt-8">
        <Button
          size="lg"
          color="white"
          className="flex items-center gap-2 justify-center py-2.5 shadow-md"
          fullWidth
        >
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1156_824)">
              <path
                d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z"
                fill="#4285F4"
              />
              <path
                d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z"
                fill="#34A853"
              />
              <path
                d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z"
                fill="#FBBC04"
              />
              <path
                d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z"
                fill="#EA4335"
              />
            </g>
            <defs>
              <clipPath id="clip0_1156_824">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          <span>Sign in With Google</span>
        </Button>
        <Typography
          variant="paragraph"
          className="text-center text-blue-gray-500 font-medium mt-4"
        >
          Not registered?
          <Link to="/probetext" className="text-gray-900 ml-1">
            Create account
          </Link>
        </Typography>
      </div> */}


      <div className="xl:hidden w-full flex justify-center gap-2.5 p-4 text-sm text-gray-700  border-gray-200">
        <Link to="/imprint" className="hover:underline">
          Imprint
        </Link>
        <Link to="/privacy-policy" className=" hover:underline">
          Privacy Policy
        </Link>
      </div>
      {/* <div className="w-full relative z-20 flex justify-center">
            <img
              src={germanFlag}
              alt="Language"
              className="w-6 h-6 cursor-pointer hover:opacity-80 transition duration-200 ease-in-out"
              onClick={toggleLanguageDropdown}
            />
            {showLanguageDropdown && (
              <div className="absolute bottom-12 left-0 mt-2 py-2 w-40 bg-white border rounded shadow-xl">
                <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200">
                  <img
                    src={englishFlag}
                    alt="English"
                    className="w-5 h-5 mr-2"
                  />
                  <span>English</span>
                </div>
                <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200">
                  <img src={germanFlag} alt="German" className="w-5 h-5 mr-2" />
                  <span>German</span>
                </div>
              </div>
            )}
          </div> */}
    </div>
  );
};

export default LoginForm;
