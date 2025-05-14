import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import MainLayout from "./pages/MainLayout";
import UploadPage from "./pages/UploadPage";
import AskPage from "./pages/AskPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<MainLayout />} errorElement={<ErrorPage />}>
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/ask" element={<AskPage />} />
          </Route>
          <Route path="/error-test" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
