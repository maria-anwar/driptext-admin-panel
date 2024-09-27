import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

interface EditProjectProps {
  handleCloseEdit: () => void;
  handleRefreshData: () => void;
  projectId: string;
  domain: string;
  speech: string;
  perspective: string;
}

const EditProject: React.FC<EditProjectProps> = ({
  projectId,
  domain,
  speech,
  perspective,
  handleCloseEdit,
  handleRefreshData,
}) => {
  const user = useSelector<any>((state) => state.user);
  const [userToken, setUserToken] = useState(user.user.token);
  const [loading, setLoading] = useState(false);
  const domainRef = useRef<HTMLInputElement>(null);
  const speechRef = useRef<HTMLSelectElement>(null);
  const perspectiveRef = useRef<HTMLSelectElement>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  const handleEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    const editedDomain = domainRef.current?.value;
    const editedSpeech = speechRef.current?.value;
    const editedPerspective = perspectiveRef.current?.value;

      let token = userToken;
      axios.defaults.headers.common["access-token"] = token;

      let payload = {
        projectId: projectId,
        domain: editedDomain,
        speech: editedSpeech,
        prespective: editedPerspective,
      };
      console.log(payload);

      axios
        .post(`${import.meta.env.VITE_DB_URL}/admin/editProject`, payload)
        .then((response) => {
          const projectDataArray = response.data;
          console.log(projectDataArray);

          // Call refresh and close edit modal after success
          handleRefreshData();
          handleCloseEdit();
          setLoading(false);
        })
        .catch((err) => {
          const error = err?.response?.data?.message || "Error editing project details:";
          setErrorMessage(error);
          setLoading(false);
        });
  };

  return (
    <div className="w-auto fixed inset-0 flex items-center justify-center z-[9999] bg-neutral-200 dark:bg-slate dark:bg-opacity-15 bg-opacity-60 px-4">
      <div className="bg-white dark:bg-black p-6 rounded shadow-lg lg:w-6/12 xl:w-6/12 2xl:w-6/12 3xl:w-5/12 max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold dark:text-white pr-12">Edit Project</h2>
          <FontAwesomeIcon
            className="cursor-pointer text-lg text-red-500 pl-12"
            onClick={handleCloseEdit}
            icon={faTimes}
          />
        </div>
        <div>
          <div className="w-full py-2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="domain"
            >
              Domain
            </label>
            <input
              ref={domainRef}
              className="w-full rounded border border-transparent bg-gray py-2 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="domain"
              id="domain"
              placeholder="domain"
              defaultValue={domain} // Use defaultValue instead of value
            />
          </div>

          <div className="w-full py-2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="speech"
            >
              Speech
            </label>
            <div className="relative">
              <select
                ref={speechRef}
                id="speech"
                className="w-full appearance-none rounded border border-transparent bg-gray py-2.5 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                defaultValue={speech} // Use defaultValue instead of value
              >
                <option>She</option>
                <option>You (capitalized)</option>
                <option>you (lowercase)</option>
                <option>you</option>
                <option>no direct address</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full py-2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="perspective"
            >
              Writing Perspective
            </label>
            <div className="relative">
              <select
                ref={perspectiveRef}
                id="perspective"
                className="w-full appearance-none rounded border border-transparent bg-gray py-2.5 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                defaultValue={perspective} // Use defaultValue instead of value
              >
                <option>we/our shop/our company</option>
                <option>the company/shop</option>
                <option>the editorial office</option>
                <option>I</option>
                <option>neutral</option>
                <option>uniform/but fundamentally irrelevant</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <button
            className="w-full my-3 flex justify-center rounded bg-primary py-1.5 px-6 font-medium text-gray hover:bg-opacity-90"
            type="submit"
            onClick={handleEdit}
            disabled={loading}
          >
           {loading? "Saving...": "Save"}
          </button>

          {errorMessage && ( // Conditionally render the error message if it exists
            <div className="text-red-500 mt-3 text-center">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProject;
