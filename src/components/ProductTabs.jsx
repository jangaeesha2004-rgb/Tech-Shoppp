import { useState } from "react";
import reviewsData from "../data/reviewsData.js";
import Stars from "./Stars.jsx";
import "../styles/ProductTabs.css";

const tabNames = ["Specifications", "Overview", "Reviews"];

// Specifications / Overview / Reviews tabs on the product details page
function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("Specifications");

  const specs = [
    { label: "Brand", value: product.brand },
    { label: "Model", value: product.title },
    { label: "Generic Name", value: product.category },
    { label: "Headphone Type", value: product.type },
    { label: "Connectivity", value: product.connectivity },
    { label: "Microphone", value: "Yes" },
  ];

  return (
    <section className="tabs-section">
      <ul className="tab-list">
        {tabNames.map((name) => (
          <li key={name}>
            <button
              className={name === activeTab ? "tab-item active" : "tab-item"}
              onClick={() => setActiveTab(name)}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>

      {activeTab === "Specifications" && (
        <table className="spec-table">
          <tbody>
            {specs.map((spec) => (
              <tr key={spec.label}>
                <td>{spec.label}</td>
                <td>{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === "Overview" && (
        <div className="overview">
          <h3>
            The <span className="red-text">{product.title}</span> {product.info} provides
            with fabulous sound quality
          </h3>
          <ul>
            <li>Sound Tuned to Perfection</li>
            <li>Comfortable to Wear</li>
            <li>Long Hours Playback Time</li>
          </ul>
          <p>
            Buy the{" "}
            <strong>
              {product.title} {product.info}
            </strong>{" "}
            which offers you with fabulous music experience by providing you with awesome
            sound quality that you can never move on from. Enjoy perfect flexibility and
            mobility with amazing musical quality with these {product.category} giving you a
            truly awesome audio experience. It blends with exceptional sound quality and a
            range of smart features for an unrivalled listening experience.
          </p>
        </div>
      )}

      {activeTab === "Reviews" && (
        <div className="reviews">
          {reviewsData.map((review) => (
            <div className="review" key={review.id}>
              <div className="review-head">
                <h4>{review.name}</h4>
                <span>{review.date}</span>
              </div>
              <Stars count={review.rateCount} />
              <p>{review.review}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductTabs;
