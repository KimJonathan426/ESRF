import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { deleteTeam } from '../../store/team';
import './DeleteTeamModal.css'

const DeleteTeamModal = () => {
    const { leagueId, teamNumber } = useParams();
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const onDelete = async () => {
        const deleted = await dispatch(deleteTeam(leagueId, teamNumber));

        if (deleted) {
            history.push(`/leagues/${leagueId}`)
        }
    }

    return (
        <>
            <button className='delete-btn team-delete-resize' onClick={() => setShowModal(true)}>Delete Team / Leave League</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='delete-modal-container'>
                        <div className='delete-confirm-header'>
                            <h2>Delete Confirmation</h2>
                        </div>
                        <div className='delete-confirm-text'>
                            <div>Are you <span style={{'font-style': 'italic'}}>sure</span> you want to leave this league?</div>
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

export default DeleteTeamModal;
