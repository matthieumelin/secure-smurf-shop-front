import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import socketIO from "socket.io-client";

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

import PrivacyPolicy from "./pages/privacy-policy.page";
import CookiePolicy from "./pages/cookie-policy.page";
import TermAndConditions from "./pages/terms-and-conditions.page";

import AdminIndex from "./pages/admin/index.page";
import AdminUsers from "./pages/admin/users/index.page";
import AdminUserPermissions from "./pages/admin/users/permissions/index.page";
import AdminUserPermissionAdd from "./pages/admin/users/permissions/add.page";
import AdminUserPermissionEdit from "./pages/admin/users/permissions/edit.page";
import AdminOrders from "./pages/admin/orders/index.page";
import AdminProducts from "./pages/admin/products/index.page";
import AdminProductAdd from "./pages/admin/products/add.page";
import AdminProductEdit from "./pages/admin/products/edit.page";
import AdminProductRegionAdd from "./pages/admin/products/regions/add.page";
import AdminProductRegionEdit from "./pages/admin/products/regions/edit.page";
import AdminProductRegions from "./pages/admin/products/regions/index.page";

import AuthVerify from "./user/auth-verify.user";

import AppRoutes from "./router/app.routes";

// const socket = socketIO.connect(process.env.REACT_APP_API_BASE_URL);

export default function App() {
  // States
  const [appIsLoading, setAppIsLoading] = useState(true);

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

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
          path={AppRoutes.AdminUserPermissionEdit}
          element={<AdminUserPermissionEdit toast={toast} />}
        />
        <Route
          path={AppRoutes.AdminUserPermissionAdd}
          element={<AdminUserPermissionAdd toast={toast} />}
        />
        <Route
          path={AppRoutes.AdminUserPermissions}
          element={<AdminUserPermissions toast={toast} />}
        />
        <Route path={AppRoutes.AdminUsers} element={<AdminUsers />} />
        <Route path={AppRoutes.AdminOrders} element={<AdminOrders />} />
        <Route
          path={AppRoutes.AdminProductRegionEdit}
          element={<AdminProductRegionEdit toast={toast} />}
        />
        <Route
          path={AppRoutes.AdminProductRegionAdd}
          element={<AdminProductRegionAdd toast={toast} />}
        />
        <Route
          path={AppRoutes.AdminProductRegions}
          element={<AdminProductRegions toast={toast} />}
        />
        <Route
          path={AppRoutes.AdminProductEdit}
          element={<AdminProductEdit toast={toast} />}
        />
        <Route
          path={AppRoutes.AdminProductAdd}
          element={<AdminProductAdd toast={toast} />}
        />
        <Route
          path={AppRoutes.AdminProducts}
          element={<AdminProducts toast={toast} />}
        />
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
        <Route path={AppRoutes.PrivacyPolicy} element={<PrivacyPolicy />} />
        <Route path={AppRoutes.CookiePolicy} element={<CookiePolicy />} />
        <Route
          path={AppRoutes.TermAndConditions}
          element={<TermAndConditions />}
        />
        <Route
          index
          element={
            <Index
              showCheckoutModal={showCheckoutModal}
              setShowCheckoutModal={setShowCheckoutModal}
            />
          }
        />
        <Route
          path="*"
          element={<Navigate to={AppRoutes.NotFound} replace />}
        />
      </Routes>
      <AuthVerify />
    </BrowserRouter>
  );
}
