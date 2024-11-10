import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import useAuth from "../Helpers/useAuth";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMesssage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("E-Mail ist erforderlich"),
    password: Yup.string().min(8).required("Passwort ist erforderlich"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    let userData = {
      email: values.email,
      password: values.password,
    };
    `${import.meta.env.VITE_DB_URL}/auth/login`;

    try {
      setError(false);
      const response = await axios.post(
        `${import.meta.env.VITE_DB_URL}/auth/login`,
        userData
      );
      if (
        response.data.data.user.role.title.toLowerCase() === "projectmanger"
      ) {
        dispatch(setUser(response?.data));
        const expirationTime = Date.now() + 12 * 60 * 60 * 1000;
        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: response.data.token,
            role: response.data.data.user.role.title,
            expiration: expirationTime,
          })
        );
        navigate("/dashboard");
      } else {
        const errorMessage = "Sie können sich nicht als Projektmanager anmelden";
        setError(true);
        setErrorMesssage(errorMessage);
        setLoading(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Fehler beim Anmelden";
      setError(true);
      setErrorMesssage(errorMessage);
      setLoading(false);
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
            <div className="mb-1 flex flex-col  gap-6">
              <label
                htmlFor="email"
                className="-mb-3 font-semibold text-sm text-blue-gray-700 text-black"
              >
                Deine E-Mail
              </label>
              <input
                size="lg"
                id="email"
                value={props.values.email}
                name="email"
                type="email"
                placeholder="jhon@gmail.com"
                onChange={(e) => {
                  props.handleChange(e);
                  setError(false);
                  setErrorMesssage("");
                }}
                className="outline-none border border-blue-gray-200 focus:border-gray-900 focus:ring-2 ring-1 ring-black px-3 py-2 rounded-lg bg-transparent text-black"
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
                Passwort
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  value={props.values.password}
                  onChange={(e) => {
                    props.handleChange(e);
                    setError(false);
                    setErrorMesssage("");
                  }}
                  placeholder="********"
                  className="w-full outline-none border border-blue-gray-200 focus:border-gray-900 focus:ring-2 ring-1 ring-black px-3 py-2 rounded-lg bg-transparent text-black"
                />
                <FontAwesomeIcon
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                  icon={passwordVisible ? faEye :  faEyeSlash}
                />
              </div>
              {props.errors.password && (
                <div id="password" className="-mt-4 text-red-500 text-sm">
                  {props.errors.password}
                </div>
              )}
            </div>
            <div className="flex items-center justify-end mt-6">
            {/* <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="save-password"
                  name="save-password"
                  className="w-4 h-4"
                />
                <p className="text-sm text-gray-900 font-semibold text-black hover:text-black">
                  Save password
                </p>
              </div> */}
              <Link
                to="/auth/lost/request"
                className="text-sm text-gray-900 font-semibold text-black hover:text-black"
              >
                Passwort vergessen
              </Link>
            </div>
            <button
              className={`mt-6 w-full font-semibold h-10 bg-black text-white text-sm px-3 py-1.5 rounded-lg ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-solid rounded-full border-t-transparent animate-spin" />
                </div>
              ) : (
                "Anmelden"
              )}
            </button>
            {error && (
              <div id="email" className="mt-4 text-sm text-red-500">
                {errorMessage}
              </div>
            )}
          </Form>
        )}
      </Formik>

      <div className="xl:hidden w-full flex justify-center gap-2.5 p-4 text-sm text-gray-700 border-gray-200">
        <Link to="/imprint" className="hover:underline">
          Impressum
        </Link>
        <Link to="/privacy-policy" className="hover:underline">
          Datenschutzerklärung
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
