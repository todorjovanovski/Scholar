export default function SidebarButton({ isSidebarOpen, toggleSidebar }) {
  return (
    <button className="sidebar-toggle-button" onClick={toggleSidebar}>
      {isSidebarOpen ? "<" : ">"}
    </button>
  );
}
