import React, { useState } from "react";
import Breadcrumb from "../../../components/breeadcrumbs/Breadcrumb";
import ToggleSwitch from "../../../components/buttons/ToggleButton";
import {
  faThLarge,
  faTrashAlt,
  faBatteryEmpty,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ProjectPaginatedTable from "../../../components/tables/ProjectPaginatedTable";
import ProjectCard from "../../../components/tables/ProjectCard";

const allProjects = [
  {
    projectName: "AB-f64g",
    status: "open",
    googleLink: "https://drive.google.com/open?id=your-google-folder-id-1",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain1.stripe.com",
    },
    onboarding: "yes",
    performancePeriod: new Date("2024-08-17").toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }),
    task: {
      totalTasks: 20,
      usedTasks: 5,
      openTasks: 5,
      finalTasks: 10,
    },
    worker: {
      texter: "John Doe",
      lector: "Jane Smith",
      SEO: "Alex Johnson",
      metalector: "Emily Davis",
    },
    created: "2024-08-17",
    customer: {
      name: "Alice Cooper",
      email: "alice.cooper@example.com",
    },
  },
  {
    projectName: "CD-h57k",
    status: "completed",
    googleLink: "https://drive.google.com/open?id=your-google-folder-id-2",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain2.stripe.com",
    },
    onboarding: "no",
    performancePeriod: new Date("2024-07-15").toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }),
    task: {
      totalTasks: 15,
      usedTasks: 10,
      openTasks: 2,
      finalTasks: 3,
    },
    worker: {
      texter: "Alice Brown",
      lector: "Bob White",
      SEO: "Carol Green",
      metalector: "David Black",
    },
    created: "2024-07-15",
    customer: {
      name: "Bob Smith",
      email: "bob.smith@example.com",
    },
  },
  {
    projectName: "EF-t88m",
    status: "in-progress",
    googleLink: "https://drive.google.com/open?id=your-google-folder-id-3",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain3.stripe.com",
    },
    onboarding: "yes",
    performancePeriod: new Date("2024-09-01").toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }),
    task: {
      totalTasks: 25,
      usedTasks: 8,
      openTasks: 10,
      finalTasks: 7,
    },
    worker: {
      texter: "Ella Jones",
      lector: "Frank Martin",
      SEO: "Grace White",
      metalector: "Henry Lewis",
    },
    created: "2024-09-01",
    customer: {
      name: "Catherine Lee",
      email: "catherine.lee@example.com",
    },
  },
  {
    projectName: "GH-j29r",
    status: "open",
    googleLink: "https://drive.google.com/open?id=your-google-folder-id-4",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain4.stripe.com",
    },
    onboarding: "no",
    performancePeriod: new Date("2024-08-25").toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }),
    task: {
      totalTasks: 10,
      usedTasks: 3,
      openTasks: 4,
      finalTasks: 3,
    },
    worker: {
      texter: "Ivan Johnson",
      lector: "Lisa Walker",
      SEO: "Mia Davis",
      metalector: "Noah Harris",
    },
    created: "2024-08-25",
    customer: {
      name: "David Brown",
      email: "david.brown@example.com",
    },
  },
  {
    projectName: "IJ-x34p",
    status: "completed",
    googleLink: "https://drive.google.com/open?id=your-google-folder-id-5",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain5.stripe.com",
    },
    onboarding: "yes",
    performancePeriod: new Date("2024-06-10").toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }),
    task: {
      totalTasks: 18,
      usedTasks: 18,
      openTasks: 0,
      finalTasks: 0,
    },
    worker: {
      texter: "Olivia Clark",
      lector: "Paul Allen",
      SEO: "Quincy King",
      metalector: "Rita Young",
    },
    created: "2024-06-10",
    customer: {
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
    },
  },
  {
    projectName: "KL-y67b",
    status: "open",
    googleLink: "https://drive.google.com/open?id=your-google-folder-id-6",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain6.stripe.com",
    },
    onboarding: "yes",
    performancePeriod: new Date("2024-10-01").toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }),
    task: {
      totalTasks: 22,
      usedTasks: 7,
      openTasks: 8,
      finalTasks: 7,
    },
    worker: {
      texter: "Nancy Lewis",
      lector: "Oliver King",
      SEO: "Paul Adams",
      metalector: "Quincy Martin",
    },
    created: "2024-10-01",
    customer: {
      name: "Sophia Martinez",
      email: "sophia.martinez@example.com",
    },
  },
  {
    projectName: "MN-q89c",
    status: "completed",
    googleLink: "https://drive.google.com/open?id=your-google-folder-id-7",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain7.stripe.com",
    },
    onboarding: "no",
    performancePeriod: new Date("2024-05-20").toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }),
    task: {
      totalTasks: 16,
      usedTasks: 16,
      openTasks: 0,
      finalTasks: 0,
    },
    worker: {
      texter: "Tom Robinson",
      lector: "Uma Patel",
      SEO: "Vera Edwards",
      metalector: "Will Harris",
    },
    created: "2024-05-20",

    customer: {
      name: "James Anderson",
      email: "james.anderson@example.com",
    },
  },
  {
    projectName: "OP-r12d",
    status: "in-progress",
    googleLink: "https://drive.google.com/open?id=your-google-folder-id-8",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain8.stripe.com",
    },
    onboarding: "yes",
    performancePeriod: new Date("2024-11-01").toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }),
    task: {
      totalTasks: 18,
      usedTasks: 6,
      openTasks: 8,
      finalTasks: 4,
    },
    worker: {
      texter: "Zoe Carter",
      lector: "Aaron Wright",
      SEO: "Brenda Clark",
      metalector: "Daniel Lee",
    },
    created: "2024-11-01",
    customer: {
      name: "Lucas Green",
      email: "lucas.green@example.com",
    },
  },
  {
    projectName: "QR-s34e",
    status: "open",
    googleLink: "https://drive.google.com/open?id=your-google-folder-id-9",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain9.stripe.com",
    },
    onboarding: "no",
    performancePeriod: new Date("2024-09-15").toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }),
    task: {
      totalTasks: 21,
      usedTasks: 9,
      openTasks: 6,
      finalTasks: 6,
    },
    worker: {
      texter: "Eva Wilson",
      lector: "Mason Scott",
      SEO: "Nina Adams",
      metalector: "Oscar Thompson",
    },
    created: "2024-09-15",
    customer: {
      name: "Liam Harris",
      email: "liam.harris@example.com",
    },
  },
  {
    projectName: "ST-u45f",
    status: "completed",
    googleLink: "https://drive.google.com/open?id=your-google-folder-id-10",
    stripeLink: {
      domain: "https://stripe.com",
      subdomain: "https://subdomain10.stripe.com",
    },
    onboarding: "yes",
    performancePeriod: new Date("2024-06-01").toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }),
    task: {
      totalTasks: 20,
      usedTasks: 20,
      openTasks: 0,
      finalTasks: 0,
    },
    worker: {
      texter: "Grace Hill",
      lector: "James Allen",
      SEO: "Karen Nelson",
      metalector: "Lucas Carter",
    },
    created: "2024-06-01",
    customer: {
      name: "Emma Taylor",
      email: "emma.taylor@example.com",
    },
  },
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
          <ToggleSwitch
            icon={faThLarge}
            isOn={showCard}
            onToggle={handleCard}
          />
          <ToggleSwitch
            icon={faBatteryEmpty}
            isOn={showDraft}
            onToggle={handleDraft}
          />
          <ToggleSwitch
            icon={faTrashAlt}
            isOn={showArchived}
            onToggle={handleArchived}
          />
          <Link
            to={""}
            className="inline-flex items-center justify-center gap-2.5 bg-boxdark py-3 text-sm xl:text-base  text-center font-medium hover:text-white text-white hover:bg-opacity-70 px-5 lg:px-8 5xl:px-10"
          >
            Create project
          </Link>
        </div>
      </div>

      <div>
        {!showDraft &&
          !showArchived &&
          (showCard ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:grid-cols-3 5xl:grid-cols-4 4xl:px-14 pt-8">
              <ProjectCard projects={data} />
            </div>
          ) : (
            <ProjectPaginatedTable projects={data} />
          ))}
        {showDraft && <ProjectPaginatedTable projects={data} />}
        {showArchived && <ProjectPaginatedTable projects={data} />}
      </div>
    </>
  );
};

export default Projects;
