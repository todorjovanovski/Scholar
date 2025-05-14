import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import scholarLogo from "../../assets/scholarLogo.png";
import SidebarButton from "../../components/SidebarButton";

import "./MainLayout.css";

function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log(isSidebarOpen);
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
    </div>
  );
}

export default MainLayout;
