import React, { useState } from "react";
import Breadcrumb from "../../../components/breeadcrumbs/Breadcrumb";
import ToggleSwitch from '../../../components/buttons/ToggleButton'
import { faThLarge, faTrashAlt, faBatteryEmpty } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Projects: React.FC = () => {
  const [showCard, setShowCard] = useState(false); // Default to false to show table initially
  const [showDraft, setShowDraft] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const handleCard = (isOn: boolean) => {
    setShowCard(isOn);
    if (isOn) {
      setShowDraft(false);
      setShowArchived(false);
    }
  };

  const handleDraft = (isOn: boolean) => {
    setShowDraft(isOn);
    if (isOn) {
      setShowCard(false);
      setShowArchived(false);
    }
  };

  const handleArchived = (isOn: boolean) => {
    setShowArchived(isOn);
    if (isOn) {
      setShowCard(false);
      setShowDraft(false);
    }
  };

  return (
    <>
      <div className="mx-auto 3xl:px-6">
        <Breadcrumb pageName="Projects" />
      </div>

      <div className="flex justify-end items-center">
        <div className="flex items-center justify-center space-x-4">
          <ToggleSwitch icon={faThLarge} isOn={showCard} onToggle={handleCard} />
          <ToggleSwitch icon={faBatteryEmpty} isOn={showDraft} onToggle={handleDraft} />
          <ToggleSwitch icon={faTrashAlt} isOn={showArchived} onToggle={handleArchived} />
          <Link to={''} className="inline-flex items-center justify-center gap-2.5 bg-boxdark py-3 text-sm xl:text-base  text-center font-medium hover:text-white text-white hover:bg-opacity-70 px-5 lg:px-8 5xl:px-10">Create project</Link>
        </div>
      </div>

      <div>
        {!showDraft && !showArchived && (
          showCard
            ? <p>Card</p>
            : <p>Table</p>
        )}
        {showDraft && <p>Draft</p>}
        {showArchived && <p>Archived</p>}
      </div>
    </>
  );
};

export default Projects;
