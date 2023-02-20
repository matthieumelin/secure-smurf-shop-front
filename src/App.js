import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import socketIO from "socket.io-client";

import Loading from "./components/loading.component";
import Toast from "./components/utils/toast.component";

import Index from "./pages/index.page";
import Login from "./pages/login.page";
import NotFound from "./pages/not-found.page";
import Register from "./pages/register.page";
import Verification from "./pages/verification.page";
import Contact from "./pages/contact.page";
import ClientAreaIndex from "./pages/client-area/index.page";
import Profile from "./pages/client-area/profile.page";

const socket = socketIO.connect("http://localhost:3030");

export default function App() {
  const [appIsLoading, setAppIsLoading] = useState(true);

  const [toast, setToast] = useState({});

  // Client area props
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppIsLoading(false);
    }, 1000 * 3);
  }, []);

  if (appIsLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Toast type={toast.type} message={toast.message} setToast={setToast} />
      <Routes>
        <Route
          path="/profile"
          element={
            <Profile
              sidebarIsOpen={sidebarIsOpen}
              setSidebarIsOpen={setSidebarIsOpen}
            />
          }
        />
        <Route
          path="/client-area"
          element={
            <ClientAreaIndex
              sidebarIsOpen={sidebarIsOpen}
              setSidebarIsOpen={setSidebarIsOpen}
            />
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/verification/"
          element={<Verification toast={toast} setToast={setToast} />}
        >
          <Route
            path=":token"
            element={<Verification toast={toast} setToast={setToast} />}
          />
        </Route>
        <Route
          path="/register"
          element={<Register toast={toast} setToast={setToast} />}
        />
        <Route
          path="/login"
          element={<Login toast={toast} setToast={setToast} />}
        />
        <Route path="/404" element={<NotFound />} />
        <Route index element={<Index />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
