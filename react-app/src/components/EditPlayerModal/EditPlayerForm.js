import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editPlayerInfo } from '../../store/player';
import ErrorModal from "../ErrorModal";
import PlayerImageUpload from '../PlayerImageUpload';

const EditPlayerForm = ({ player, setShowModal }) => {
    const [playerName, setPlayerName] = useState(player.player_name);
    const [position, setPosition] = useState(player.position);
    const [team, setTeam] = useState(player.team);
    const [bio, setBio] = useState(player.bio);
    const [validationErrors, setValidationErrors] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if (playerName !== player.player_name || position !== player.position || team !== player.team || bio !== player.bio) {
            setDisabled(false);
        } else {
            setDisabled(true)
        }
    }, [playerName, player.player_name, position, player.position, team, player.team, bio, player.bio])

    useEffect(() => {
        if (player.position === 'PG') {
            const option = document.getElementById('PG');
            option.setAttribute('selected', '');
        }
        else if (player.position === 'SG') {
            const option = document.getElementById('SG');
            option.setAttribute('selected', '');
        }
        else if (player.position === 'SF') {
            const option = document.getElementById('SF');
            option.setAttribute('selected', '');
        }
        else if (player.position === 'PF') {
            const option = document.getElementById('PF');
            option.setAttribute('selected', '');
        }
        else if (player.position === 'C') {
            const option = document.getElementById('C');
            option.setAttribute('selected', '');
        }
    }, [player.position])

    const updatePlayerName = (e) => {
        setPlayerName(e.target.value);
    }
    const updatePosition = (e) => {
        setPosition(e.target.value);
    }
    const updateTeam = (e) => {
        setTeam(e.target.value);
    }
    const updateBio = (e) => {
        setBio(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = [];
        const playerId = player.id;
        const player_name = playerName;

        const editedPlayer = await dispatch(editPlayerInfo(playerId, player_name, position, team, bio));

        if (editedPlayer && editedPlayer.errors === undefined) {
            setShowModal(false);
        } else if (editedPlayer.errors) {
            errors.push(...editedPlayer.errors);
            setValidationErrors(errors);
            setShowErrorModal(true);
        }
    };

    const hideModal = (e) => {
        e.preventDefault()

        setShowModal(false);
    }


    return (
        <div className='edit-player-container'>
            <div className='edit-player-header'>
                Player Info
            </div>
            <div className='edit-player-image-container'>
                <img className='edit-player-image' src={player.player_image} alt='player'></img>
                <PlayerImageUpload playerId={player.id} />
            </div>
            <form className='edit-player-form' onSubmit={handleSubmit}>
                <ErrorModal hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
                <div className='edit-container'>
                    <div className='edit-player-row gray'>
                        <div className='edit-label'>
                            <label>Player Name</label>
                        </div>
                        <div className='edit-input-field'>
                            <input
                                value={playerName}
                                onChange={updatePlayerName}
                                placeholder='Player Name (Required)'
                                maxLength='40' />
                        </div>
                    </div>

                    <div className='edit-player-row'>
                        <div className='edit-label'>
                            <label>Position</label>
                        </div>
                        <div className='edit-input-field'>
                            <select name='position' onChange={updatePosition}>
                                <option id='PG' value='PG'>Point Guard (PG)</option>
                                <option id='SG' value='SG'>Shooting Guard (SG)</option>
                                <option id='SF' value='SF'>Small Forward (SF)</option>
                                <option id='PF' value='PF'>Power Forward (PF)</option>
                                <option id='C' value='C'>Center (C)</option>
                            </select>
                        </div>
                    </div>

                    <div className='edit-player-row gray'>
                        <div className='edit-label'>
                            <label>Team</label>
                        </div>
                        <div className='edit-input-field'>
                            <input
                                value={team}
                                onChange={updateTeam}
                                placeholder='Team Name (Optional)'
                                maxLength='40' />
                        </div>
                    </div>

                    <div className='edit-player-row'>
                        <div className='edit-label'>
                            <label>Biography</label>
                        </div>
                        <div className='edit-input-field'>
                            <textarea
                                value={bio}
                                onChange={updateBio}
                                placeholder='Share information about your player to the league... (Optional)'
                                maxLength='1000' />
                        </div>
                    </div>
                </div>

                <div className='edit-btns'>
                    <button disabled={disabled} className={disabled ? 'disabled-btn' : 'save-btn'} type='submit'>Save Changes</button>
                    <button className='cancel-btn' onClick={hideModal}>Cancel Changes</button>
                </div>
            </form>
        </div>
    )
}

export default EditPlayerForm;
