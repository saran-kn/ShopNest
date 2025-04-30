import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreamentQuantityAction,
  deleteCartDataAction,
  increamentQuantityAction,
} from "../../Redux/Creator";
import Button from "../../ReusbleComponents/Button";
import { useNavigate } from "react-router-dom";
import empty from "../../assets/no task.jpg";
import "./Cart.css";

const Cart = () => {
  const cartProducts = useSelector((state) => state.products.cartData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelDelete = (data) => {
    dispatch(deleteCartDataAction(data.id));
  };

  const handelAdd = (id) => {
    dispatch(increamentQuantityAction(id));
  };
  const handelMinus = (id) => {
    const product = cartProducts.find((item) => item.id === id);
    if (product.quantity > 1) {
      dispatch(decreamentQuantityAction(id));
    } else {
      dispatch(deleteCartDataAction(id));
    }
  };

  return (
    <>
      {cartProducts?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Quantity</th>
              <th>Clear</th>
            </tr>
          </thead>

          <tbody>
            {cartProducts?.map((item, index) => {
              const { name, category, price, rating, quantity, id } = item;
              return (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{category}</td>
                  <td>
                    {" "}
                    <box-icon name="rupee" color="#019104"></box-icon>
                    {price}
                  </td>
                  <td>{rating}</td>
                  <td className="cart-quantity">
                    <div className="quantity-buttons">
                      <Button
                        handleClick={() => handelMinus(id)}
                        buttonName="-"
                        className="primary"
                      />
                      <h2>{quantity}</h2>
                      <Button
                        handleClick={() => handelAdd(id)}
                        buttonName="+"
                        className="primary"
                      />
                    </div>
                  </td>
                  <td>
                    <box-icon
                      type="solid"
                      name="trash"
                      color="#27548A"
                      onClick={() => handelDelete(item)}
                    ></box-icon>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="empty-image">
          <img src={empty} alt="Empty" />
        </div>
      )}
      <div className="cart-button">
        <Button
          className="go-back"
          buttonName="Go Back"
          handleClick={() => navigate(-1)}
        />
      </div>
    </>
  );
};

export default Cart;
