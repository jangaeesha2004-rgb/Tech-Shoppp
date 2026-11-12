import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { useCart } from "../context/CartContext.jsx";
import { dropdownMenu } from "../data/headerData.js";
import SearchBar from "./SearchBar.jsx";
import "../styles/Navbar.css";

function Navbar({ user, onLoginClick, onLogout }) {
  const { totalQuantity } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // navbar turns solid black once the page is scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scrolled ? "navbar navbar-solid" : "navbar"}>
      <Link to="/" className="navbar-logo">
        Tech-Shop
      </Link>

      {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}

      <div className="navbar-icons">
        <button
          className="icon-btn"
          aria-label="Search"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <FiSearch />
        </button>

        <Link to="/cart" className="icon-btn cart-link" aria-label="Cart">
          <FiShoppingCart />
          {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
          <span className="icon-tooltip">Cart</span>
        </Link>

        <div
          className="user-wrapper"
          onMouseEnter={() => setUserMenuOpen(true)}
          onMouseLeave={() => setUserMenuOpen(false)}
        >
          <button
            className="icon-btn"
            aria-label="Account"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <FiUser />
          </button>

          {userMenuOpen && (
            <div className="user-dropdown">
              {user ? (
                <>
                  <h4>Hello, {user.username}!</h4>
                  <p>Access account and manage orders</p>
                  <button
                    className="dropdown-btn"
                    onClick={() => {
                      onLogout();
                      setUserMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <h4>Hello!</h4>
                  <p>Access account and manage orders</p>
                  <button
                    className="dropdown-btn"
                    onClick={() => {
                      onLoginClick();
                      setUserMenuOpen(false);
                    }}
                  >
                    Login / Signup
                  </button>
                  <div className="dropdown-line"></div>
                  {dropdownMenu.map((item) => (
                    <span key={item.id} className="dropdown-link">
                      {item.link}
                    </span>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
