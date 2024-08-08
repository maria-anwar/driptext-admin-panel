import React from "react";
import { Texts } from "../../../types/texts";
import Breadcrumb from "../breeadcrumbs/Breadcrumb";

const productData: Texts[] = [
  {
    select: "Publish",
    orderId: "DT-96",
    title: "Apple Watch Series 7",
    duration: "june,2024",
    keyword: "Electronics",
    status: 'pending',
  },
  {
    select: "Publish",
    orderId: "DT-96",
    title: "Apple Watch Series 7",
    duration: "june,2024",
    keyword: "Electronics",
    status: 'pending',
  },
  {
    select: "Publish",
    orderId: "DT-96",
    title: "Apple Watch Series 7",
    duration: "june,2024",
    keyword: "Electronics",
    status: 'published',
  },
  {
    select: "Publish",
    orderId: "DT-96",
    title: "Apple Watch Series 7",
    duration: "june,2024",
    keyword: "Electronics",
    status: 'ready to start',
  },
];
const ProjectDataTable = () => {
  return (
    <>
      <Breadcrumb pageName="Project Tasks" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Select</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="font-medium">Order Id</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="font-medium">Text Title</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Service Duration</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Keyword</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Status</p>
            </div>
          </div>

          {productData.map((product, key) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={key}
            >
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {product.select}
                </p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {product.orderId}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  ${product.title}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.duration}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-meta-3">${product.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectDataTable;
