import { useEffect, useState } from "react";
import { FiChevronUp } from "react-icons/fi";
import "../styles/ScrollToTopButton.css";

// red square button (bottom right) that appears after scrolling down
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      className="scroll-top-btn"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <FiChevronUp />
    </button>
  );
}

export default ScrollToTopButton;
