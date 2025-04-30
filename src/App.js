import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./Components/LoginPage";
import "boxicons";
import CreateAccount from "./Components/CreateAccountPage";
import User from "./Components/UserPage";
import Admin from "./Components/AdminPage";
import SideBar from "./Components/SideBar";
import Header from "./Components/Header";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";
import ShowUsers from "./Components/AdminPage/showUsers/ShowUsers";
import { useEffect,useState } from "react";
import ProductDetails from "./Components/UserPage/ProductDetails";
import Cart from "./Components/UserPage/Cart";
import { defaultProducts } from "./Components/Products";
import { useDispatch } from "react-redux";
import { setProductCreator } from "./Components/Redux/Creator";


const App = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    search: "",
    category: [],
    price: "",
  });

  useEffect(() => {
    dispatch(setProductCreator(defaultProducts));
  }, [dispatch]);

  const noHeaderPath = ["/", "/createaccount"];
  const showSideBarPaths = ["/user", "/admin"];

  return (
     <div className="dashboard">
      {!noHeaderPath.includes(pathname) && (
        <Header filter={filter} setFilter={setFilter} key={pathname} />
      )}
      <div className="page">
        {showSideBarPaths.includes(pathname) && (
          <SideBar filter={filter} setFilter={setFilter} />
        )}
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="createaccount" element={<CreateAccount />} />
            <Route
              path="user"
              element={
                <ProtectedRoute>
                  <User filter={filter} setFilter={setFilter} />
                </ProtectedRoute>
              }
            />
            <Route path="/user/:productId" element={<ProductDetails />} />
            <Route path="/user/cart" element={<Cart />} />
            <Route
              path="admin"
              element={
                <ProtectedRoute>
                  <Admin filter={filter} setFilter={setFilter}/>
                </ProtectedRoute>
              }
            />
            <Route path="showusers" element={<ShowUsers />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
