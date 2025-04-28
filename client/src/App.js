import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserInfo from "./pages/UserInfo";
import Wishlist from "./pages/Wishlist";
import DestinationDetails from "./components/DestinationDetails";
import "leaflet/dist/leaflet.css";
import AuthInitializer from "./components/AuthInitializer";

function App() {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="App">
      <AuthInitializer /> {/* 👈 Always keep this on top */}
      {user ? (
        <>
          <Header />
          <main className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destination/:id" element={<DestinationDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/userinfo" element={<UserInfo />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </main>
        </>
      ) : (
        <LandingPage />
      )}
    </div>
  );
}

export default App;
