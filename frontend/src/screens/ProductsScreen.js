import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  listProducts,
  saveProduct,
  deleteProduct,
} from '../actions/productActions';

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInstock] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        description,
        category,
        countInStock,
      })
    );
    setModalVisible(false);
  };

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCountInstock(product.countInStock);
    setCategory(product.category);
    setDescription(product.description);
    setModalVisible(true);
  };

  const deleteProductHandle = (productId) => {
    dispatch(deleteProduct(productId));
  };
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button
          className="button primary  "
          onClick={() =>
            openModal({
              name: '',
              price: '',
              image: '',
              brand: '',
              description: '',
              category: '',
              countInStock: '',
            })
          }
        >
          Create Product
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container ">
              <li>
                <h2>{id ? 'Update' : 'Create'} Product</h2>
              </li>
              <li>
                {loadingSave && <div className="text-center">loading ...</div>}
                {errorSave && (
                  <div className="text-danger text-center">{errorSave}</div>
                )}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="countInstock">Count in Stock</label>
                <input
                  type="text"
                  name="countInstock"
                  id="countInstock"
                  value={countInStock}
                  onChange={(e) => setCountInstock(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  name="category"
                  id="cartegory"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'create'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => setModalVisible(false)}
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Count In Stock</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.countInStock}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>

                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteProductHandle(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsScreen;
