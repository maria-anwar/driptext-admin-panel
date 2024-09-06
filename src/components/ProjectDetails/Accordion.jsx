import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
  } from "@chakra-ui/accordion";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const AccordionData = ({className,content,speech,projectName,prespective}) => {
  return (
    <Accordion
    allowToggle
    className={`appearance-none border-none py-4 `}
  >
    <AccordionItem className={`border-none ${className}`}>
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton className="flex justify-between items-center ">
              <p className=" text-black dark:text-white">
                Description
              </p>
              {isExpanded ? (
                <MinusIcon fontSize="12px" />
              ) : (
                <AddIcon fontSize="12px" />
              )}
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <div className="bg-slate-100 dark:bg-boxdark rounded py-2 px-4">
              <p className="dark:text-white font-semibold text-lg">
                Project
              </p>
              <p className="dark:text-white pt-2">
                1. General information:
              </p>
              <div className="px-2">
                <p className="dark:text-white">
                  Address of Speech
                </p>
                <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                 {speech}
                </p>
                <p className="dark:text-white">Perspective</p>
                <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                  {prespective}
                </p>
                <p className="dark:text-white">Website</p>
                <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                 {projectName}
                </p>
              </div>
              <p className="dark:text-white pt-2">
                2. Information about the Company:
              </p>
              <div className="px-2">
                <p className="dark:text-white">
                  Company Background
                </p>
                <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                  {content.companyBackgorund}
                </p>
                <p className="dark:text-white">
                  Company Attributes
                </p>
                <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                {content.companyAttributes}
                </p>
                <p className="dark:text-white">
                  Company Services
                </p>
                <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                {content.comapnyServices}
                </p>
              </div>
              <p className="dark:text-white pt-2">
                3. Information about the target customers:
              </p>
              <div className="px-2">
                <p className="dark:text-white">Target Audience</p>
                <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                  {content.customerContent}
                </p>
                <p className="dark:text-white">
                  Customer Interests
                </p>
                <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                {content.customerIntrest}
                </p>
              </div>
              <p className="dark:text-white pt-2">
                4. Aim of content:
              </p>
              <div className="px-2">
                <p className="dark:text-white">Content Goal</p>
                <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                  {content.contentPurpose}
                </p>
                <p className="dark:text-white">
                  Brand Content Information
                </p>
                <p className="dark:text-white bg-white dark:bg-meta-4 py-2 px-4 mb-2 rounded">
                 {content.contentInfo}
                </p>
              </div>
            </div>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  </Accordion>
  )
}

export default AccordionData