import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import Post from "./pages/Post";

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);

  function toggleSidebar() {
    setOpenSidebar(!openSidebar);
  }

  return (
    <main>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar openSidebar={openSidebar} toggleSidebar={toggleSidebar} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/post" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </main>
  );
}

export default App;
