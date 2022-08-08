import { useState } from "react"
import { useDispatch } from "react-redux"
import { editLeagueStart } from "../../store/league"


const LeagueStartForm = ({ leagueId }) => {
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const dispatch = useDispatch();
    const dayjs = require('dayjs');

    const updateStartDate = (e) => {
        setStartDate(e.target.value);
    }
    const updateStartTime = (e) => {
        setStartTime(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const start_date = dayjs(startDate).format('DD/MMM/YYYY');
        const start_time = startTime;

        const editedLeague = await dispatch(editLeagueStart(leagueId, start_date, start_time));

        if (editedLeague) {
            console.log('success!');
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Game Start Date</label>
            <input
                type='date'
                value={startDate}
                onChange={updateStartDate}
                required /><br />
            <label>Game Start Time</label>
            <input
                type='time'
                value={startTime}
                onChange={updateStartTime}
                required /><br />
            <button type='submit'>Save Changes</button>
        </form>
    )
}

export default LeagueStartForm;
