import { useState } from "react"
import { useDispatch } from "react-redux"
import { editLeagueBase } from "../../store/league"

const LeagueEditForm = ({ currentLeagueName, leagueId }) => {
    const [leagueName, setLeagueName] = useState(currentLeagueName);
    const dispatch = useDispatch();

    const updateLeagueName = (e) => {
        setLeagueName(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const league_name = leagueName;

        const editedLeague = await dispatch(editLeagueBase(leagueId, league_name));

        if (editedLeague) {
            console.log('success!');
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>League Name</label>
            <input
                value={leagueName}
                onChange={updateLeagueName}
                placeholder='League Name (Required)'
                required
                maxLength='50' /><br />
            <button type='submit'>Save Changes</button>
        </form>
    )
}

export default LeagueEditForm;
