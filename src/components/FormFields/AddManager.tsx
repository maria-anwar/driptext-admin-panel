import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";
import { GroupField } from "./GroupField";

interface AddManagerProps {
  handleClose: () => void;
}

const AddManager: React.FC<AddManagerProps> = ({ handleClose }) => {
  const user = useSelector<any>((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const onSubmit = async (values: typeof initialValues) => {
    // setLoading(true);
    // setError(false);
    // setErrorMessage("");

    // try {
    //   const token = user.user.token;
    //   axios.defaults.headers.common["access-token"] = token;

    //   await axios.post(`${import.meta.env.VITE_DB_URL}/admin/addManager`, values);
    //   refreshData(); // Refresh data after adding the manager
    //   handleClose(); // Close the modal
    // } catch (err) {
    //   setErrorMessage(err.response.data.message || "Error in adding manager");
    //   setError(true);
    // } finally {
    //   setLoading(false);
    // }
    alert(`Add manager with details: ${JSON.stringify(values)}`);
    handleClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, errors, touched }) => (
        <Form>
          <div className="w-auto fixed inset-0 flex items-center justify-center z-[9999] bg-neutral-200 dark:bg-slate dark:bg-opacity-15 bg-opacity-60 px-4">
            <div className="bg-white dark:bg-black p-6 rounded shadow-lg lg:w-6/12 xl:w-6/12 2xl:w-6/12 3xl:w-5/12 max-h-[90vh] overflow-y-auto scrollbar-hide">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold dark:text-white pr-12">Add Manager</h2>
                <FontAwesomeIcon
                  className="cursor-pointer text-lg text-red-500 pl-12"
                  onClick={handleClose}
                  icon={faTimes}
                />
              </div>

              <div>
                <GroupField
                  label="First Name"
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  id="firstName"
                  onChange={handleChange}
                  errors={touched.firstName ? errors.firstName : ""}
                />

                <GroupField
                  label="Last Name"
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  id="lastName"
                  onChange={handleChange}
                  errors={touched.lastName ? errors.lastName : ""}
                />

                <GroupField
                  label="Email"
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  errors={touched.email ? errors.email : ""}
                />

                <GroupField
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  errors={touched.password ? errors.password : ""}
                />

                <div className="flex justify-end items-center gap-3 pt-4">
                  <button
                    className="my-3 text-black dark:text-white flex justify-center rounded bg-transparent border border-slate-200 py-1.5 px-6 font-medium"
                    type="button"
                    onClick={handleClose}
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
