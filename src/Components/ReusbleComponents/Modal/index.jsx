import Button from "../Button";

import "./Modal.css";

const Modal = (props) => {
  const {
    className = "",
    title = "",
    content,
    primaryButton = "",
    secondaryButton = "",
    handlePrimary = () => {},
    handleClose = () => {},
  } = props;

  return (
    <div className="modal-main-container">
      <div className={`modal-container ${className}`}>
        <div className="modal-header">
          <span>{title}</span>
          <box-icon name="x" onClick={handleClose}></box-icon>
        </div>
        <div className="modal-content">{content}</div>
        <div className="modal-buttons">
          <Button
            buttonName={secondaryButton}
            className="secondary"
            handleClick={handleClose}
          />
          <Button
            buttonName={primaryButton}
            className="go-back"
            handleClick={handlePrimary}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
