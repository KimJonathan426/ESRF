import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { addPlayer, getAllPlayers } from "../../store/player";

const RequiredPlayerCreation = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const players = useSelector(state => state.players);
    const { leagueId } = useParams();

    const [playerName, setPlayerName] = useState('');
    const [position, setPosition] = useState('None');
    const [team, setTeam] = useState('');
    const [bio, setBio] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [imageTab, setImageTab] = useState(false);

    let playerCount = Object.values(players).length + 1;

    useEffect(() => {
        async function fetchPlayers() {
            const response = await dispatch(getAllPlayers(leagueId))
        }

        fetchPlayers();

        if (playerCount > 9) {
            setRedirect(true);
        }

    }, [dispatch])

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
                let timeLeft = 5;
                let timer = setInterval(() => {
                    if (timeLeft <= 0){
                        clearInterval(timer);
                        setRedirect(true);
                        history.push(`/leagues/${leagueId}`);
                    } else {
                        document.getElementById('timer').innerHTML = timeLeft;
                    }
                    timeLeft -= 1;
                }, 1000)

            }
        };
    };


    return (
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

                        <button type='submit'>Create Player</button>
                    </form>
                </>
            )
                : (
                    <>
                        <div>Your league is all set!</div>

                        {!redirect ? (
                            <div id='countdown'>You will be redirected to your leagues home page in... <span id='timer'></span></div>
                        )
                    : (
                        <div>If you were not redirected, manually go to your league by clicking <Link to={`/leagues/${leagueId}`}>here</Link></div>
                    )}
                    </>
                )
            }
        </div>
    )
}

export default RequiredPlayerCreation;