import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/index.page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}
