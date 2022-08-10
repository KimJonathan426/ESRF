import { Modal } from '../../context/Modal';
import './ErrorModal.css';

function ErrorModal({ hideModal, showErrorModal, validationErrors }) {
  return (
    <>
      {showErrorModal && (
        <Modal onClose={hideModal}>
          <div>
            <div>
              <h2>Error</h2>
            </div>
            <div>
              <ul>
                {
                  validationErrors.map(error => (
                    <li key={error}>{error}</li>
                  ))
                }
              </ul>
                <div>
                  <button onClick={hideModal}>Continue</button>
                </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ErrorModal;
