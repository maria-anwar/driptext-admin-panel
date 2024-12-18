import React, { useState } from "react";
import Breadcrumb from "../../../components/breeadcrumbs/Breadcrumb";
import { Link } from "react-router-dom";
import SidebarIcons from "../../../components/icons/SidebarIcons";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFields, updateRoleTitle } from "../../../redux/userSlice";
import axios from "axios";
import useTitle from "../../../hooks/useTitle";
import { useTranslation } from "react-i18next";

const ProfileSettings: React.FC = () => {
  const { t } = useTranslation(); // Access translation function
  useTitle(t("profileSettings.pageTitle"));

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState(user.user.data.user.email || "");
  const [firstName, setFirstName] = useState(
    user.user.data.user.firstName || ""
  );
  const [lastName, setLastName] = useState(user.user.data.user.lastName || "");

  const handleUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();
    let token = user.user.token;
    axios.defaults.headers.common["access-token"] = token;

    let payload = {
      id: user.user.data.user._id,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    await axios
      .post(`${import.meta.env.VITE_DB_URL}/admin/updateAdminProfile`, payload)
      .then((response) => {
        dispatch(
          updateUserFields({ path: "data.user.firstName", value: firstName })
        );
        dispatch(
          updateUserFields({ path: "data.user.lastName", value: lastName })
        );
        dispatch(updateUserFields({ path: "data.user.email", value: email }));
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.response.data.message);
        console.error(t("profileSettings.messages.error"), err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setLastName(user.user.data.user.lastName);
    setEmail(user.user.data.user.email);
    setFirstName(user.user.data.user.firstName);
  };

  return (
    <>
      <div className="mx-auto max-w-270 3xl:px-6">
        <Breadcrumb pageName={t("profileSettings.breadcrumb.pageName")} />
        <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
          <div className="max-w-full border-b border-stroke pb-4 pt-2 px-6 dark:border-strokedark lg:px-10 xl:px-10">
            <h3 className="font-medium text-black dark:text-white">
              {t("profileSettings.personalInformation.title")}
            </h3>
          </div>
          <div className="px-10 py-7">
            <form action="#">
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    {t("profileSettings.personalInformation.labels.firstName")}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                          />
                        </g>
                      </svg>
                    </span>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="fullName"
                      id="fullName"
                      placeholder={t(
                        "profileSettings.personalInformation.placeholders.firstName"
                      )}
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                    />
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="lastName"
                  >
                    {t("profileSettings.personalInformation.labels.lastName")}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                          />
                        </g>
                      </svg>
                    </span>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder={t(
                        "profileSettings.personalInformation.placeholders.lastName"
                      )}
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="emailAddress"
                >
                  {t("profileSettings.personalInformation.labels.emailAddress")}
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-4">
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                        />
                      </g>
                    </svg>
                  </span>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="email"
                    name="emailAddress"
                    id="emailAddress"
                    placeholder={t(
                      "profileSettings.personalInformation.placeholders.email"
                    )}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4.5">
                <button
                  className="flex justify-center bg-transparent rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white hover:border-primary transition-all duration-300"
                  type="submit"
                  onClick={handleCancel}
                >
                  {t("profileSettings.buttons.cancel")}
                </button>
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                  disabled={loading}
                  onClick={handleUpdate}
                >
                  {loading
                    ? t("profileSettings.buttons.loadingUpdate")
                    : t("profileSettings.buttons.update")}
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-right pt-4">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6.5">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white ">
            {t("profileSettings.security.title")}
          </h2>
          <Link
            to="/auth/lost/request"
            className="inline-flex items-center justify-center gap-2.5 bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            {/* <span>{SidebarIcons[3].auth}</span> */}
            {t("profileSettings.security.resetPassword")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
