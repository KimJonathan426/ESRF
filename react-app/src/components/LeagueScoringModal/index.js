import { useState } from 'react';
import { Modal } from '../../context/Modal';
import LeagueScoringForm from './LeagueScoringForm';
import './LeagueScoringForm.css'

function LeagueScoringModal({ currentLeague }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className='edit-btn'>Edit Scoring</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LeagueScoringForm setShowModal={setShowModal} currentLeague={currentLeague} />
        </Modal>
      )}
    </>
  );
}

export default LeagueScoringModal;
