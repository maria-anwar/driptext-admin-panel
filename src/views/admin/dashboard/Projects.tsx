import React, { useState } from "react";
import Breadcrumb from "../../../components/breeadcrumbs/Breadcrumb";
import ToggleSwitch from '../../../components/buttons/ToggleButton'
import { faThLarge, faTrashAlt, faBatteryEmpty } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import ProjectPaginatedTable from "../../../components/tables/ProjectPaginatedTable";


const allProjects = [
  {
    status: "6-ML",
    googleLink: "https://drive.google.com/open?id=your-google-folder-id",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain.stripe.com"
    },
    onboarding: "yes",
    date: "2024-08-17",
    task: {
      totalTasks: 20,
      usedTasks: 5,
      openTasks: 5,
      finalTasks: 10
    },
    worker: {
      texter: "John Doe",
      lector: "Jane Smith",
      SEO: "Alex Johnson",
      metalector: "Emily Davis"
    }
  },
  {
    status: "7-PL",
    googleLink: "https://drive.google.com/open?id=another-google-folder-id",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain2.stripe.com"
    },
    onboarding: "no",
    date: "2024-08-18",
    task: {
      totalTasks: 25,
      usedTasks: 10,
      openTasks: 8,
      finalTasks: 7
    },
    worker: {
      texter: "Michael Brown",
      lector: "Sarah Lee",
      SEO: "David White",
      metalector: "Linda Scott"
    }
  },
  {
    status: "5-XL",
    googleLink: "https://drive.google.com/open?id=different-google-folder-id",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain3.stripe.com"
    },
    onboarding: "yes",
    date: "2024-08-19",
    task: {
      totalTasks: 30,
      usedTasks: 15,
      openTasks: 10,
      finalTasks: 5
    },
    worker: {
      texter: "Alice Green",
      lector: "Tom Harris",
      SEO: "Nancy Adams",
      metalector: "Paul Young"
    }
  },
  {
    status: "8-SM",
    googleLink: "https://drive.google.com/open?id=another-google-folder-id-2",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain4.stripe.com"
    },
    onboarding: "no",
    date: "2024-08-20",
    task: {
      totalTasks: 15,
      usedTasks: 7,
      openTasks: 4,
      finalTasks: 4
    },
    worker: {
      texter: "Emma Clark",
      lector: "Ryan Walker",
      SEO: "Olivia Lewis",
      metalector: "Daniel King"
    }
  },
  {
    status: "9-LL",
    googleLink: "https://drive.google.com/open?id=unique-google-folder-id",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain5.stripe.com"
    },
    onboarding: "yes",
    date: "2024-08-21",
    task: {
      totalTasks: 18,
      usedTasks: 9,
      openTasks: 6,
      finalTasks: 3
    },
    worker: {
      texter: "William Scott",
      lector: "Sophia Martinez",
      SEO: "James Allen",
      metalector: "Grace Turner"
    }
  },
  {
    status: "10-XX",
    googleLink: "https://drive.google.com/open?id=new-google-folder-id",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain6.stripe.com"
    },
    onboarding: "no",
    date: "2024-08-22",
    task: {
      totalTasks: 22,
      usedTasks: 11,
      openTasks: 7,
      finalTasks: 4
    },
    worker: {
      texter: "Isabella Wright",
      lector: "Ethan Harris",
      SEO: "Mia Carter",
      metalector: "Lucas Brown"
    }
  },{
    status: "11-LL",
    googleLink: "https://drive.google.com/open?id=new-folder-id-1",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain7.stripe.com"
    },
    onboarding: "yes",
    date: "2024-08-23",
    task: {
      totalTasks: 28,
      usedTasks: 12,
      openTasks: 8,
      finalTasks: 8
    },
    worker: {
      texter: "Charlotte Green",
      lector: "Andrew Thompson",
      SEO: "Sophia Davis",
      metalector: "James Wilson"
    }
  },
  {
    status: "12-MM",
    googleLink: "https://drive.google.com/open?id=unique-folder-id-2",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain8.stripe.com"
    },
    onboarding: "no",
    date: "2024-08-24",
    task: {
      totalTasks: 22,
      usedTasks: 14,
      openTasks: 3,
      finalTasks: 5
    },
    worker: {
      texter: "Liam Johnson",
      lector: "Ella Martinez",
      SEO: "Aiden Roberts",
      metalector: "Sophie Clark"
    }
  },
  {
    status: "13-NN",
    googleLink: "https://drive.google.com/open?id=another-folder-id",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain9.stripe.com"
    },
    onboarding: "yes",
    date: "2024-08-25",
    task: {
      totalTasks: 30,
      usedTasks: 18,
      openTasks: 5,
      finalTasks: 7
    },
    worker: {
      texter: "Noah Lewis",
      lector: "Mia Allen",
      SEO: "Oliver Harris",
      metalector: "Emma Moore"
    }
  },
  {
    status: "14-OO",
    googleLink: "https://drive.google.com/open?id=different-folder-id",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain10.stripe.com"
    },
    onboarding: "no",
    date: "2024-08-26",
    task: {
      totalTasks: 18,
      usedTasks: 8,
      openTasks: 6,
      finalTasks: 4
    },
    worker: {
      texter: "Ava Young",
      lector: "Ethan Baker",
      SEO: "Lily Scott",
      metalector: "Daniel Adams"
    }
  },
  {
    status: "15-PP",
    googleLink: "https://drive.google.com/open?id=final-folder-id",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain11.stripe.com"
    },
    onboarding: "yes",
    date: "2024-08-27",
    task: {
      totalTasks: 24,
      usedTasks: 10,
      openTasks: 8,
      finalTasks: 6
    },
    worker: {
      texter: "Aiden Carter",
      lector: "Grace Lewis",
      SEO: "Mason Martinez",
      metalector: "Harper Brown"
    }
  }
];


const Projects: React.FC = () => {
  const [data, setData] = useState(allProjects);
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
            ? <p>card</p>
            : <ProjectPaginatedTable projects={data} />
        )}
        {showDraft && <ProjectPaginatedTable projects={data} />}
        {showArchived && <ProjectPaginatedTable projects={data} />}
      </div>
    </>
  );
};

export default Projects;
