import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { addPlayerToTeam } from '../../store/team';
import ErrorModal from '../ErrorModal';
import './TeamAddPlayer.css'

const TeamAddPlayer = ({ playerLimit, teamNumber, player }) => {
    const dispatch = useDispatch();
    const { leagueId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [buttonClass, setButtonClass] = useState('add-player-btn');

    const onAdd = async (e) => {
        e.preventDefault();

        const errors = [];

        const formData = new FormData();
        formData.append("playerId", player.id);
        formData.append("playerLimit", playerLimit);

        const updatedTeam = await dispatch(addPlayerToTeam(leagueId, teamNumber, formData));

        if (updatedTeam && updatedTeam.errors === undefined) {
            setButtonClass('player-added');
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
            <button className={buttonClass} onClick={onAdd}>+</button>
            <ErrorModal className='error-modal-container' hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='delete-team-modal-container'>
                        <div className='delete-confirm-header'>
                            <h2>Transaction Completed</h2>
                        </div>
                        <div className='delete-confirm-text'>
                            <div>{player.player_name} has been added to your team!</div>
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

export default TeamAddPlayer;
