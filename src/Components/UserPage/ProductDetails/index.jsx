import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../Rating";
import { storeProduct } from "../../store/store";
import {
  addCartDataAction,
  decreamentQuantityAction,
  deleteCartDataAction,
  increamentQuantityAction,
} from "../../Redux/Creator";
import Button from "../../ReusbleComponents/Button";

const ProductDetails = () => {
  const navigation = useNavigate();

  const allProducts = useSelector((state) => state.products.allProducts);
  const cartProducts = useSelector((state) => state.products.cartData);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const productData = allProducts?.find((item) => {
    if (item.id == productId) {
      return item;
    }
  });

  const cartItem = cartProducts?.filter((item) => item.id === productData?.id);

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
  storeProduct("selectedProduct", productData);
  const product = JSON.parse(localStorage.getItem("selectedProduct"));

  return (
    <div className="details-main-container">
      <div className="details-container">
        <img src={product?.image} alt="Image" />
        <div className="details">
          <span>
            <span className="header">Title: </span> {product?.name}
          </span>
          <div className="details-price-rating">
            <div className="details-price">
              <box-icon name="rupee" color="#019104"></box-icon>
              <span>{product?.price}</span>
            </div>
            <div className="details-rating">
              <span>
                <span className="header">Rating:</span> {product?.rating}
              </span>
              <span>
                <Rating rating={product?.rating} />
              </span>
            </div>
          </div>
          <div className="details-description">
            <span>{product?.description}</span>
          </div>
          <div className="details-buttons">
            {cartItem?.some((data) => data.id === productData.id) ? (
              <div className="quantity-button">
                <Button
                  handleClick={(e) =>
                    handelDecreament(
                      e,
                      productData.id,
                      cartItem.find((data) => data.id === productData.id)
                        ?.quantity
                    )
                  }
                  buttonName="-"
                  className="primary"
                />

                <h2>
                  {
                    cartItem.find((data) => data.id === productData.id)
                      ?.quantity
                  }
                </h2>

                <Button
                  buttonName="+"
                  className="primary"
                  handleClick={(e) => handleIncreament(e, productData.id)}
                />
              </div>
            ) : (
              <Button
                buttonName="Add To Cart"
                className="primary"
                handleClick={(event) => handelAddCart(event, productData)}
              />
            )}
            <Button
              buttonName="Go Back"
              className="go-back"
              handleClick={() => navigation(-1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
