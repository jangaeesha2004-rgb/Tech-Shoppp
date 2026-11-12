import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../data/productsData.js";
import "../styles/FeaturedSlider.css";

// "Featured Products": the product in the middle is big, the others get
// smaller the further they are from the middle. It keeps rotating by itself.
function FeaturedSlider() {
  const featured = productsData.filter((p) => p.tag === "featured-product");
  const total = featured.length;

  const [active, setActive] = useState(total - 1);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      setActive((active + 1) % total);
    }, 3000);
    return () => clearTimeout(timer);
  }, [active, paused, total]);

  // how far an item is from the middle one: -2, -1, 0, 1 or 2 (wraps around)
  const getOffset = (index) => {
    let offset = index - active;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  const handleClick = (index, product) => {
    if (index === active) {
      navigate(`${product.path}${product.id}`);
    } else {
      setActive(index);
    }
  };

  return (
    <section
      className="featured"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 className="section-title">Featured Products</h2>

      <div className="featured-stage">
        {featured.map((product, index) => {
          const offset = getOffset(index);
          return (
            <div
              key={product.id}
              className={`featured-item offset-${offset}`}
              onClick={() => handleClick(index, product)}
            >
              <p className="featured-name">{product.title}</p>
              <img src={product.images[0]} alt={product.title} />
              <div className="featured-price">
                <span className="final-price">
                  ₹{product.finalPrice.toLocaleString("en-IN")}
                </span>
                <span className="original-price">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dots featured-dots">
        {featured.map((product, index) => (
          <button
            key={product.id}
            className={index === active ? "dot active" : "dot"}
            onClick={() => setActive(index)}
            aria-label={`Featured ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default FeaturedSlider;
