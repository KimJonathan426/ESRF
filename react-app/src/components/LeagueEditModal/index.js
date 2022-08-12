import { useState } from 'react';
import { Modal } from '../../context/Modal';
import LeagueEditForm from './LeagueEditForm';
import './LeagueEditForm.css'

function LeagueEditFormModal({ currentLeagueName, leagueId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className='edit-btn'>Edit League</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LeagueEditForm setShowModal={setShowModal} currentLeagueName={currentLeagueName} leagueId={leagueId} />
        </Modal>
      )}
    </>
  );
}

export default LeagueEditFormModal;
