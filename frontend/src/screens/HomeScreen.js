import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { listProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

export default function HomeScreen() {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    return () => {
      //
    };
  }, []);
  return loading ? (
    <div>loading ....</div>
  ) : error ? (
    <div>{error.message}</div>
  ) : (
    <div>
      <ul className="products">
        {products.map((product) => (
          <li key={product._id}>
            <div className="product">
              <img
                className="product-image"
                src={product.image}
                alt="product"
              />
              <div className="product-name">
                <Link to={`/products/${product._id}`}>{product.name}</Link>
              </div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-ratings">
                {product.rating} stars ({product.numReviews} reviews)
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
