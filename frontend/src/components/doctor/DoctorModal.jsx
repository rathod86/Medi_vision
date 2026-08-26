import "./DoctorModal.css";

const DoctorModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {

  if (!isOpen) return null;

  return (

    <div className="modal-overlay">

      <div className="doctor-modal">

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="modal-buttons">

          <button
            className="cancel-modal-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="confirm-modal-btn"
            onClick={onConfirm}
          >
            Confirm
          </button>

        </div>

      </div>

    </div>

  );

};

export default DoctorModal;