import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productsData from "../data/productsData.js";
import "../styles/Hero.css";

// big slider at the top of the home page (products tagged "hero-product")
function Hero() {
  const heroProducts = productsData.filter((p) => p.tag === "hero-product");
  const [current, setCurrent] = useState(0);

  // move to the next slide every 4 seconds; the timer restarts when the slide changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((current + 1) % heroProducts.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [current, heroProducts.length]);

  return (
    <section className="hero">
      <div
        className="hero-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {heroProducts.map((product) => (
          <div className="hero-slide" key={product.id}>
            <span className="hero-bg-text">{product.type}</span>

            <div className="hero-text">
              <p className="hero-title">{product.title}</p>
              <h1>{product.tagline}</h1>
              <div className="hero-price">
                <span className="final-price">
                  ₹{product.finalPrice.toLocaleString("en-IN")}
                </span>
                <span className="original-price">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <Link to={`${product.path}${product.id}`} className="btn-red hero-btn">
                Shop Now
              </Link>
            </div>

            <div className="hero-image">
              <img src={product.heroImage} alt={product.title} />
            </div>
          </div>
        ))}
      </div>

      <div className="dots hero-dots">
        {heroProducts.map((product, index) => (
          <button
            key={product.id}
            className={index === current ? "dot active" : "dot"}
            onClick={() => setCurrent(index)}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default Hero;
