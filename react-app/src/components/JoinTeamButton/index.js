import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addTeam } from "../../store/team";
import './BaseTeamForm.css';

const BaseTeamForm = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const { leagueId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const team_owner_id = sessionUser.id;
        const team_location = 'Team';
        const team_name = sessionUser.username;
        const team_abre = sessionUser.username.slice(0,4).toUpperCase();

        const createdTeam = await dispatch(addTeam(leagueId, team_owner_id, team_location, team_name, team_abre));
        console.log(createdTeam)
    }

    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='page-container'>
                <button onClick={handleSubmit} className='edit-btn'>Join League</button>
            </div>
        </div>
    )
}

export default BaseTeamForm;
