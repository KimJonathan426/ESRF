import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editPlayerInfo } from '../../store/player';

const EditPlayerForm = ({ player }) => {
    const [playerName, setPlayerName] = useState(player.player_name);
    const [position, setPosition] = useState(player.position);
    const [team, setTeam] = useState(player.team);
    const [bio, setBio] = useState(player.bio);

    const dispatch = useDispatch();

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
    }, [])

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

        const playerId = player.id;
        const player_name = playerName;

        const editedPlayer = await dispatch(editPlayerInfo(playerId, player_name, position, team, bio));

        if (editedPlayer) {
            console.log('Successfully Edited');
        };
    };


    return (
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
                <option id='None' value='None'>--Select Position (Required)--</option>
                <option id='PG' value='PG'>Point Guard (PG)</option>
                <option id='SG' value='SG'>Shooting Guard (SG)</option>
                <option id='SF' value='SF'>Small Forward (SF)</option>
                <option id='PF' value='PF'>Power Forward (PF)</option>
                <option id='C' value='C'>Center (C)</option>
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

            <button type='submit'>Save Changes</button>
        </form>
    )
}

export default EditPlayerForm;
