import { useState } from 'react';
import { Modal } from '../../context/Modal';
import LeagueStartForm from './LeagueStartForm';
import './LeagueStartForm.css'

function LeagueStartFormModal({ leagueId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)} className='edit-btn'>Edit Start Date</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LeagueStartForm setShowModal={setShowModal} leagueId={leagueId} />
                </Modal>
            )}
        </>
    );
}

export default LeagueStartFormModal;
