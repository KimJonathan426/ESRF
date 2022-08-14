import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { addPlayer, getAllPlayers } from "../../store/player";
import PlayerImageUpload from "../PlayerImageUpload";
import ErrorModal from "../ErrorModal";
import './RequiredPlayerCreation.css';

const RequiredPlayerCreation = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const players = useSelector(state => state.players);
    const { leagueId } = useParams();

    const [playerName, setPlayerName] = useState('');
    const [position, setPosition] = useState('');
    const [team, setTeam] = useState('');
    const [bio, setBio] = useState('');
    const [stateLoaded, setStateLoaded] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [imageTab, setImageTab] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const playerList = Object.values(players);
    let playerCount = playerList.length + 1;

    useEffect(() => {
        async function fetchPlayers() {
            const response = await dispatch(getAllPlayers(leagueId))

            if (response) {
                setStateLoaded(true)
                setImageTab(true)
            }
        }

        fetchPlayers();

    }, [dispatch, leagueId])

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
        console.log(position)
        const errors = [];

        const league_id = leagueId;
        const player_name = playerName;

        const createdPlayer = await dispatch(addPlayer(league_id, player_name, position, team, bio));

        if (createdPlayer && createdPlayer.errors === undefined) {
            if (playerCount <= 9) {
                setPlayerName('');
                setPosition('');
                setTeam('');
                setBio('');

                const option = document.getElementById('reset');
                option.selected = true;
            }
            else if (playerCount > 9) {
                setImageTab(true);
            }
        } else if (createdPlayer.errors) {
            errors.push(...createdPlayer.errors);
            setValidationErrors(errors);
            setShowErrorModal(true);
        }
    };

    const handleFinish = (e) => {
        e.preventDefault();

        setImageTab(false);
        setRedirect(true);
    }

    useEffect(() => {
        if (!imageTab && redirect) {
            let timeLeft = 4;
            let timer = setInterval(() => {
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    setRedirect(false);
                    history.push(`/leagues/${leagueId}`);
                } else {
                    document.getElementById('timer').innerHTML = timeLeft;
                }
                timeLeft -= 1;
            }, 1000);
        }
    }, [imageTab, redirect, history, leagueId]);

    return (
        stateLoaded ?
            <div className='page-outer required-player-background'>
                <div className='page-spacer'></div>
                <div className='page-container'>
                    <div className='required-player-container'>
                        {playerCount <= 10 ? (
                            <>
                                {playerCount <= 5 && (
                                    <div className='first-title'>
                                        <div> Start your league by creating your players...</div>
                                        <div>Create at least 10 players to be considered an official League!</div>
                                    </div>
                                )}
                                {playerCount > 5 && (
                                    <div className='first-title'>
                                        <div> Start your league by creating your players...</div>
                                        <div>You're almost there!</div>
                                    </div>
                                )}
                                <div className='required-player-form-container'>
                                    <form className='required-player-form' onSubmit={handleSubmit}>
                                        <ErrorModal hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
                                        <div className='player-count-title'>Player {playerCount} of 10</div>
                                        <div className='player-name-container'>
                                            <label>Player Name</label>
                                            <input
                                                value={playerName}
                                                onChange={updatePlayerName}
                                                placeholder='Player Name (Required)'
                                                maxLength='40' />
                                        </div>

                                        <div className='player-position-container'>
                                            <label>Position</label>
                                            <select name='position' onChange={updatePosition}>
                                                <option id='reset'>-- Select Position (Required) --</option>
                                                <option value='PG'>Point Guard (PG)</option>
                                                <option value='SG'>Shooting Guard (SG)</option>
                                                <option value='SF'>Small Forward (SF)</option>
                                                <option value='PF'>Power Forward (PF)</option>
                                                <option value='C'>Center (C)</option>
                                            </select>
                                        </div>

                                        <div className='player-team-container'>
                                            <label>Team</label>
                                            <input
                                                value={team}
                                                onChange={updateTeam}
                                                placeholder='Team Name (Optional)'
                                                maxLength='40' />
                                        </div>

                                        <div className='player-bio-container'>
                                            <label>Biography</label>
                                            <textarea
                                                value={bio}
                                                onChange={updateBio}
                                                placeholder='Share information about your player to the league... (Optional)'
                                                maxLength='1000' />
                                        </div>

                                        <div className='required-player-btn-container'>
                                            <button className='required-player-btn' type='submit'>Next Player</button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        )
                            : imageTab ? (
                                <>
                                    <div className='first-title'>Optional - Add Player Images
                                        <button className='required-player-btn finish-btn' onClick={handleFinish}>Finish</button>
                                    </div>
                                    {playerList.map(player => (
                                        <div className='required-player-image-container' key={player.id}>
                                            <div>
                                                <div className='player-card-background-container'>
                                                    <img className='player-card-background' src='https://esrf.s3.amazonaws.com/Player-Card-Background.png' alt='player card background'></img>
                                                </div>
                                                <img className='player-card-image' src={player.player_image} alt='player'></img>
                                                <div className='player-card-name'>{player.player_name}</div>
                                            </div>
                                            <div className='required-player-image-component'>
                                                <PlayerImageUpload playerId={player.id} />
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <div className='first-title'>Your league is all set!</div>

                                    {redirect ? (
                                        <div className='first-title' id='countdown'>You will be redirected to your leagues home page in... <span id='timer'>5</span></div>
                                    )
                                        : (
                                            <div className='first-title'>If you were not redirected, manually go to your league by clicking <Link to={`/leagues/${leagueId}`}>here</Link></div>
                                        )}
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            :
            <h3>Loading...</h3>
    )
}

export default RequiredPlayerCreation;
