import { useState } from 'react';
import { Modal } from '../../context/Modal';
import PlayerDetails from './PlayerDetails'
import './PlayerDetails.css'

function PlayerModal({ player }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='player-modal-btn' onClick={() => setShowModal(true)}>{player.player_name}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PlayerDetails player={player} />
        </Modal>
      )}
    </>
  );
}

export default PlayerModal;
