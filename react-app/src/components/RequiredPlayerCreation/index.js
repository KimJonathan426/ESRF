import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addPlayer, getAllPlayers } from "../../store/player";

const RequiredPlayerCreation = () => {
    const dispatch = useDispatch();
    const playerCount = useSelector(state => state.players)
    const { leagueId } = useParams()

    const [playerName, setPlayerName] = useState('');
    const [position, setPosition] = useState('None');
    const [team, setTeam] = useState('');
    const [bio, setBio] = useState('');
    const [count, setCount] = useState(Object.values(playerCount).length + 1);

    useEffect(() => {
        dispatch(getAllPlayers(leagueId))
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
            console.log('success');
        };
    };


    return (
        <>
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
                    <option value='None'>--Select Position (Required)--</option>
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
}

export default RequiredPlayerCreation;
