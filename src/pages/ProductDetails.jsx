import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../data/productsData.js";
import { useCart } from "../context/CartContext.jsx";
import Stars from "../components/Stars.jsx";
import ProductTabs from "../components/ProductTabs.jsx";
import RelatedProducts from "../components/RelatedProducts.jsx";
import Services from "../components/Services.jsx";
import "../styles/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === Number(id));

  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="page not-found">
        <h2>Product not found</h2>
        <Link to="/products" className="btn-red">
          Back to Products
        </Link>
      </main>
    );
  }

  const savedAmount = product.originalPrice - product.finalPrice;
  const savedPercent = Math.round((savedAmount / product.originalPrice) * 100);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <main className="details-page page">
      <section className="details-top">
        <div className="gallery">
          <ul className="thumbnails">
            {product.images.map((image, index) => (
              <li key={image}>
                <button
                  className={index === selectedImage ? "thumb active" : "thumb"}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.title} ${index + 1}`} />
                </button>
              </li>
            ))}
          </ul>
          <div className="main-image">
            <img src={product.images[selectedImage]} alt={product.title} />
          </div>
        </div>

        <div className="details-info">
          <h1>{product.title}</h1>
          <h2>{product.info}</h2>
          <div className="details-rating">
            <Stars count={product.rateCount} />
            <span className="rating-line">|</span>
            <span>{product.ratings} Ratings</span>
          </div>

          <div className="details-price">
            <div>
              <div className="price-row">
                <span className="big-price">₹{product.finalPrice.toLocaleString("en-IN")}</span>
                <span className="original-price">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="you-save">
                You save: ₹{savedAmount.toLocaleString("en-IN")} ({savedPercent}%)
              </p>
              <p className="inclusive">(Inclusive of all taxes)</p>
            </div>
            <span className="in-stock">✓ In Stock</span>
          </div>

          <div className="offers">
            <h3>Offers and Discounts</h3>
            <div className="offer-boxes">
              <div>No Cost EMI on Credit Card</div>
              <div>Pay Later &amp; Avail Cashback</div>
            </div>
          </div>

          <div className="details-add">
            <button
              className={added ? "btn-red details-add-btn added" : "btn-red details-add-btn"}
              onClick={handleAdd}
            >
              {added ? "Added" : "Add to cart"}
            </button>
          </div>
        </div>
      </section>

      <ProductTabs product={product} />

      <RelatedProducts product={product} />

      <Services />
    </main>
  );
}

export default ProductDetails;
