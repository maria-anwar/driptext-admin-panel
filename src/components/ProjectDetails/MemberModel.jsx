import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import getInitials from '../Helpers/UpperCaseName';
import { useTranslation } from 'react-i18next';

const MemberModal = ({
  isOpen,
  freelancer,
  handleCloseMemberModel,
  toggleDropdown,
  dropdownVisible,
  getAvailableRoles,
  handleRoleSelect
}) => {
  const [isLoading, setIsLoading] = useState(false);  // Track if loading is in progress
  const { t } = useTranslation();

  // Handler to select the role and show a loader
  const handleRoleSelection = (role, memberId) => {
    setIsLoading(true);  // Start loading
    handleRoleSelect(role, memberId)
      .finally(() => {
        setIsLoading(false);  // End loading
        toggleDropdown(memberId);  // Close the dropdown after selection
      });
  };

  if (!isOpen) return null;

  return (
    <div className="w-auto fixed inset-0 flex items-center justify-center z-[9999] bg-neutral-200 dark:bg-slate dark:bg-opacity-15 bg-opacity-60 px-4">
      <div className="bg-white dark:bg-black p-6 rounded shadow-lg lg:w-6/12 xl:w-6/12 2xl:w-6/12 3xl:w-5/12 min-h-[80vh] max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold dark:text-white pr-12">{t('projectDetails.projectMembers.addFreelancerButton')}</h2>
          <FontAwesomeIcon
            className="cursor-pointer text-lg text-red-500 pl-12"
            onClick={handleCloseMemberModel}
            icon={faTimes}
          />
        </div>
        {freelancer && Array.isArray(freelancer) && freelancer.map((member) => (
          <div key={member._id} className="flex justify-between items-center py-3">
            <div className="flex justify-start items-center">
              <p className="text-black w-6 h-6 dark:text-white bg-slate-200 dark:bg-slate-600 rounded-full text-xs px-1 py-1 flex justify-center items-center">
                {getInitials(`${member.firstName} ${member.lastName}`)}
              </p>
              <p className="px-2.5 text-black dark:text-white">
                {member.firstName} {member.lastName}
              </p>
            </div>
            <div className="relative">
              <p
                className="w-5 h-5 bg-slate-200 text-white flex items-center justify-center cursor-pointer"
                onClick={() => toggleDropdown(member._id)}
              >
                <FontAwesomeIcon icon={faPlus} className="text-sm text-blue-500" />
              </p>
              {dropdownVisible === member._id && !isLoading && (
                <div className="absolute right-0 mt-2 z-99999 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-lg">
                  <ul>
                    {getAvailableRoles(member._id).map((role) => (
                      <li
                        key={role}
                        className="px-4 w-30 py-2 cursor-pointer bg-slate-100 dark:bg-dark-gray dark:rounded-none dark:text-white rounded-md hover:bg-slate-200 dark:hover:bg-slate-600"
                        onClick={() => handleRoleSelection(role, member._id)}  // Call to handle role selection
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* When loading, show a single centered loader in the dropdown */}
              {dropdownVisible === member._id && isLoading && (
                <div className="absolute right-0 mt-2 z-99999 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-lg flex justify-center items-center p-6">
                  <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberModal;
