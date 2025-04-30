import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import Button from "../ReusbleComponents/Button";
import Batch from "../ReusbleComponents/Batch";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { defaultProducts } from "../Products";
import {
  addCartDataAction,
  decreamentQuantityAction,
  deleteCartDataAction,
  increamentQuantityAction,
  setProductCreator,
} from "../Redux/Creator";
import "./UserPage.css";

const User = ({ filter, setFilter }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.products.allProducts);
  const cartProducts = useSelector((state) => state.products.cartData);

  useEffect(() => {
    return () => {
      setFilter({
        search: "",
        category: [],
        price: "",
      });
    };
  }, []);

  const handelAddCart = (event, item) => {
    event.stopPropagation();
    dispatch(addCartDataAction({ ...item, quantity: 1 }));
  };

  const handleIncreament = (event, id) => {
    event.stopPropagation();
    dispatch(increamentQuantityAction(id));
  };

  const handelDecreament = (event, id, quantity) => {
    event.stopPropagation();
    if (quantity > 1) {
      dispatch(decreamentQuantityAction(id));
    } else {
      dispatch(deleteCartDataAction(id));
    }
  };

  const getFilteredProducts = useMemo(() => {
    let productsList = productData ? [...productData] : [];
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
    <div className="content">
      {getFilteredProducts?.map((item) => {
        return (
          <div key={item.id} className="card">
            <img
              src={item.image}
              alt={item.name}
              onClick={() => navigate(`/user/${item.id}`)}
            />
            <div
              className="item-details"
              onClick={() => navigate(`/user/${item.id}`)}
            >
              <div className="item-title">
                <span className="title">Title: </span>
                <span>{item.name}</span>
              </div>
              <Batch batchName={item.category} />
              <div className="item-value">
                <div className="item-price">
                  <box-icon name="rupee" color="#019104"></box-icon>
                  <span>{item.price}</span>
                </div>
                <div className="item-rating">
                  <div className="item-rating-title">
                    <span className="title">Rating: </span>
                    <span>{item.rating}</span>
                  </div>
                  <Rating rating={item.rating} />
                </div>
              </div>
            </div>
            {cartProducts?.some((data) => data.id === item.id) ? (
              <div className="quantity-button">
                <Button
                  handleClick={(e) =>
                    handelDecreament(
                      e,
                      item.id,
                      cartProducts.find((data) => data.id === item.id)?.quantity
                    )
                  }
                  buttonName="-"
                  className="primary"
                />

                <h2>
                  {cartProducts.find((data) => data.id === item.id)?.quantity}
                </h2>

                <Button
                  buttonName="+"
                  className="primary"
                  handleClick={(e) => handleIncreament(e, item.id)}
                />
              </div>
            ) : (
              <Button
                buttonName="Add To Cart"
                className="primary"
                handleClick={(event) => handelAddCart(event, item)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default User;
