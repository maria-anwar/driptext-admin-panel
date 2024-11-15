import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../components/breeadcrumbs/Breadcrumb";
import { useSelector } from "react-redux";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useTitle from "../../../hooks/useTitle";
import { useTranslation } from "react-i18next";

const SystemSettings: React.FC = () => {
  const {t} = useTranslation();
  useTitle(t("systemSettings.pageTitle"));
  const user = useSelector((state: any) => state.user);
  const [initialValues, setInitialValues] = useState({
    texterPrice: 0,
    lectorPrice: 0,
    seoPrice: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");

  const validationSchema = Yup.object().shape({
    texterPrice: Yup.number()
      .required(t("systemSettings.validationMessages.texterPriceRequired"))
      .min(0, t("systemSettings.validationMessages.priceMinError")),
    lectorPrice: Yup.number()
      .required(t("systemSettings.validationMessages.lectorPriceRequired"))
      .min(0, t("systemSettings.validationMessages.priceMinError")),
    seoPrice: Yup.number()
      .required(t("systemSettings.validationMessages.seoPriceRequired"))
      .min(0, t("systemSettings.validationMessages.priceMinError")),
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPrices = async () => {
      setLoading(true);
      let token = user?.user?.token;
      axios.defaults.headers.common["access-token"] = token;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DB_URL}/admin/getPrices`,
          { signal }
        );
        const pricesData = response?.data?.data;
        setInitialValues({
          texterPrice: pricesData?.texter ?? 0,
          lectorPrice: pricesData?.lector ?? 0,
          seoPrice: pricesData?.seoOptimizer ?? 0,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching prices:", err);
      }
    };

    fetchPrices();
    return () => {
      controller.abort();
    };
  }, [user]);

  const handleSubmit = async (values: any) => {
    let token = user?.user?.token;
    axios.defaults.headers.common["access-token"] = token;
    let payload = {
      texter: values.texterPrice,
      lector: values.lectorPrice,
      seo: values.seoPrice,
    };
    try {
      await axios.post(
        `${import.meta.env.VITE_DB_URL}/admin/setPrices`,
        payload
      );
      setApiError("");
    } catch (error) {
      console.error("Error updating prices:", error);
      setApiError(t("systemSettings.form.apiError"));
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270 3xl:px-6">
        <Breadcrumb pageName={t('systemSettings.breadcrumb.pageName')}/>
        {loading ? (
          <div className="rounded-sm border border-stroke pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-10 w-full bg-slate-200 h-[300px] animate-pulse"></div>
        ) : (
          <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
            <div className="max-w-full border-b border-stroke py-6 px-6 dark:border-strokedark lg:px-15 xl:px-15">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true} // Ensures that form re-initializes when initialValues change
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-7 mt-4">
                      <label
                        className="mb-3 block text-sm font-semibold text-black dark:text-white"
                        htmlFor="texterPrice"
                      >
                        {t('systemSettings.form.texterPriceLabel')}
                      </label>
                      <div className=" flex  flex-col">
                        <div className={"relative"}>
                          <Field
                            className="w-full rounded border border-transparent bg-gray py-3 px-8 text-black focus:border-primary focus-visible:outline-none dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name="texterPrice"
                            id="texterPrice"
                            placeholder= {t('systemSettings.form.texterPricePlaceholder')}
                          />
                          <span className="absolute dark:text-white  transform translate-y-0 top-3.5 left-5">
                            €
                          </span>
                        </div>

                        <ErrorMessage
                          name="texterPrice"
                          component="div"
                          className="text-red-500 mt-1"
                        />
                      </div>
                    </div>

                    <div className="mb-7">
                      <label
                        className="mb-3 block text-sm font-semibold text-black dark:text-white"
                        htmlFor="lectorPrice"
                      >
                        {t('systemSettings.form.lectorPriceLabel')}
                      </label>
                      <div className=" flex  flex-col">
                        <div className={"relative"}>
                          <Field
                            className="w-full rounded border border-transparent bg-gray py-3 px-8 text-black focus:border-primary focus-visible:outline-none dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name="lectorPrice"
                            id="lectorPrice"
                            placeholder= {t('systemSettings.form.lectorPricePlaceholder')}
                          />
                          <span className="absolute dark:text-white  transform translate-y-0 top-3.5 left-5">
                            €
                          </span>
                        </div>

                        <ErrorMessage
                          name="lectorPrice"
                          component="div"
                          className="text-red-500 mt-1"
                        />
                      </div>
                    </div>
                    <div className="mb-7">
                      <label
                        className="mb-3 block text-sm font-semibold text-black dark:text-white"
                        htmlFor="seoPrice"
                      >
                        {t('systemSettings.form.seoPriceLabel')}
                      </label>
                      <div className=" flex  flex-col">
                        <div className={"relative"}>
                          <Field
                            className="w-full rounded border border-transparent bg-gray py-3 px-8 text-black focus:border-primary focus-visible:outline-none dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name="seoPrice"
                            id="seoPrice"
                            placeholder= {t('systemSettings.form.seoPricePlaceholder')}
                          />
                          <span className="absolute dark:text-white  transform translate-y-0 top-3.5 left-5">
                            €
                          </span>
                        </div>

                        <ErrorMessage
                          name="seoPrice"
                          component="div"
                          className="text-red-500 mt-1"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-4.5 pt-5 pb-6">
                      <button
                        className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? t('systemSettings.form.submitButton.saving') : t('systemSettings.form.submitButton.default')}
                      </button>
                    </div>

                    {apiError && (
                      <div className="text-red-500 mt-4 text-center">
                        {apiError}
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SystemSettings;
