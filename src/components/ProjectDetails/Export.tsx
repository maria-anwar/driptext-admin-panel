import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Export: React.FC<{ id: string; taskLength: number }> = ({
  id,
  taskLength,
}) => {
  const [exportLoader, setExportLoader] = useState(false);
  const user = useSelector<any>((state) => state.user);
  const [userToken, setUserToken] = useState(user?.user?.token);
  const handleExportData = (id) => {
    if (taskLength == 0) {
      toast.error("No tasks to export");
      return;
    }
    setExportLoader(true);
    const token = userToken;
    axios.defaults.headers.common["access-token"] = token;

    const payload = {
      projectId: id,
    };
    axios
      .post(`${import.meta.env.VITE_DB_URL}/admin/exportTasks`, payload)
      .then((response) => {
        const exportUrl = response.data.exportUrl;
        // window.open(exportUrl, "_blank", "noopener,noreferrer");
        console.log(exportUrl)
        if(exportUrl){
        window.open(exportUrl, "_blank");
        console.log("window open")
        setExportLoader(false);

        }
      })
      .catch((err) => {
        console.error(
          "Error fetching project details:",
          err.response || err.message || err
        );
        setExportLoader(false);
      });
  };
  return (
    <button
      onClick={() => {
        handleExportData(id);
      }}
      className="w-10 h-10 text-center bg-slate-100 text-blue-500 hover:bg-blue-500 hover:text-white rounded-none ml-1.5 flex justify-center items-center border-none"
    >
      {exportLoader ? (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin" />
        </div>
      ) : (
        <FontAwesomeIcon icon={faUpload} className="text-sm px-2" />
      )}
    </button>
  );
};

export default Export;
