import { useState } from "react";
import { Link } from "react-router-dom";
import { footMenu, footSocial } from "../data/footerData.jsx";
import "../styles/Footer.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", ok: false });

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === "") {
      setMessage({ text: "Please enter your email address", ok: false });
    } else if (!emailPattern.test(email)) {
      setMessage({ text: "Please enter a valid email address", ok: false });
    } else {
      setMessage({ text: "Thank you for subscribing!", ok: true });
      setEmail("");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-subscribe">
          <Link to="/" className="footer-logo">
            Tech-Shop
          </Link>
          <p>
            Subscribe to our Email alerts to receive early discount offers, and new
            products info.
          </p>
          <form onSubmit={handleSubscribe} noValidate>
            <input
              type="email"
              placeholder="Email Address*"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage({ text: "", ok: false });
              }}
            />
            {message.text && (
              <span className={message.ok ? "sub-msg sub-ok" : "sub-msg sub-error"}>
                {message.text}
              </span>
            )}
            <button type="submit" className="btn-red">
              Subscribe
            </button>
          </form>
        </div>

        {footMenu.map((column) => (
          <div className="footer-column" key={column.id}>
            <h4>{column.title}</h4>
            <ul>
              {column.menu.map((item) => (
                <li key={item.id}>
                  <Link to={item.path}>{item.link}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>{new Date().getFullYear()} | All Rights Reserved ©.</p>
        <ul className="footer-social">
          {footSocial.map((item) => (
            <li key={item.id}>
              <a href={item.path}>{item.icon}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
