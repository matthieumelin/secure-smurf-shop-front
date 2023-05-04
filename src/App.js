import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "./components/loading.component";

import Index from "./pages/index.page";
import NotFound from "./pages/not-found.page";
import Login from "./pages/login.page";
import Logout from "./pages/logout.page";
import Verification from "./pages/verification.page";
import Contact from "./pages/contact.page";
import ClientAreaIndex from "./pages/client-area/index.page";
import Profile from "./pages/client-area/profile.page";
import Orders from "./pages/client-area/orders.page";
import ChangePassword from "./pages/change-password.page";
import Checkout from "./pages/checkout.page";

import AdminIndex from "./pages/admin/index.page";
import AdminUsers from "./pages/admin/users/index.page";
import AdminUsersPermissions from "./pages/admin/users/permissions/index.page";
import AdminUsersPermissionsAdd from "./pages/admin/users/permissions/add.page";

import AuthVerify from "./user/auth-verify.user";

import AppRoutes from "./router/app.routes";

export default function App() {
  const [appIsLoading, setAppIsLoading] = useState(true);

  // Client area props
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppIsLoading(false);
    }, 1000 * 3);
    return () => {
      setSidebarIsOpen(false);
    };
  }, []);

  if (appIsLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route
          path={AppRoutes.AdminUsersPermissionsAdd}
          element={<AdminUsersPermissionsAdd />}
        />
        <Route
          path={AppRoutes.AdminUsersPermissions}
          element={<AdminUsersPermissions />}
        />
        <Route path={AppRoutes.AdminUsers} element={<AdminUsers />} />
        <Route path={AppRoutes.AdminDashboard} element={<AdminIndex />} />
        <Route
          path={AppRoutes.Orders}
          element={
            <Orders
              toast={toast}
              sidebarIsOpen={sidebarIsOpen}
              showLogoutModal={showLogoutModal}
              setSidebarIsOpen={setSidebarIsOpen}
              setShowLogoutModal={setShowLogoutModal}
            />
          }
        />
        <Route
          path={AppRoutes.Profile}
          element={
            <Profile
              toast={toast}
              sidebarIsOpen={sidebarIsOpen}
              showLogoutModal={showLogoutModal}
              setSidebarIsOpen={setSidebarIsOpen}
              setShowLogoutModal={setShowLogoutModal}
            />
          }
        />
        <Route
          path={AppRoutes.ClientArea}
          element={
            <ClientAreaIndex
              sidebarIsOpen={sidebarIsOpen}
              showLogoutModal={showLogoutModal}
              setSidebarIsOpen={setSidebarIsOpen}
              setShowLogoutModal={setShowLogoutModal}
            />
          }
        />
        <Route path={AppRoutes.Checkout} element={<Checkout />} />
        <Route path={AppRoutes.Contact} element={<Contact toast={toast} />} />
        <Route
          path={AppRoutes.Verification}
          element={<Verification toast={toast} />}
        >
          <Route path=":token" element={<Verification toast={toast} />} />
        </Route>
        <Route
          path={AppRoutes.ChangePassword}
          element={<ChangePassword toast={toast} />}
        />
        <Route path={AppRoutes.Logout} element={<Logout toast={toast} />} />
        <Route path={AppRoutes.Login} element={<Login toast={toast} />} />
        <Route path={AppRoutes.NotFound} element={<NotFound />} />
        <Route index element={<Index />} />
        <Route
          path="*"
          element={<Navigate to={AppRoutes.NotFound} replace />}
        />
      </Routes>
      <AuthVerify />
    </BrowserRouter>
  );
}
