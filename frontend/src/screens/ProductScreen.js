import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';

export default function ProductScreen(props) {
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(detailsProduct(productId));
    return () => {
      //
    };
  }, []);

  const handleAddToCart = () => {
    props.history.push('/cart/' + productId + '?qty=' + qty);
  };

  return loading ? (
    <div>loading ...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to results</Link>
      </div>
      <div className="details">
        <div className="details-image">
          <img src={product.image} alt="product" />
        </div>
        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Stars ({product.numReviews} Reviews)
            </li>
            <li>
              Price: <strong>${product.price}</strong>
            </li>
            <li>
              Description:
              <div>{product.description}</div>
            </li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>Price: {product.price}</li>
          </ul>
          <ul>
            <li>
              Status: {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
            </li>
          </ul>
          <ul>
            <li>
              Qty:{' '}
              <select value={qty} onChange={(e) => setQty(e.target.value)}>
                {[...Array(product.countInStock).keys()].map((count) => (
                  <option key={count + 1} value={count + 1}>
                    {count + 1}
                  </option>
                ))}
              </select>
            </li>
            <li>
              {product.countInStock > 0 && (
                <button onClick={handleAddToCart} className="button primary">
                  Add to Cart
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
