import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import { addToCart, removeFromCart } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  if (!shipping.address) {
    return props.history.push('/shipping');
  } else if (!payment.paymentMethod) {
    return props.history.push('/payment');
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.16 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const handlePlaceOrder = () => {
    //create order
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            {cart.shipping.address},{cart.shipping.city},
            {cart.shipping.postalCode},{cart.shipping.country},
          </div>
          <div>
            <h3>Payment</h3>
            Payment Method:{cart.payment.paymentMethod}
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {cartItems.length === 0 ? (
                <div>Cart is Empty</div>
              ) : (
                cartItems.map((item) => (
                  <li key={item.product}>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div>
                        Qty:
                        {item.qty}
                      </div>
                    </div>
                    <div className="cart-price">${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <button
                onClick={handlePlaceOrder}
                className="button primary full-width"
              >
                Place Order
              </button>
            </li>
            <li>
              <h3>Order Summery</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
