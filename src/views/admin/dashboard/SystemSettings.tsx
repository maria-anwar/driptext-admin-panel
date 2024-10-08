import React from "react";
import Breadcrumb from "../../../components/breeadcrumbs/Breadcrumb";

const SystemSettings: React.FC = () => {
  return (
    <>
      <div className="mx-auto max-w-270  3xl:px-6">
        <Breadcrumb pageName="System Settings" />
        {/* <p className="pb-6">Change system settings here</p> */}
        <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
          <div className=" max-w-full border-b border-stroke py-6 px-6 dark:border-strokedark lg:px-15 xl:px-15">
            <div className="mb-7 mt-4">
              <label
                className="mb-3 block text-sm font-semibold text-black dark:text-white"
                htmlFor="texterPrice"
              >
                Texter Price
              </label>
              <div className="relative flex justify-start items-center">
      
              <input
                className="w-full rounded border border-transparent  bg-gray py-3 px-8 text-black focus:border-primary focus-visible:outline-none  dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="number"
                name="texterPrice"
                id="texterPrice"
                placeholder="0.0076"
                defaultValue={"0.0076"}
              />
              <span className="absolute dark:text-white text-base transform translate-y-0 left-5">€</span>
              </div>
            </div>
            <div className="mb-7">
              <label
                className="mb-3 block text-sm font-semibold text-black dark:text-white"
                htmlFor="lectorPrice"
              >
                Lector Price
              </label>
              <div className="relative flex justify-start items-center">
                <input
                  className="w-full rounded border border-transparent  bg-gray py-3 px-8 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="number"
                  name="lectorPrice"
                  id="lectorPrice"
                  placeholder="0.0024"
                  defaultValue={"0.057"}
                />
               <span className="absolute dark:text-white text-base transform translate-y-0 left-5">€</span>
              </div>
            </div>
            <div className="mb-7">
              <label
                className="mb-3 block text-sm font-semibold text-black dark:text-white"
                htmlFor="seoPrice"
              >
                Seo Price
              </label>
              <div className="relative flex justify-start items-center">
              <input
                className="w-full rounded border border-transparent  bg-gray py-3 px-8 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="number"
                name="seoPrice"
                id="seoPrice"
                placeholder="0.0045"
                defaultValue={"0.856"}
              />
              <span className="absolute dark:text-white text-base transform translate-y-0 left-5">€</span>
              </div>
            </div>

            {/* <div className="mb-7">
              <label
                className="mb-3 block text-sm font-semibold text-black dark:text-white"
                htmlFor="rootDirectory"
              >
                Root Directory
              </label>
              <input
                className="w-full rounded border border-transparent  bg-gray py-3 px-6 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="rootDirectory"
                id="rootDirectory"
                placeholder="1Tru4H_nq0D8OVfOsOT3"
                defaultValue={"1Tru4H_nq0D8OVfOsOT3"}
              />
            </div>
            <div className="mb-7">
              <label
                className="mb-3 block text-sm font-semibold text-black dark:text-white"
                htmlFor="OnboardingRedirect"
              >
                Onboarding Redirect Url
              </label>
              <input
                className="w-full rounded border border-transparent  bg-gray py-3 px-6 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="OnboardingRedirect"
                id="OnboardingRedirect"
                placeholder="https//driptext.de/danke-onboarding/"
                defaultValue={"https//driptext.de/danke-onboarding/"}
              />
            </div>
            <div className="mb-7">
              <label
                className="mb-3 block text-sm font-semibold text-black dark:text-white"
                htmlFor="FreelancerOnboarding"
              >
                Freelancer Onboarding Redirect Url
              </label>
              <input
                className="w-full rounded border border-transparent  bg-gray py-3 px-6 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="FreelancerOnboarding"
                id="FreelancerOnboarding"
                placeholder="https//driptext.cde/freelancer-onboarding-bestaetigung/"
                defaultValue={
                  "https//driptext.cde/freelancer-onboarding-bestaetigung/"
                }
              />
            </div>
            <div className="mb-7">
              <label
                className="mb-3 block text-sm font-semibold text-black dark:text-white"
                htmlFor="SimpleText"
              >
                Simple Text Redirect Url
              </label>
              <input
                className="w-full rounded border border-transparent  bg-gray py-3 px-6 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="SimpleText"
                id="SimpleText"
                placeholder="https//driptext.de/danke-probetext"
                defaultValue={"https//driptext.de/danke-probetext"}
              />
            </div>
            <div className="mb-7">
              <label
                className="mb-3 block text-sm font-semibold text-black dark:text-white"
                htmlFor="OrderWebhook"
              >
                Order Form Webhook
              </label>
              <input
                className="w-full rounded border border-transparent  bg-gray py-3 px-6 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="OrderWebhook"
                id="OrderWebhook"
                placeholder="https//hookszapier.com/hooks"
                defaultValue={"https//hookszapier.com/hooks"}
              />
            </div>
            <div className="mb-7">
              <label
                className="mb-3 block text-sm font-semibold text-black dark:text-white"
                htmlFor="FreelancerWebhook"
              >
                Freelancer Onboarding Form Webhook
              </label>
              <input
                className="w-full rounded border border-transparent  bg-gray py-3 px-6 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="FreelancerWebhook"
                id="FreelancerWebhook"
                placeholder="https//hookszapier.com/hooks"
                defaultValue={"https//hookszapier.com/hooks"}
              />
            </div>
            <div className="mb-7">
              <label
                className="mb-3 block text-sm font-semibold text-black dark:text-white"
                htmlFor="BookofficeEmail"
              >
                Bookoffice Email
              </label>
              <input
                className="w-full rounded border border-transparent  bg-gray py-3 px-6 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="BookofficeEmail"
                id="BookofficeEmail"
                placeholder="backoffice@driptext.de"
                defaultValue={"backoffice@driptext.de"}
              />
            </div> */}

            <div className="flex justify-end gap-4.5 pt-5 pb-6">
              <button
                className="flex w-full justify-center rounded bg-boxdark py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SystemSettings;
