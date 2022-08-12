import { useState } from "react"
import { useDispatch } from "react-redux"
import { editLeagueBase } from "../../store/league"
import ErrorModal from "../ErrorModal"
import './LeagueEditForm.css'

const LeagueEditForm = ({ setShowModal, currentLeagueName, leagueId }) => {
    const [leagueName, setLeagueName] = useState(currentLeagueName);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const dispatch = useDispatch();

    const updateLeagueName = (e) => {
        setLeagueName(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const league_name = leagueName;

        const errors = await dispatch(editLeagueBase(leagueId, league_name));

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
        <form className='edit-league-name-container' onSubmit={handleSubmit}>
            <ErrorModal hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
            <label className='edit-league-name'>League Name</label>
            <input
                value={leagueName}
                onChange={updateLeagueName}
                placeholder='League Name (Required)'
                maxLength='30' />
            <div>
                <button className='save-btn' type='submit'>Save Changes</button>
                <button onClick={hideModal} className='cancel-btn'>Cancel Changes</button>
            </div>
        </form>
    )
}

export default LeagueEditForm;
