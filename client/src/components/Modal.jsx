import '../styles/Modal.css'

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;
  return (
    <div className="Modal">
      <div className="Modal__Container">
        <button className="Modal__Close__Button" onClick={closeModal}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal