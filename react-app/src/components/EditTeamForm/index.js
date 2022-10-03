import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './EditTeamForm.css';

const EditTeamForm = ({ team }) => {
    const [teamLocation, setTeamLocation] = useState(team.team_location);
    const [teamName, setTeamName] = useState(team.team_name);
    const [teamAbre, setTeamAbre] = useState(team.team_abre);

    const dispatch = useDispatch();

    const updateTeamLocation = (e) => {
        setTeamLocation(e.target.value);
    };
    const updateTeamName = (e) => {
        setTeamName(e.target.value);
    };
    const updateTeamAbre = (e) => {
        setTeamAbre(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();


    }

    return (
        <form onSubmit={handleSubmit}>
            <label>*Location</label>
            <input
                className='team-settings-location'
                value={teamLocation}
                onChange={updateTeamLocation}
                maxLength='15'
            />
            <label>*Nickname</label>
            <input
                className='team-settings-name'
                value={teamName}
                onChange={updateTeamName}
                maxLength='20'
            />
            <label>*Abbreviation</label>
            <input
                className='team-settings-abre'
                value={teamAbre}
                onChange={updateTeamAbre}
                maxLength='4'
            />
        </form>
    )
}

export default EditTeamForm;
