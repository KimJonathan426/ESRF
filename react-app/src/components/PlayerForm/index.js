import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getSingleLeague } from "../../store/league";
import { addPlayer, getAllPlayers } from "../../store/player";
import AccessDenied from "../AccessDenied";
import ErrorModal from "../ErrorModal";
import InvalidLeagueId from "../InvalidLeagueId";
import Loading from "../Loading";
import PlayerImageUpload from "../PlayerImageUpload";
import './PlayerForm.css';

const PlayerForm = ({ sessionUser }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { leagueId } = useParams();
    const [playerName, setPlayerName] = useState('');
    const [position, setPosition] = useState('');
    const [team, setTeam] = useState('');
    const [bio, setBio] = useState('');
    const [madePlayer, setMadePlayer] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const leagueState = useSelector(state => state.leagues);
    const newPlayer = useSelector(state => state.players);

    const league = leagueState[leagueId];

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getSingleLeague(leagueId));
            await dispatch(getAllPlayers(leagueId));

            setLoading(true);
        }

        fetchData();
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

        const errors = [];

        const league_id = leagueId;
        const player_name = playerName;

        const createdPlayer = await dispatch(addPlayer(league_id, player_name, position, team, bio));

        if (createdPlayer && createdPlayer.errors === undefined) {
            setMadePlayer(createdPlayer);
        } else if (createdPlayer.errors) {
            errors.push(...createdPlayer.errors);
            setValidationErrors(errors);
            setShowErrorModal(true);
        }
    };

    const handleFinish = (e) => {
        e.preventDefault();

        history.push(`/leagues/${leagueId}`)
    }


    return (
        <div className='page-outer required-player-background'>
            <div className='page-spacer'></div>
            <div className='page-container'>
                {loading ? league ? sessionUser.id === league.owner_id ?
                    <div className='required-player-container'>
                        {!madePlayer ? (
                            <>
                                <div className='first-title'>Create a Player</div>
                                <div className='required-player-form-container'>
                                    <form className='required-player-form' onSubmit={handleSubmit}>
                                        <ErrorModal hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
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
                                                <option value=''>-- Select Position (Required) --</option>
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
                                                maxLength='40' /><br />
                                        </div>

                                        <div className='player-bio-container'>
                                            <label>Biography</label>
                                            <textarea
                                                value={bio}
                                                onChange={updateBio}
                                                placeholder='Share information about your player to the league... (Optional)'
                                                maxLength='1000' /><br />
                                        </div>
                                        <div className='required-player-btn-container'>
                                            <button className='required-player-btn create-player-btn' type='submit'>Create Player</button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        )
                            :
                            <>
                                <div className='first-title'>Optional - Add Player Image
                                    <button className='required-player-btn finish-btn' onClick={handleFinish}>Finish</button>
                                </div>
                                <div className='required-player-image-container'>
                                    <div>
                                        <div className='player-card-background-container'>
                                            <img className='player-card-background' src='https://esrf.s3.amazonaws.com/Player-Card-Background.png' alt='player card background'></img>
                                        </div>
                                        <img className='player-card-image' src={newPlayer[madePlayer.id].player_image} alt='player'></img>
                                        <div className='player-card-name'>{newPlayer[madePlayer.id].player_name}</div>
                                    </div>
                                    <div className='required-player-image-component'>
                                        <PlayerImageUpload playerId={madePlayer.id} />
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    :
                    <AccessDenied />
                    :
                    <InvalidLeagueId />
                    :
                    <Loading />
                }
            </div>
        </div>
    )
}

export default PlayerForm;
