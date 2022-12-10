import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addTeam } from "../../store/team";

const JoinLeagueButton = ({ sessionUser }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { leagueId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const team_location = 'Team';
        const team_name = sessionUser.username;
        const team_abre = sessionUser.username.slice(0, 4).toUpperCase();

        const team = await dispatch(addTeam(leagueId, team_location, team_name, team_abre));

        if (team) {
            history.push(`/leagues/${leagueId}/teams/${team.team_number}`)
        }
    }

    return (
        <button onClick={handleSubmit} className='save-btn'>Join League</button>
    )
}

export default JoinLeagueButton;
