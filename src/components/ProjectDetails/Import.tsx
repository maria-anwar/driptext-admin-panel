import {
  faCloudUploadAlt,
  faDownload,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Import: React.FC<{ id: string }> = ({ id }) => {
  const [importModel, setImportModel] = useState(false);
  const [fileName, setFileName] = useState(
    "Drag files here or click to select files"
  );
  const [fileData, setFileData] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalKey, setModalKey] = useState(0);
  const [importLoader, setImportLoader] = useState(false);
  const handleImport = () => {
    setImportModel(true);
  };
  const handleCloseImport = () => {
    setFile(null);
    setFileName("No file chosen");
    setFileData(null);
    setImportModel(false);
    setError(false);
    setErrorMessage("");
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile((prv) => selectedFile);
      setFileName(selectedFile.name);
      setModalKey((prevKey) => prevKey + 1); // Change key to force re-render
    }
  };
  const handleImportData = async (e, id) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file.");
      return;
    }
    setImportLoader(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectId", id);

    try {
      const response = await axios.post(
        `https://driptext-api.malhoc.com/api/admin/importTasks`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response);
      setImportModel(false);
      toast.success("Tasks imported successfully");
      setFile(null);
      setFileName("Drag files here or click to select files");
      setError(false);
      setImportLoader(false);
    } catch (error) {
      console.error("Error importing tasks:", error);
      const err =
        error.response.data.message ||
        error.message ||
        "Failed to import tasks.";
      setError(true);
      setErrorMessage(err);
      setImportLoader(false);
    }
  };
  return (
    <>
      <button
        onClick={handleImport}
        className="w-10 h-10 text-center bg-slate-100 text-blue-500 hover:bg-blue-500 hover:text-white rounded-none mr-1.5 flex justify-center items-center border-none"
      >
        <FontAwesomeIcon icon={faDownload} className="text-sm px-2" />
      </button>
      {importModel && (
        <div className="w-auto fixed inset-0 flex items-center justify-center z-[9999] bg-neutral-200 dark:bg-slate dark:bg-opacity-15 bg-opacity-60 px-4">
          <div className="bg-white dark:bg-black p-6 rounded shadow-lg lg:w-3/12 xl:w-3/12 2xl:w-4/12 3xl:w-3/12 max-h-[90vh] overflow-y-auto scrollbar-hide">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold dark:text-white pr-12">
                Import
              </h2>
              <FontAwesomeIcon
                className="cursor-pointer text-lg text-red-500 pl-12"
                onClick={handleCloseImport}
                icon={faTimes}
              />
            </div>
            <div className="relative w-full h-40 cursor-pointer border border-black dark:border-white border-dotted ">
              {/* Hidden file input */}
              <input
                type="file"
                className="absolute top-0 left-0 opacity-0 w-full h-30 cursor-pointer"
                onChange={(e) => {
                  handleFileChange(e);
                }}
                accept=".csv"
              />
              <div className="flex justify-start items-center py-15">
                <FontAwesomeIcon
                  icon={faCloudUploadAlt}
                  className="text-gray-600 w-12 h-12 px-4"
                />
                <p className="mt-2 text-gray-700 ">{fileName}</p>
              </div>
            </div>
            <button
              className="w-full mt-4 flex justify-center rounded bg-primary py-1.5 px-6 font-medium text-gray hover:bg-opacity-90"
              type="submit"
              onClick={(e) => handleImportData(e, id)}
              disabled={importLoader}
            >
              {importLoader ? "Importing..." : "Import"}
            </button>
            {error && <p className="pt-6 text-red-500">{errorMessage}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Import;