import { useState } from 'react';
import { Modal } from '../../context/Modal';
import PlayerDetails from './PlayerDetails'
import './PlayerDetails.css'

function PlayerModal({ player }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='player-modal-btn' onClick={() => setShowModal(true)}>{player.player_name}</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PlayerDetails player={player} />
        </Modal>
      )}
    </>
  );
}

export default PlayerModal;
