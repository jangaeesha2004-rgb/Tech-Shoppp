import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import productsData from "../data/productsData.js";
import ProductCard from "./ProductCard.jsx";
import "../styles/TopProducts.css";

const categories = ["All", "Headphones", "Earbuds", "Earphones", "Neckbands"];

// "Top Products": category tabs and a grid of up to 11 products + "Browse All Products"
function TopProducts() {
  const [selected, setSelected] = useState("All");

  const filtered =
    selected === "All"
      ? productsData
      : productsData.filter((product) => product.category === selected);

  const visibleProducts = filtered.slice(0, 11);

  return (
    <section className="top-products">
      <h2 className="section-title">Top Products</h2>

      <ul className="category-tabs">
        {categories.map((category) => (
          <li key={category}>
            <button
              className={category === selected ? "tab-btn active" : "tab-btn"}
              onClick={() => setSelected(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      <div className="products-grid">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        <Link to="/products" className="browse-card">
          <span>
            Browse All Products <FiArrowRight />
          </span>
        </Link>
      </div>
    </section>
  );
}

export default TopProducts;
