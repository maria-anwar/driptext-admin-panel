import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./views/auth/SignIn";
import PassRequest from "./views/auth/PassRequest";
import DefaultLayout from "./layouts/DashboardLayout";
import Projects from "./views/admin/dashboard/Projects";
import DriptextAcademy from "./views/admin/dashboard/DriptextAcademy";
import ProfileSettings from "./views/admin/dashboard/ProfileSetting";
import SystemSettings from "./views/admin/dashboard/SystemSettings";
import Users from "./views/admin/dashboard/Users";
import ProjectsDetails from "./views/admin/dashboard/ProjectsDetails";
import ProtectedRoute from "./components/Helpers/ProtectedRoutes";
import Tasks from "./views/admin/dashboard/Tasks";
import TaskDetails from "./views/admin/dashboard/TaskDetails";
import KPI from "./views/admin/dashboard/KPI";
import Tracking from "./views/admin/dashboard/Tracking";
import Forecast from "./views/admin/dashboard/Forecast";
import NotFound from "./views/NotFound";
import FreelancerOverview from "./views/admin/dashboard/FreelancerOverview";
import RedirectRoute from "./views/auth/RedirectRoute";

const WebRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/auth/lost/request" element={<PassRequest />} />
          <Route path="/redirectroute" element={<RedirectRoute />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                element={<DefaultLayout />}
                allowedRoles={["projectmanger"]}
              />
            }
          >
            <Route index element={<Projects />} />
            <Route path="project-details" element={<ProjectsDetails />} />
            <Route path="driptext-academy" element={<DriptextAcademy />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
            <Route path="system-settings" element={<SystemSettings />} />
            <Route path="users" element={<Users />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="tasks/taskdetails" element={<TaskDetails />} />
            <Route path="kpi" element={<KPI />} />
            <Route path="kpi/tracking" element={<Tracking />} />
            <Route path="kpi/forecast" element={<Forecast />} />
            <Route
              path="freelancer-overview"
              element={<FreelancerOverview />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default WebRoutes;
