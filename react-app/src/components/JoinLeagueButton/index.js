import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addTeam } from "../../store/team";

const JoinLeagueButton = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const { leagueId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const team_owner_id = sessionUser.id;
        const team_location = 'Team';
        const team_name = sessionUser.username;
        const team_abre = sessionUser.username.slice(0, 4).toUpperCase();

        await dispatch(addTeam(leagueId, team_owner_id, team_location, team_name, team_abre));
    }

    return (
        <button onClick={handleSubmit} className='save-btn'>Join League</button>
    )
}

export default JoinLeagueButton;
