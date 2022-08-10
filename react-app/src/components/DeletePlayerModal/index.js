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
                setShowErrorModal(true)
            }
        }
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Delete Player</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='delete-modal-container'>
                        <ErrorModal className='error-modal-container' hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
                        <div>
                            <h2>Delete Confirmation</h2>
                        </div>
                        <div>
                            <div>Are you sure you want to remove this player?</div>
                        </div>
                        <div>
                            <button onClick={onDelete}>Delete</button>
                        </div>
                        <div>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default DeletePlayerModal;
