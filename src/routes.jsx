import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./views/auth/SignIn";
import PassRequest from './views/auth/PassRequest'
import DefaultLayout from "./layouts/DashboardLayout";
import Projects from "./views/admin/dashboard/Projects";
import Customers from "./views/admin/dashboard/Customers";
import DriptextAcademy from "./views/admin/dashboard/DriptextAcademy";
import ProfileSettings from "./views/admin/dashboard/ProfileSetting";
import SystemSettings from "./views/admin/dashboard/SystemSettings";
import Users from "./views/admin/dashboard/Users";



const WebRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/auth/lost/request" element={<PassRequest />} />

          <Route
            path="/dashboard"
            element={<DefaultLayout />}
          >
            <Route index element={<Projects />} />
            <Route path="customers" element={<Customers />} />
            <Route path="driptext-academy" element={<DriptextAcademy />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
            <Route path="system-settings" element={<SystemSettings />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default WebRoutes;
