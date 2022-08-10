import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { addPlayer, getAllPlayers } from "../../store/player";
import PlayerImageUpload from "../PlayerImageUpload";

const RequiredPlayerCreation = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const players = useSelector(state => state.players);
    const { leagueId } = useParams();

    const [playerName, setPlayerName] = useState('');
    const [position, setPosition] = useState('None');
    const [team, setTeam] = useState('');
    const [bio, setBio] = useState('');
    const [stateLoaded, setStateLoaded] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [imageTab, setImageTab] = useState(false);

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

        const league_id = leagueId;
        const player_name = playerName;

        const createdPlayer = await dispatch(addPlayer(league_id, player_name, position, team, bio));

        if (createdPlayer) {
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
        };
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
            <div>
                {playerCount <= 10 ? (
                    <>
                        {playerCount === 1 && (
                            <>
                                <div> Start your league by creating your players...</div>
                                <div>Create at least 10 players to be considered an official League!</div>
                            </>
                        )}
                        <div>Player {playerCount} of 10</div>
                        <form onSubmit={handleSubmit}>
                            <label>Player Name</label>
                            <input
                                value={playerName}
                                onChange={updatePlayerName}
                                placeholder='Player Name (Required)'
                                required
                                maxLength='50' /><br />

                            <label>Position</label>
                            <select name='position' onChange={updatePosition}>
                                <option id='reset' value='None'>--Select Position (Required)--</option>
                                <option value='PG'>Point Guard (PG)</option>
                                <option value='SG'>Shooting Guard (SG)</option>
                                <option value='SF'>Small Forward (SF)</option>
                                <option value='PF'>Power Forward (PF)</option>
                                <option value='C'>Center (C)</option>
                            </select>

                            <label>Team</label>
                            <input
                                value={team}
                                onChange={updateTeam}
                                placeholder='Team Name (Optional)'
                                maxLength='40' /><br />

                            <label>Biography</label>
                            <textarea
                                value={bio}
                                onChange={updateBio}
                                placeholder='Share information about your player to the league... (Optional)'
                                maxLength='1000' /><br />

                            <button type='submit'>Next Player</button>
                        </form>
                    </>
                )
                    : imageTab ? (
                        <>
                            <div>Optional - Add Player Images</div>
                            {playerList.map(player => (
                                <div key={player.id}>
                                    <img src={player.player_image} alt='player'></img>
                                    <div>{player.player_name}</div>
                                    <PlayerImageUpload playerId={player.id} />
                                </div>
                            ))}
                            <button onClick={handleFinish}>Finish</button>
                        </>
                    ) : (
                        <>
                            <div>Your league is all set!</div>

                            {redirect ? (
                                <div id='countdown'>You will be redirected to your leagues home page in... <span id='timer'>5</span></div>
                            )
                                : (
                                    <div>If you were not redirected, manually go to your league by clicking <Link to={`/leagues/${leagueId}`}>here</Link></div>
                                )}
                        </>
                    )
                }
            </div>
            :
            <h3>Loading...</h3>
    )
}

export default RequiredPlayerCreation;
