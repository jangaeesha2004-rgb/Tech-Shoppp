import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AuthModal from "./components/AuthModal.jsx";
import ScrollToTopButton from "./components/ScrollToTopButton.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";

function App() {
  const location = useLocation();

  // null = modal closed, otherwise "login" or "signup"
  const [authMode, setAuthMode] = useState(null);

  // logged in user is kept in localStorage so a refresh does not log out
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch (error) {
      return null;
    }
  });

  // always start a new page from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
    setAuthMode(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <>
      <Navbar
        user={user}
        onLoginClick={() => setAuthMode("login")}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        {/* any unknown address shows the home page */}
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
      <ScrollToTopButton />

      {authMode && (
        <AuthModal
          mode={authMode}
          onChangeMode={setAuthMode}
          onClose={() => setAuthMode(null)}
          onLogin={handleLogin}
        />
      )}
    </>
  );
}

export default App;
