import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import productsData from "../data/productsData.js";

// Search box that opens from the navbar. It shows matching product names
// while the user types.
function SearchBar({ onClose }) {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const results = productsData.filter((product) =>
    product.title.toLowerCase().includes(searchText.trim().toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div className="search-box">
      <div className="search-input-row">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for product..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-close" onClick={onClose} aria-label="Close search">
          ×
        </button>
      </div>

      {searchText.trim() !== "" && (
        <ul className="search-results">
          {results.length > 0 ? (
            results.map((product) => (
              <li key={product.id}>
                <Link to={`/product-details/${product.id}`} onClick={onClose}>
                  {product.title}
                </Link>
              </li>
            ))
          ) : (
            <li className="search-empty">No products found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
