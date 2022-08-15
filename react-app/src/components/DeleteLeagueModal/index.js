import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { deleteLeague } from "../../store/league";

const DeleteLeagueModal = ({ leagueId }) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const onDelete = async () => {
        const deleted = await dispatch(deleteLeague(leagueId));

        if (deleted) {
            history.push('/')
        }
    }

    return (
        <>
            <button className='delete-btn' onClick={() => setShowModal(true)}>Delete League</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='delete-modal-container'>
                        <div className='delete-confirm-header'>
                            <h2>Delete Confirmation</h2>
                        </div>
                        <div className='delete-confirm-text'>
                            <div>Are you <span style={{'font-style': 'italic'}}>sure</span> you want to remove this league?</div>
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

export default DeleteLeagueModal;
