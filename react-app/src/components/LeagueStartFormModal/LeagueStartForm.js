import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editLeagueStart } from "../../store/league";
import ErrorModal from "../ErrorModal";


const LeagueStartForm = ({ setShowModal, leagueId, leagueDate, leagueTime }) => {
    const [startDate, setStartDate] = useState(leagueDate);
    const [startTime, setStartTime] = useState(leagueTime.slice(0, 5));
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();

    const updateStartDate = (e) => {
        setStartDate(e.target.value);
    }
    const updateStartTime = (e) => {
        setStartTime(e.target.value);
    }

    useEffect(() => {
        if (startDate !== leagueDate || startTime !== leagueTime.slice(0, 5)) {
            setDisabled(false);
        } else {
            setDisabled(true)
        }
    }, [startDate, startTime, leagueDate, leagueTime])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const start_date = startDate;
        const start_time = startTime;

        let start_standard;
        let errors;

        if (start_date !== 'mm/dd/yyyy' && start_time !== 'HH:mm') {
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

    const hideModal = (e) => {
        e.preventDefault();

        setShowModal(false);
    }


    return (
        <form className='edit-start-container' onSubmit={handleSubmit}>
            <ErrorModal hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
            <div className='edit-start-header'>League Start</div>
            <div className='start-warning'>*Setting the fields to a date/time that has already passed will start your league* </div>
            <div className='start-row'>
                <div className='edit-label start-label'>
                    <label>Game Start Date</label>
                </div>
                <div className='edit-start-input'>
                    <input
                        type='date'
                        value={startDate}
                        onChange={updateStartDate} />
                </div>
            </div>
            <div className='edit-start-time start-row'>
                <div className='edit-label start-label'>
                    <label>Game Start Time</label>
                </div>
                <div className='edit-start-input'>
                    <input
                        type='time'
                        value={startTime}
                        onChange={updateStartTime} />
                </div>
            </div>

            <div className='edit-start-btns'>
                <button disabled={disabled} className={disabled ? 'disabled-btn' : 'save-btn'} type='submit'>Save Changes</button>
                <button onClick={hideModal} className='cancel-btn' type='submit'>Cancel Changes</button>
            </div>
        </form>
    )
}

export default LeagueStartForm;
