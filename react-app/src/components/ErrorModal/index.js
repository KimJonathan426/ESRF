import { Modal } from '../../context/Modal';
import './ErrorModal.css';

function ErrorModal({ hideModal, showErrorModal, validationErrors }) {
  return (
    <>
      {showErrorModal && (
        <Modal onClose={hideModal}>
          <div className='error-modal-container'>
            <div>
              <h3 className='error-modal-header'>Error</h3>
            </div>
            <div>
              <ul className='error-list'>
                {
                  validationErrors.map(error => (
                    <li key={error}>{error}</li>
                  ))
                }
              </ul>
            </div>
            <div className='error-btn-container'>
              <button className='continue' onClick={hideModal}>Continue</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ErrorModal;
