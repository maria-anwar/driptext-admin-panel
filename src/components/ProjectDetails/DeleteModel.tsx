import React from "react";

const DeleteModel: React.FC<{handleDelete:()=>void ,handleClose:()=> void}> = ({handleDelete,handleClose}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-9999 bg-neutral-200 dark:bg-slate dark:bg-opacity-15 bg-opacity-60 px-4">
      <div className="bg-white dark:bg-black p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Archived Project
        </h2>
        <p>Are you sure you want to archive this project?</p>
        <button
          className=" mr-4 mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={handleDelete}
        >
          Confirm
        </button>
        <button
          className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DeleteModel;
