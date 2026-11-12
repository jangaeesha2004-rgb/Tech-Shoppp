import { Link } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { BsCartX } from "react-icons/bs";
import { useCart } from "../context/CartContext.jsx";
import "../styles/Cart.css";

const formatPrice = (amount) => "₹" + amount.toLocaleString("en-IN");

function Cart() {
  const { cartItems, removeFromCart, changeQuantity, clearCart, totalQuantity } = useCart();

  // empty cart screen
  if (cartItems.length === 0) {
    return (
      <main className="cart-page page cart-empty">
        <BsCartX className="empty-icon" />
        <h2>Your Cart is Empty</h2>
        <Link to="/products" className="btn-red">
          Start Shopping
        </Link>
      </main>
    );
  }

  // order summary numbers
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const finalTotal = cartItems.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);
  const discount = originalTotal - finalTotal;

  const handleCheckout = () => {
    alert("Thank you! Your order has been placed.");
    clearCart();
  };

  return (
    <main className="cart-page page">
      <section className="cart-list">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <Link to={`${item.path}${item.id}`} className="cart-item-image">
              <img src={item.images[0]} alt={item.title} />
            </Link>

            <div className="cart-item-details">
              <Link to={`${item.path}${item.id}`}>
                <h3>
                  {item.title} {item.info}
                </h3>
              </Link>

              <div className="price-row">
                <span className="final-price">{formatPrice(item.finalPrice)}</span>
                <span className="original-price">{formatPrice(item.originalPrice)}</span>
              </div>

              <div className="quantity-box">
                <button onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity">
                  <FiMinus />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity">
                  <FiPlus />
                </button>
              </div>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
              aria-label="Remove item"
            >
              <FiTrash2 />
              <span className="remove-tooltip">Remove Item</span>
            </button>
          </div>
        ))}
      </section>

      <aside className="order-summary">
        <h3>
          Order Summary <span>( {totalQuantity} {totalQuantity === 1 ? "item" : "items"} )</span>
        </h3>

        <div className="summary-row">
          <span>Original Price</span>
          <span className="summary-value">{formatPrice(originalTotal)}</span>
        </div>
        <div className="summary-row">
          <span>Discount</span>
          <span className="summary-value green">- {formatPrice(discount)}</span>
        </div>
        <div className="summary-row">
          <span>Delivery</span>
          <span className="summary-value green">Free</span>
        </div>

        <div className="summary-total">
          <span>Total Price</span>
          <span>{formatPrice(finalTotal)}</span>
        </div>

        <button className="btn-red checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </aside>
    </main>
  );
}

export default Cart;
