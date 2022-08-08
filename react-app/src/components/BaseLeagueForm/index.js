import { useState } from "react"
import { useDispatch } from "react-redux"
import { addLeague } from "../../store/league"

const BaseLeagueForm = () => {
    const [leagueName, setLeagueName] = useState('');
    const [teamLimit, setTeamLimit] = useState(2);
    const [teamPlayerLimit, setTeamPlayerLimit] = useState(5);

    const dispatch = useDispatch();

    const updateLeagueName = (e) => {
        setLeagueName(e.target.value);
    }
    const updateTeamLimit = (e) => {
        setTeamLimit(e.target.value);
    }
    const updateTeamPlayerLimit = (e) => {
        setTeamPlayerLimit(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const league_name = leagueName;
        const team_limit = teamLimit;
        const team_player_limit = teamPlayerLimit;

        const createdLeague = await dispatch(addLeague(league_name, team_limit, team_player_limit));

        if (createdLeague) {
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

            <fieldset>
                <legend>Number of Teams</legend>
                <input
                    name='team-limit'
                    type='radio'
                    id='team-limit-2'
                    value={2}
                    onChange={updateTeamLimit} />
                <label htmlFor='team-limit-2'>2</label><br />
                <input
                    name='team-limit'
                    type='radio'
                    id='team-limit-3'
                    value={3}
                    onChange={updateTeamLimit}
                    defaultChecked />
                <label htmlFor='team-limit-3'>3</label><br />
                <input
                    name='team-limit'
                    type='radio'
                    id='team-limit-4'
                    value={4}
                    onChange={updateTeamLimit} />
                <label htmlFor='team-limit-4'>4</label><br />
                <input
                    name='team-limit'
                    type='radio'
                    id='team-limit-5'
                    value={5}
                    onChange={updateTeamLimit} />
                <label htmlFor='team-limit-5'>5</label><br />
                <input
                    name='team-limit'
                    type='radio'
                    id='team-limit-6'
                    value={6}
                    onChange={updateTeamLimit} />
                <label htmlFor='team-limit-6'>6</label><br />
                <input
                    name='team-limit'
                    type='radio'
                    id='team-limit-7'
                    value={7}
                    onChange={updateTeamLimit} />
                <label htmlFor='team-limit-7'>7</label><br />
                <input
                    name='team-limit'
                    type='radio'
                    id='team-limit-8'
                    value={8}
                    onChange={updateTeamLimit} />
                <label htmlFor='team-limit-8'>8</label><br />
                <input
                    name='team-limit'
                    type='radio'
                    id='team-limit-9'
                    value={9}
                    onChange={updateTeamLimit} />
                <label htmlFor='team-limit-9'>9</label><br />
                <input
                    name='team-limit'
                    type='radio'
                    id='team-limit-10'
                    value={10}
                    onChange={updateTeamLimit} />
                <label htmlFor='team-limit-10'>10</label><br />
            </fieldset>

            <fieldset>
                <legend>Number of Players Per Team</legend>
                <input
                    name='player-limit'
                    type='radio'
                    id='player-limit-2'
                    value={2}
                    onChange={updateTeamPlayerLimit} />
                <label htmlFor='player-limit-2'>2</label><br />
                <input
                    name='player-limit'
                    type='radio'
                    id='player-limit-3'
                    value={3}
                    onChange={updateTeamPlayerLimit} />
                <label htmlFor='player-limit-3'>3</label><br />
                <input
                    name='player-limit'
                    type='radio'
                    id='player-limit-4'
                    value={4}
                    onChange={updateTeamPlayerLimit} />
                <label htmlFor='player-limit-4'>4</label><br />
                <input
                    name='player-limit'
                    type='radio'
                    id='player-limit-5'
                    value={5}
                    onChange={updateTeamPlayerLimit}
                    defaultChecked />
                <label htmlFor='player-limit-5'>5</label><br />
                <input
                    name='player-limit'
                    type='radio'
                    id='player-limit-6'
                    value={6}
                    onChange={updateTeamPlayerLimit} />
                <label htmlFor='player-limit-6'>6</label><br />
                <input
                    name='player-limit'
                    type='radio'
                    id='player-limit-7'
                    value={7}
                    onChange={updateTeamPlayerLimit} />
                <label htmlFor='player-limit-7'>7</label><br />
                <input
                    name='player-limit'
                    type='radio'
                    id='player-limit-8'
                    value={8}
                    onChange={updateTeamPlayerLimit} />
                <label htmlFor='player-limit-8'>8</label><br />
            </fieldset>

            <button type='submit'>Create League</button>
        </form>
    )
}

export default BaseLeagueForm;
