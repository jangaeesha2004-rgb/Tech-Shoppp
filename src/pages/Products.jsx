import { useState } from "react";
import productsData from "../data/productsData.js";
import { sortMenu, brandsMenu, categoryMenu } from "../data/filterBarData.js";
import ProductCard from "../components/ProductCard.jsx";
import "../styles/Products.css";

// lowest and highest price in the shop (used for the price slider)
const prices = productsData.map((product) => product.finalPrice);
const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);

function Products() {
  const [sortBy, setSortBy] = useState("Latest");
  const [brands, setBrands] = useState(brandsMenu);
  const [categories, setCategories] = useState(categoryMenu);
  const [price, setPrice] = useState(maxPrice);

  // tick / untick a checkbox in a list (brands or categories)
  const toggleCheckbox = (list, setList, id) => {
    setList(
      list.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  // 1. filter
  const selectedBrands = brands.filter((b) => b.checked).map((b) => b.label.toLowerCase());
  const selectedCategories = categories.filter((c) => c.checked).map((c) => c.label);

  let shownProducts = productsData.filter((product) => {
    const brandOk =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand.toLowerCase());
    const categoryOk =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const priceOk = product.finalPrice <= price;
    return brandOk && categoryOk && priceOk;
  });

  // 2. sort (a copy is sorted so the original data does not change)
  shownProducts = [...shownProducts];
  if (sortBy === "Featured") {
    const isFeatured = (p) => (p.tag ? 1 : 0);
    shownProducts.sort((a, b) => isFeatured(b) - isFeatured(a));
  } else if (sortBy === "Top Rated") {
    shownProducts.sort((a, b) => b.rateCount - a.rateCount || b.ratings - a.ratings);
  } else if (sortBy === "Price(Lowest First)") {
    shownProducts.sort((a, b) => a.finalPrice - b.finalPrice);
  } else if (sortBy === "Price(Highest First)") {
    shownProducts.sort((a, b) => b.finalPrice - a.finalPrice);
  }

  // red part of the slider track up to the selected price
  const fillPercent = ((price - minPrice) / (maxPrice - minPrice)) * 100;

  return (
    <main className="products-page page">
      <aside className="filter-bar">
        <h4>Sort By</h4>
        <ul className="sort-list">
          {sortMenu.map((item) => (
            <li key={item.id}>
              <button
                className={sortBy === item.title ? "sort-btn active" : "sort-btn"}
                onClick={() => setSortBy(item.title)}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>

        <h4 className="filter-heading">Filter By</h4>

        <h5>Brands</h5>
        <ul className="check-list">
          {brands.map((item) => (
            <li key={item.id}>
              <label>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheckbox(brands, setBrands, item.id)}
                />
                {item.label}
              </label>
            </li>
          ))}
        </ul>

        <h5>Category</h5>
        <ul className="check-list">
          {categories.map((item) => (
            <li key={item.id}>
              <label>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheckbox(categories, setCategories, item.id)}
                />
                {item.label}
              </label>
            </li>
          ))}
        </ul>

        <h5>Price</h5>
        <p className="price-label">₹{price.toLocaleString("en-IN")}</p>
        <input
          type="range"
          className="price-slider"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, var(--red) ${fillPercent}%, #e8e8e8 ${fillPercent}%)`,
          }}
        />
      </aside>

      <section className="products-list">
        {shownProducts.length > 0 ? (
          <div className="products-grid">
            {shownProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="no-products">No products match your filters.</p>
        )}
      </section>
    </main>
  );
}

export default Products;
