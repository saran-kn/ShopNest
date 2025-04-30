import { useNavigate } from "react-router-dom";
import Button from "../ReusbleComponents/Button";
import "./CreateAccount.css";
import { useEffect, useState } from "react";
import { isAlphabet, isValidNumber } from "./constants";
import { Store } from "../store/store";
import "../../App.css";

const userData = {
  name: "",
  mail: "",
  mobile: "",
  password: "",
  confirmPassword: "",
};

const dataError = {
  nameError: "",
  mailError: "",
  mobileError: "",
  passwordError: "",
  confirmPasswordError: "",
};

const CreateAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(userData);
  const [error, setError] = useState(dataError);
  const [success, setSuccess] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((p) => ({ ...p, [name]: value }));
    setError((p) => ({ ...p, [name + "Error"]: "" }));
  };

  const handleError = () => {
    const storedData = localStorage.getItem("registeredUsers");
    const dataArray = storedData ? JSON.parse(storedData) : [];
    const { name, mail, mobile, password, confirmPassword } = user;

    const tempError = {
      nameError: "",
      mailError: "",
      mobileError: "",
      passwordError: "",
      confirmPasswordError: "",
    };

    // Name validation
    if (!name) {
      tempError.nameError = "Enter Name";
    } else if (name.length < 3 || !isAlphabet(name)) {
      tempError.nameError =
        "Name must be minimum 3 characters and alphabets only";
    }

    // Email validation
    const duplicateMail = dataArray.some((user) => user.userMail === mail);
    if (!mail) {
      tempError.mailError = "Enter Email Id";
    } else if (!mail.includes("@") || !mail.endsWith(".com")) {
      tempError.mailError = "Email should contain @ and .com";
    } else if (duplicateMail) {
      tempError.mailError = "Mail Id already exists";
    }

    // Mobile validation
    const duplicateMobile = dataArray.some(
      (user) => user.userMobile === mobile
    );
    if (!mobile) {
      tempError.mobileError = "Enter Mobile Number";
    } else if (mobile.length < 10 || !isValidNumber(mobile)) {
      tempError.mobileError = "Enter valid mobile number";
    } else if (duplicateMobile) {
      tempError.mobileError = "Mobile Number already exists";
    }

    // Password
    if (!password) {
      tempError.passwordError = "Enter password";
    } else if (password.length < 8) {
      tempError.passwordError = "Password should be minimum 8 characters";
    }

    // Confirm password
    if (!confirmPassword) {
      tempError.confirmPasswordError = "Enter Confirm Password";
    } else if (confirmPassword !== password) {
      tempError.confirmPasswordError = "Confirm Password must match Password";
    }

    setError(tempError);

    const hasErrors = Object.values(tempError).some((item) => item.length > 0);
    if (!hasErrors) {
      const userData = {
        userName: name,
        userMail: mail,
        userMobile: mobile,
        userPassword: password,
        role: "user",
      };
      Store("registeredUsers", userData);
      setSuccess(true);
    }
  };

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [success, navigate]);

  return (
    <div className="create-account-main-container">
      <div className="create-account-container">
        <div className="create-account-title">
          <box-icon type="solid" name="edit" color="#F5EEDC"></box-icon>
          <span>Register Form</span>
        </div>
        <div className="create-account-input">
          <div className="input-field">
            <label for="name">
              Name<span className="compulsary-star">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              id="name"
              value={user.name}
              onChange={handleInput}
              name="name"
            />
            {error.nameError && (
              <div className="validation-error">{error.nameError}</div>
            )}
          </div>

          <div className="input-field">
            <label for="mail">
              Email Id<span className="compulsary-star">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Email Id"
              id="mail"
              value={user.mail}
              onChange={handleInput}
              name="mail"
            />
            {error.mailError && (
              <div className="validation-error">{error.mailError}</div>
            )}
          </div>

          <div className="input-field">
            <label for="mobile">
              Mobile Number<span className="compulsary-star">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              id="mobile"
              value={user.mobile}
              onChange={handleInput}
              name="mobile"
            />
            {error.mobileError && (
              <div className="validation-error">{error.mobileError}</div>
            )}
          </div>

          <div className="input-field">
            <label for="password">
              Password<span className="compulsary-star">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              id="password"
              value={user.password}
              onChange={handleInput}
              name="password"
            />
          </div>
          {error.passwordError && (
            <div className="validation-error">{error.passwordError}</div>
          )}

          <div className="input-field">
            <label for="cpassword">
              Confirm Password<span className="compulsary-star">*</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              id="cpassword"
              value={user.confirmPassword}
              onChange={handleInput}
              name="confirmPassword"
            />
            {error.confirmPasswordError && (
              <div className="validation-error">
                {error.confirmPasswordError}
              </div>
            )}
          </div>
        </div>
        <div className="create-account-buttons">
          <Button
            buttonName="Back to Login"
            className="secondary"
            handleClick={() => navigate(-1)}
          />
          <Button
            buttonName="Register"
            className="primary"
            handleClick={handleError}
          />
        </div>
        {success && (
          <div className="success-container">
            <span className="registration-success">
              Successfully Registered
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
