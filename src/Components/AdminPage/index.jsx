import { useEffect, useMemo, useState } from "react";

import Button from "../ReusbleComponents/Button";
import "./Admin.css";
import Modal from "../ReusbleComponents/Modal";
import AddProduct from "./Addproducts";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductCreator,
  deleteProductCreator,
  editProductCreator,
} from "../Redux/Creator";
import { useNavigate } from "react-router-dom";

const productDetails = {
  id: Date.now(),
  name: "",
  category: "",
  image: null,
  price: "",
  description: "",
  rating: "",
};

const Admin = ({ filter,setFilter }) => {
  const [showModal, setShowModal] = useState(false);
  const productData = useSelector((prev) => prev.products.allProducts);
  const dispatch = useDispatch();
  const [products, setProducts] = useState(productDetails);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
   return ()=>{ setFilter({
        search: "",
        category: [],
        price: "",
    })}
  },[])

  const addNewProduct = () => {
    dispatch(addProductCreator(products));
    setShowModal(false);
  };

  const setAddData = () => {
    setShowModal(true);
    products.id = "";
    products.name = "";
    products.category = "";
    products.price = "";
    products.description = "";
    products.rating = "";
  };

  const handleEdit = (item) => {
    setShowModal(true);
    setEditId(item.id);
    products.id = item.id;
    products.name = item.name;
    products.category = item.category;
    products.price = item.price;
    products.description = item.description;
    products.rating = item.rating;
  };

  const updateProduct = () => {
    dispatch(editProductCreator(products));
    setEditId(null);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteProductCreator(id));
  };

  const getFilteredProducts = useMemo(() => {
    let productsList = [...productData];
    if (productData) {
      if (filter.search) {
        productsList = productsList.filter((data) =>
          data.name.toLowerCase().includes(filter.search.toLowerCase())
        );
      }
    }
    if (productData) {
      if (filter.category?.length) {
        productsList = productsList.filter((data) =>
          filter.category.includes(data.category)
        );
      }
      if (filter.price) {
        productsList = productsList.filter((data) => {
          if (filter.price === "1" && data.price < 1000) {
            return data;
          }
          if (
            filter.price === "2" &&
            data.price >= 1000 &&
            data.price <= 5000
          ) {
            return data;
          }
          if (filter.price === "3" && data.price > 10000) {
            return data;
          }
        });
      }
      return productsList;
    }
    return null;
  }, [productData, filter]);

  return (
    <div className="admin-main-container">
      <div className="admin-buttons">
        <Button
          buttonName="Show Users"
          className="secondary"
          handleClick={() => navigate("/showusers")}
        />
        <Button
          buttonName="Add Products"
          className="go-back"
          handleClick={setAddData}
        />
      </div>
      <table>
  <thead>
    <tr>
      <th>Product Name</th>
      <th>Product Image</th>
      <th>Product Category</th>
      <th>Price</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {getFilteredProducts?.map((item) => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td><img src={item.image} alt="product" /></td>
        <td>{item.category}</td>
        <td>Rs.{item.price}</td>
        <td>
          <box-icon
            type="solid"
            name="edit"
            color="#27548A"
            onClick={() => handleEdit(item)}
          ></box-icon>
        </td>
        <td>
          <box-icon
            name="trash"
            type="solid"
            color="#27548A"
            onClick={() => handleDelete(item.id)}
          ></box-icon>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      {showModal && (
        <Modal
          title="Add New Product"
          primaryButton={editId ? "Edit" : "Add"}
          secondaryButton="Cancel"
          content={<AddProduct products={products} setProducts={setProducts} />}
          handleClose={() => setShowModal(false)}
          handlePrimary={editId ? updateProduct : addNewProduct}
        />
      )}
    </div>
  );
};

export default Admin;


{/* <div className="admin-main-container">
<div className="admin-buttons">
  <Button
    buttonName="Show Users"
    className="secondary"
    handleClick={() => navigate("/showusers")}
  />
  <Button
    buttonName="Add Products"
    className="go-back"
    handleClick={setAddData}
  />
</div>
<div className="admin-table">
  <div className="admin-table-header">
    <span>Poduct Name</span>
    <span>Product Image</span>
    <span>Product Category</span>
    <span>Price</span>
    <span>Edit</span>
    <span>Delete</span>
  </div>
  <div className="admin-table-products">
    {getFilteredProducts?.map((item) => {
      return (
        <div className="table-product" key={item.id}>
          <span className="product-name">{item.name}</span>
          <span className="product-image">
            <img src={item.image} alt="image" />
          </span>
          <span className="product-description">{item.category}</span>
          <span className="product-price">Rs.{item.price}</span>
          <box-icon
            type="solid"
            name="edit"
            color="#27548A"
            onClick={() => handleEdit(item)}
          ></box-icon>
          <box-icon
            name="trash"
            type="solid"
            color="#27548A"
            onClick={() => handleDelete(item.id)}
          ></box-icon>
        </div>
      );
    })}
  </div>
</div> */}
