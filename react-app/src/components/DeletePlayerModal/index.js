import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { deletePlayer } from '../../store/player';

const DeletePlayerModal = ({ playerId }) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const onDelete = async () => {
        await dispatch(deletePlayer(playerId));
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Delete Player</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
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
