import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { deletePlayer } from '../../store/player';

const DeletePlayerModal = ({ totalPlayers, playerId }) => {
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const onDelete = async () => {
        const formData = new FormData();
        formData.append('totalPlayers', totalPlayers);
        formData.append('playerId', playerId);

        const response = await dispatch(deletePlayer(formData));

        if (response) {
            setError(response.error);
        }
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Delete Player</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {error && (
                        <div>{error}</div>
                    )}
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
                </Modal>
            )}
        </>
    )
}

export default DeletePlayerModal;
