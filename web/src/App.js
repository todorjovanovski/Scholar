import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage.js";
import MainLayout from "./pages/MainLayout/MainLayout.js";
import UploadPage from "./pages/UploadPage.js";
import AskPage from "./pages/AskPage/AskPage.js";
import ErrorPage from "./pages/ErrorPage.js";
import {FlashcardProvider} from "./context/FlashcardContext";

function App() {
  return (
    <FlashcardProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<MainLayout />} errorElement={<ErrorPage />}>
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/ask" element={<AskPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </FlashcardProvider>
  );
}

export default App;
