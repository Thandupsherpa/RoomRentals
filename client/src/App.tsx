import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Error from "./pages/Error";
import { useEffect } from "react";
import { useUser, type User } from "./contexts/userprovider.tsx";
import { DEV_TENANT } from "./data/user.ts";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";

const App = () => {
  const { setUser, user } = useUser();

  useEffect(() => {
    if (user) return;
    if (import.meta.env.VITE_DEV_ENV == "DEV") {
      setUser(DEV_TENANT as User);
    }
  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
