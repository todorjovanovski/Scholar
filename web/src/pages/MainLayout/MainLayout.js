import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useFlashcards} from "../../context/FlashcardContext";
import Flashcard from "../../components/Flashcard";

import scholarLogo from "../../assets/scholarLogo.png";
import SidebarButton from "../../components/SidebarButton";

import "./MainLayout.css";

function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);
  const { flashcards } = useFlashcards();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log(isSidebarOpen);
  };

  const openModal = (flashcard) => {
    setSelectedFlashcard(flashcard);
  };

  const closeModal = () => {
    setSelectedFlashcard(null);
  };

  return (
    <div
      className={`layout-container ${isSidebarOpen ? "" : "sidebar-hidden"}`}
    >
      <aside className="layout-sidebar">
        <div className="sidebar-header">
          <img src={scholarLogo} alt="Scholar" className="logo" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/upload">Upload PDF</Link>
            </li>
            <li>
              <Link to="/ask">Ask about FINKI</Link>
            </li>
            <hr/>
            <li><strong>Saved Flashcards</strong></li>
            {flashcards.length === 0 && <li>No flashcards saved.</li>}
            {flashcards.map((fc, index) => (
              <li key={fc.id || index}>
                <button
                  onClick={() => openModal(fc)}
                >
                  {fc.question.length > 30
                    ? fc.question.slice(0, 30) + "..."
                    : fc.question}
                  {/* TODO: Implement delete functionality from endpoint */}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <SidebarButton
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </aside>

      <main className="layout-content">
        {!isSidebarOpen && (
          <SidebarButton
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        )}
        <Outlet />
      </main>
      {selectedFlashcard && (
        <Flashcard
          question={selectedFlashcard.question}
          answer={selectedFlashcard.answer}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default MainLayout;
