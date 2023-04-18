import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PostJob } from "../components/postJob/PostJob";
import { JobList } from "../components/jobsList/JobsList";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/postJob" element={<PostJob />} />
        <Route exact path="/jobsList" element={<JobList />} />
        <Route path="*" element={<Navigate to="/postJob" />} />
      </Routes>
    </BrowserRouter>
  );
};
