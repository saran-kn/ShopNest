import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login image.jpg";
import Button from "../ReusbleComponents/Button";
import "./Login.css";
import { useEffect, useState } from "react";
import ForgetPassword from "./ForgetPassword";
import Modal from "../ReusbleComponents/Modal";
import { newStore, Store } from "../store/store";
import { admin, defaultUser } from "./constants";
import { isEqual } from "../helperFunctions/ObjectCompaision";

const data = {
  loginId: "",
  password: "",
  confirmPassword: "",
};

const dataError = {
  loginIdError: "",
  passwordError: "",
};

const loginData = {
  loginCode: "",
  loginPassword: "",
};

const loginDataError = {
  loginError: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(data);
  const [error, setError] = useState(dataError);
  const [login, setLogin] = useState(loginData);
  const [loginError, setLoginError] = useState(loginDataError);

  useEffect(() => {
    Store("registeredUsers", admin);
    Store("registeredUsers", defaultUser);
  }, []);

  const handleSubmit = () => {
    const { loginId, password, confirmPassword } = user;

    let isValid = false;
    const storedData = localStorage.getItem("registeredUsers");
    const dataArray = storedData ? JSON.parse(storedData) : [];

    const editUser = dataArray.find((user) => {
      return user.userMail === loginId || user.userMobile === loginId;
    });

    const newDataArray = dataArray.map((user) => {
      if (user === editUser) {
        return {
          ...user,
          userPassword: password,
        };
      } else {
        return user;
      }
    });
    

    isValid = editUser ? true : false;
    

    if (!isValid) {
      setError((p) => ({ ...p, loginIdError: "Invalid User Id" }));
    } else {
      setError((p) => ({ ...p, loginIdError: "" }));
    }

    // Password validation
    if (!password) {
      setError((p) => ({ ...p, passwordError: "Enter password" }));
    } else {
      if (password.length < 8) {
        setError((p) => ({
          ...p,
          passwordError: "Password should be minimum 8 characters",
        }));
      } else {
        setError((p) => ({ ...p, passwordError: "" }));
      }
    }

    // Confirm password validation
    if (!confirmPassword) {
      setError((p) => ({
        ...p,
        confirmPasswordError: "Enter Confirm Password",
      }));
    } else {
      if (confirmPassword !== password) {
        setError((p) => ({
          ...p,
          confirmPasswordError: "Confirm Password must be Same as Password",
        }));
      } else {
        setError((p) => ({ ...p, confirmPasswordError: "" }));
      }
    }
    if (
      !error.loginIdError &&
      !error.passwordError &&
      !error.confirmPasswordError
    ) {
      newStore("registeredUsers", newDataArray);
      setShowModal(false);
    }
  };

  const handleInput = (e) => {
    setLoginError((p) => ({ ...p, loginError: "" }));
    const { name, value } = e.target;
    setLogin((p) => ({ ...p, [name]: value }));
  };

  const handleLogin = () => {
    const { loginCode, loginPassword } = login;

    const storedData = localStorage.getItem("registeredUsers");
    const dataArray = storedData ? JSON.parse(storedData) : [];

    const fetchId = dataArray.find((item) => {
      return item.userMail === loginCode || item.userMobile === loginCode;
    });
    const fetchPassword = dataArray.find((item) => {
      return item.userPassword === loginPassword;
    });

    if (fetchId && fetchPassword) {
      if (
        (fetchId.userMail === admin.userMail ||
          fetchId.userMobile === admin.userMobile) &&
        fetchPassword.userPassword === admin.userPassword
      ) {
        Store("loggedUser", fetchId);
        navigate("/admin");
      } else if (isEqual(fetchId, fetchPassword)) {
        Store("loggedUser", fetchId);
        navigate("/user");
      }
    } else {
      setLoginError((p) => ({ ...p, loginError: "Login details not found" }));
    }
  };

  return (
    <div className="login-main-container">
      <div className="login-container">
        <img src={loginImage} alt="loginImage" />
        <div className="login-content">
          <div className="login-content-title">
            <box-icon
              type="solid"
              name="cart-alt"
              color="#F5EEDC"
              size="md"
            ></box-icon>
            <span>SHOP NEST</span>
          </div>
          <span className="login-content-message">
            Welcome back! Login for personalized shopping experience.
          </span>
          <input
            type="text"
            placeholder="Email/MobileNumber"
            value={login.loginCode}
            onChange={handleInput}
            name="loginCode"
          />
          <input
            type="password"
            placeholder="Password"
            value={login.loginPassword}
            onChange={handleInput}
            name="loginPassword"
          />
          {loginError.loginError && (
            <div className="validation-error">{loginError.loginError}</div>
          )}
          <span className="forget-password" onClick={() => setShowModal(true)}>
            Forget Password ?
          </span>
          <div className="login-buttons">
            <Button
              buttonName="Create Account"
              className="secondary"
              handleClick={() => navigate("/createaccount")}
            />
            <Button
              buttonName="Login"
              className="primary"
              handleClick={handleLogin}
            />
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          title="Change Password ?"
          content={
            <ForgetPassword
              user={user}
              setUser={setUser}
              error={error}
              setError={setError}
            />
          }
          primaryButton="Save"
          secondaryButton="Cancel"
          handlePrimary={handleSubmit}
          handleClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Login;
