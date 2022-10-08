import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { deletePlayer } from '../../store/player';
import ErrorModal from '../ErrorModal';
import './DeletePlayerModal.css';

const DeletePlayerModal = ({ totalPlayers, playerId }) => {
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch();

    const onDelete = async () => {
        const formData = new FormData();
        formData.append('totalPlayers', totalPlayers);
        formData.append('playerId', playerId);

        const errors = [];

        const response = await dispatch(deletePlayer(formData));

        if (response) {
            errors.push(response.errors);
            setValidationErrors(errors);
            if (errors.length) {
                setShowModal(false);
                setShowErrorModal(true);
            }
        }
    }

    return (
        <>
            <button className='delete-btn delete-player-resize' onClick={() => setShowModal(true)}>Delete Player</button>
            <ErrorModal className='error-modal-container' hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='delete-team-modal-container'>
                        <div className='delete-confirm-header'>
                            <h2>Delete Confirmation</h2>
                        </div>
                        <div className='delete-confirm-text delete'>
                            <div>Are you <span style={{'font-style': 'italic'}}>sure</span> you want to remove this player from your league?</div>
                        </div>
                        <div>
                            <button className='delete-btn delete-resize' onClick={onDelete}>Delete</button>
                            <button className='cancel-btn' onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default DeletePlayerModal;
