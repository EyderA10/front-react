import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Form } from "../components/form/Form";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="*" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
};
