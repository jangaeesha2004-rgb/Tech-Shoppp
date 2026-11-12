import { useState } from "react";
import productsData from "../data/productsData.js";
import ProductCard from "./ProductCard.jsx";
import "../styles/RelatedProducts.css";

const cardsPerView = 4;

// products from the same category, shown as a small slider
function RelatedProducts({ product }) {
  const related = productsData.filter((p) => p.category === product.category);

  // each dot moves the slider by one card
  const positions = Math.max(1, related.length - cardsPerView + 1);
  const [position, setPosition] = useState(0);
  const currentPosition = Math.min(position, positions - 1);

  const dots = [];
  for (let i = 0; i < positions; i++) {
    dots.push(
      <button
        key={i}
        className={i === currentPosition ? "dot active" : "dot"}
        onClick={() => setPosition(i)}
        aria-label={`Related products ${i + 1}`}
      ></button>
    );
  }

  return (
    <section className="related">
      <h2 className="section-title">Related Products</h2>

      <div className="related-window">
        <div
          className="related-track"
          style={{ transform: `translateX(-${currentPosition * (100 / cardsPerView)}%)` }}
        >
          {related.map((item) => (
            <div className="related-item" key={item.id}>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>

      {positions > 1 && <div className="dots related-dots">{dots}</div>}
    </section>
  );
}

export default RelatedProducts;
