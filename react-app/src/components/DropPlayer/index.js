import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { dropPlayer } from '../../store/team';
import ErrorModal from '../ErrorModal';
import './DropPlayer.css'

const DropPlayer = ({ player }) => {
    const dispatch = useDispatch();
    const { leagueId, teamNumber } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const onDrop = async (e) => {
        e.preventDefault();

        const errors = [];

        const formData = new FormData();
        formData.append("playerId", player.id);

        const updatedTeam = await dispatch(dropPlayer(leagueId, teamNumber, formData));

        if (updatedTeam && updatedTeam.errors === undefined) {
            setShowModal(true);
        } else if (updatedTeam.errors) {
            errors.push(updatedTeam.errors);
            setValidationErrors(errors);
            setShowErrorModal(true);
        } else {
            errors.push('Something went wrong, please refresh and try again.');
            setValidationErrors(errors);
            setShowErrorModal(true);
        }
    }


    return (
            <>
                <button className='drop-player-btn' onClick={onDrop}>–</button>
                <ErrorModal className='error-modal-container' hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <div className='delete-team-modal-container'>
                            <div className='delete-confirm-header'>
                                <h2>Transaction Completed</h2>
                            </div>
                            <div className='delete-confirm-text'>
                                <div>{player.player_name} has been dropped from your team!</div>
                            </div>
                            <div>
                                <button className='cancel-btn' onClick={() => setShowModal(false)}>Close</button>
                            </div>
                        </div>
                    </Modal>
                )}
            </>
        )
}

export default DropPlayer;
