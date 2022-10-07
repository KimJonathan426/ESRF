import { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPlayerForm from './EditPlayerForm'
import './EditPlayerForm.css'

function EditPlayerModal({ player }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className='edit-btn'>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPlayerForm setShowModal={setShowModal} player={player} />
        </Modal>
      )}
    </>
  );
}

export default EditPlayerModal;
