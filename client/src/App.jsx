import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);

  function toggleSidebar() {
    setOpenSidebar(!openSidebar);
  }

  return (
    <main>
      <Navbar toggleSidebar={toggleSidebar} />
      <AnimatePresence>
        {openSidebar && (
          <Sidebar openSidebar={openSidebar} toggleSidebar={toggleSidebar} />
        )}
      </AnimatePresence>

      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
