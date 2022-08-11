import { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPlayerForm from './EditPlayerForm'
import './EditPlayerForm.css'

function EditPlayerModal({ player }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Player</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPlayerForm setShowModal={setShowModal} player={player} />
        </Modal>
      )}
    </>
  );
}

export default EditPlayerModal;
