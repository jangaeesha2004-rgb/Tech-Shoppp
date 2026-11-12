import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import Stars from "./Stars.jsx";
import "../styles/ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    // the button goes back to normal after a moment
    setTimeout(() => setAdded(false), 1500);
  };

  const detailsLink = `${product.path}${product.id}`;

  return (
    <div className="product-card">
      <Link to={detailsLink} className="product-card-image">
        <img src={product.images[0]} alt={product.title} />
      </Link>

      <div className="product-card-body">
        <Stars count={product.rateCount} />
        <Link to={detailsLink}>
          <h3>{product.title}</h3>
        </Link>
        <p className="product-card-info">{product.info}</p>

        <div className="product-card-bottom">
          <div className="price-row">
            <span className="final-price">₹{product.finalPrice.toLocaleString("en-IN")}</span>
            <span className="original-price">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          </div>
          <button
            className={added ? "btn-red add-btn added" : "btn-red add-btn"}
            onClick={handleAdd}
          >
            {added ? "Added" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
