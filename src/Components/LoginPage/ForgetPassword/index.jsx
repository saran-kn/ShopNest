import "./ForgetPassword.css";
import "../../../App.css";

const ForgetPassword = ({ user, setUser, error, setError }) => {
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((p) => ({ ...p, [name]: value }));
    setError((p) => ({ ...p, [name + "Error"]: "" }));
  };

  return (
    <div className="forget-main-container">
      <div className="forget-input-field">
        <label for="mail">
          Enter Login Id <span className="compulsary-star">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Email Id / Mobile Number"
          id="mail"
          name="loginId"
          value={user.loginId}
          onChange={handleInput}
        />
        {error.loginIdError && (
          <div className="validation-error">{error.loginIdError}</div>
        )}
      </div>
      <div className="forget-input-field">
        <label for="password">
          Password <span className="compulsary-star">*</span>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleInput}
        />
        {error.passwordError && (
          <div className="validation-error">{error.passwordError}</div>
        )}
      </div>
      <div className="forget-input-field">
        <label for="cpassword">
          Confirm Password <span className="compulsary-star">*</span>
        </label>
        <input
          type="password"
          placeholder="Enter Confirm Password"
          id="confirmpassword"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleInput}
        />
        {error.confirmPasswordError && (
          <div className="validation-error">{error.confirmPasswordError}</div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
