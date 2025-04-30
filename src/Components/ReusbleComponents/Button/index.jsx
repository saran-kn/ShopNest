import "./Button.css";

const Button = ({
  buttonName = "",
  className = "",
  handleClick = () => {},
  isDisabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`btn ${className}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {buttonName}
    </button>
  );
};

export default Button;
