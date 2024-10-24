export interface Freelancer {
  city?: string;
  country?: string;
  email: string;
  firstName: string;
  isActive?: string;
  lastName: string;
  postCode?: string;
  role: string;
  street?: string;
  _id: string;
}

export interface Plan {
    _id: string;
    plan: string;
    user: string;
    subPlan: string;
    project: string;
    subscription: string;
    startDate: string;
    endDate: string;
    totalTexts: number;
    duration: number;
    textsCount: number;
    textsRemaining: number;
    tasksPerMonth: number;
    tasksPerMonthCount: number;
    endMonthDate: string;
    isActive: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  export interface Project {
    _id: string;
    projectId: string;
    onBoarding: boolean;
    projectName: string;
    folderLink: string;
    folderId: string;
    tasks: number;
    speech: string;
    keywords: string | null;
    perspective: string | null;
    projectStatus: string;
    user: string;
    projectTasks: string[];
    plan: Plan;
    texter: string | null;
    lector: string | null;
    seo: string | null;
    metaLector: string | null;
    isActive: string;
    createdAt: string;
    updatedAt: string;
    id: number;
    __v: number;
    openTasks: number;
    finalTasks: number;
  }

  export interface OnBoarding {
    companyBackgorund: string | null;
    companyAttributes: string | null;
    comapnyServices: string | null;
    customerContent: string | null;
    customerIntrest: string | null;
    contentPurpose: string | null;
    contentInfo: string | null;
  }

  export interface FormData {
    desiredWords:string;
    topic:string | null;
    projectName: string;
    speech: string;
    perspective: string;
    projectId: string;
    companyInfo: string | undefined | null;
    companyAttributes: string| undefined | null;
    services: string | undefined | null;
    content: string | undefined | null;
    customers: string | undefined | null;
    contentPurpose: string | undefined | null;
    brand: string | undefined | null;
  }
  
  export interface Task {
    actualNumberOfWords: number | null;
    comments: string | null;
    createdAt: string; // ISO 8601 date string
    desiredNumberOfWords: string; // or number, depending on how it is used
    dueDate: string | Date; // ISO 8601 date string or null
    googleLink: string | null;
    fileLink: string;
    fileId: string | null;
    isActive: "Y" | "N"; // Assuming 'Y' and 'N' are the only possible values
    keywords: string;
    lector: string | null;
    metaLector: string | null;
    project: string; // or a more specific type if it's an ObjectId
    published: boolean;
    readyToWork: boolean;
    seo: string | null;
    status: string;
    taskId: number;
    taskName: string;
    texter: string | null;
    topic: string | null;
    type: string | null;
    updatedAt: string; // ISO 8601 date string
    __v: number;
    _id: string; // or a more specific type if it's an ObjectId
  }


  interface Role {
    _id: string;
    title: string;
    isActive: "Y" | "N";
  }
  
  export interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    isActive: "Y" | "N";
    role: Role;
  }


  
  export interface Tracking {
    cost: number;          
    margin: number;       
    revenue: number;        
    project: Project;       
  }
  