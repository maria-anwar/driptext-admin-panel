import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { OnBoarding } from "../../Types/Type";

interface AccordionDataProps {
  speech: string;
  perspective: string;
  projectName: string;
  onBoarding: OnBoarding | undefined | null;
}
const AccordionData: React.FC<AccordionDataProps> = ({
  speech,
  perspective,
  projectName,
  onBoarding,
}) => {
  return (
    <Accordion allowToggle className={`appearance-none border-none py-4 `}>
      <AccordionItem
        className={`border-none bg-slate-100 dark:bg-meta-4 rounded`}
      >
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton className="flex justify-between items-center bg-slate-200 dark:bg-meta-4 ">
                <p className="font-semibold text-black dark:text-white ">
                  OnBoarding
                </p>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel className="" pb={4}>
              <div className="bg-white dark:bg-boxdark rounded py-2 px-4 pb-6">
                <h2 className="text-black dark:text-white text-base font-semibold lg:mt-3 pb-3">
                  1. General information:
                </h2>
                <div className="px-2">
                  <p className="dark:text-white font-medium pb-2">Speech</p>
                  <p className="dark:text-white bg-slate-200 dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                    {speech}
                  </p>
                </div>
                <div className="px-2">
                  <p className="dark:text-white font-medium pb-2">
                    Perspective
                  </p>
                  <p className="dark:text-white bg-slate-200 dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                    {perspective}
                  </p>
                </div>
                <div className="px-2">
                  <p className="dark:text-white font-medium pb-2">Website</p>
                  <p className="dark:text-white bg-slate-200 dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                    {projectName}
                  </p>
                </div>
                <div className="w-full flex flex-col gap-2.5">
                  <h2 className="text-black dark:text-white text-base font-semibold lg:mt-3">
                    2. Company Information
                  </h2>
                  <div className="px-3">
                    <label className="text-black dark:text-white text-sm 3xl:text-[15px] font-medium pt-0">
                      Background information about the company
                    </label>
                    <p className="w-full bg-slate-200 placeholder:text-black/60 dark:placeholder:text-white/50 text-black dark:text-white border border-transparent text-sm px-3 xs:px-3 py-2 font-normal rounded focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary">
                      {onBoarding?.companyBackgorund}
                    </p>
                  </div>
                  <div className="px-3">
                    <label className="text-black dark:text-white text-sm 3xl:text-[15px] font-medium pt-0">
                      Which attributes best describe you as a company/your
                      products/your services?
                    </label>
                    <p className="w-full bg-slate-200 placeholder:text-black/60 dark:placeholder:text-white/50 text-black dark:text-white border border-transparent text-sm px-3 xs:px-3 py-2 font-normal rounded focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary">
                      {onBoarding?.companyAttributes}
                    </p>
                  </div>
                  <div className="px-3">
                    <label className="text-black dark:text-white text-sm 3xl:text-[15px] font-medium pt-0">
                      What are your services?
                    </label>
                    <p className="w-full bg-slate-200 placeholder:text-black/60 dark:placeholder:text-white/50 text-black dark:text-white border border-transparent text-sm px-3 xs:px-3 py-2 font-normal rounded focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary">
                      {onBoarding?.comapnyServices}
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2.5">
                  <h2 className="text-black dark:text-white text-base font-semibold lg:mt-3 pt-3">
                    3. Information About the Target Customers
                  </h2>
                  <div className="px-3">
                    <label className="text-black dark:text-white text-sm 3xl:text-[15px] font-medium pt-0">
                      Who is the content written for?
                    </label>
                    <p className="w-full bg-slate-200 placeholder:text-black/60 dark:placeholder:text-white/50 text-black dark:text-white border border-transparent text-sm px-3 xs:px-3 py-2 font-normal rounded focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary">
                      {onBoarding?.customerContent}
                    </p>
                  </div>
                  <div className="px-3">
                    <label className="text-black dark:text-white text-sm 3xl:text-[15px] font-medium pt-0">
                      Customers we want to address have an interest in...
                    </label>
                    <p className="w-full bg-slate-200 placeholder:text-black/60 dark:placeholder:text-white/50 text-black dark:text-white border border-transparent text-sm px-3 xs:px-3 py-2 font-normal rounded focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary">
                      {onBoarding?.customerIntrest}
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2.5">
                  <h2 className="text-black dark:text-white text-base font-semibold lg:mt-3 pt-3">
                    4. Aim of the Content
                  </h2>
                  <div className="px-3">
                    <label className="text-black dark:text-white text-sm 3xl:text-[15px] font-medium pt-0">
                      What is the purpose of the content?
                    </label>
                    <p className="w-full bg-slate-200 placeholder:text-black/60 dark:placeholder:text-white/50 text-black dark:text-white border border-transparent text-sm px-3 xs:px-3 py-2 font-normal rounded focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary">
                      {onBoarding?.contentPurpose}
                    </p>
                  </div>
                  <div className="px-3 pb-3">
                    <label className="text-black dark:text-white text-sm 3xl:text-[15px] font-medium pt-0">
                      Information about your brand and your content
                    </label>
                    <p className="w-full bg-slate-200 placeholder:text-black/60 dark:placeholder:text-white/50 text-black dark:text-white border border-transparent text-sm px-3 xs:px-3 py-2 font-normal rounded focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary">
                      {onBoarding?.contentInfo}
                    </p>
                  </div>
                </div>
              </div>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionData;
