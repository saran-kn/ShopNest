import { useState } from "react";
import "./Header.css";
import Modal from "../ReusbleComponents/Modal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ filter, setFilter }) => {
  const { pathname } = useLocation();
  const { productId } = useParams();
  const loggedData = localStorage.getItem("loggedUser");
  const user = loggedData ? JSON.parse(loggedData) : [];
  const navigate = useNavigate();
  const productQuantity = useSelector((state) => state.products.cartData);
  const [showModal, setShowModal] = useState(false);

  const showSearchbarPaths = ["/user", "/admin"];

  const handleLogout = () => {
    localStorage.clear();
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="header-container">
      <div className="title-container">
        <span className="title">ShopNest</span>
        <box-icon
          type="solid"
          name="cart-alt"
          color="#F5EEDC"
          size="md"
        ></box-icon>
      </div>
      {showSearchbarPaths.includes(pathname) && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products by title..."
            onChange={(e) =>
              setFilter((p) => ({ ...p, search: e.target.value }))
            }
            value={filter.search}
          />
          <box-icon name="search" size="md"></box-icon>
        </div>
      )}

      <div className="user-container">
        {pathname?.startsWith("/user") && (
          <div
            className="cart-container"
            onClick={() => navigate("/user/cart")}
          >
            <span className="item-no">{productQuantity?.length}</span>
            <box-icon name="cart" color="#F5EEDC" size="md"></box-icon>
          </div>
        )}
        <span className="user-icon" onClick={() => setShowModal(true)}>
          {user[0]?.userName[0].toUpperCase()}
        </span>
      </div>
      {showModal && (
        <Modal
          title="Logout?"
          content="Are you sure want to Logout?"
          primaryButton="Logout"
          secondaryButton="Cancel"
          handleClose={() => setShowModal(false)}
          handlePrimary={handleLogout}
        />
      )}
    </div>
  );
};

export default Header;
