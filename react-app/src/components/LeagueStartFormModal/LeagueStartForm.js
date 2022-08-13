import { useState } from "react";
import { useDispatch } from "react-redux";
import { editLeagueStart } from "../../store/league";
import ErrorModal from "../ErrorModal";


const LeagueStartForm = ({ setShowModal, leagueId }) => {
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const dispatch = useDispatch();

    const updateStartDate = (e) => {
        setStartDate(e.target.value);
    }
    const updateStartTime = (e) => {
        setStartTime(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const start_date = startDate;
        const start_time = startTime;

        let start_standard;
        let errors;

        if (start_date && start_time) {
            const start_format = new Date(`${start_date} ${start_time}`).toISOString();

            const standard_date = start_format.slice(0, 10);
            const standard_time = start_format.slice(11, 19);
            start_standard = `${standard_date} ${standard_time}`;

            errors = await dispatch(editLeagueStart(leagueId, start_date, start_time, start_standard));
        } else {
            errors = await dispatch(editLeagueStart(leagueId, start_date, start_time));
        }


        if (errors) {
            setValidationErrors(errors);
            setShowErrorModal(true);
        } else {
            setShowModal(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <ErrorModal hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
            <div>
                <label>Game Start Date</label>
            </div>
            <div>
                <input
                    type='date'
                    value={startDate}
                    onChange={updateStartDate} />
            </div>
            <div>
                <label>Game Start Time</label>
            </div>
            <div>
                <input
                    type='time'
                    value={startTime}
                    onChange={updateStartTime} />
            </div>

            <button type='submit'>Save Changes</button>
        </form>
    )
}

export default LeagueStartForm;
