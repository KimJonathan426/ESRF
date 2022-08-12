import { useState } from "react";
import { useDispatch } from "react-redux";
import { editLeagueBase } from "../../store/league";
import ErrorModal from "../ErrorModal";
import LeagueImageUpload from "../LeagueImageUpload";
import './LeagueEditForm.css';

const LeagueEditForm = ({ setShowModal, currentLeagueName, leagueId, leagueImage }) => {
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
        <>
            <div className='edit-league-header'>League Settings</div>
            <div className='edit-league-image-container'>
                <img src={leagueImage} />
                <LeagueImageUpload leagueId={leagueId} />
            </div>
            <form className='edit-league-container' onSubmit={handleSubmit}>
                <ErrorModal hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
                <div className='edit-league-name-container gray'>
                    <label className='edit-label'>League Name</label>
                    <div className='edit-league-name-input'>
                        <input
                            value={leagueName}
                            onChange={updateLeagueName}
                            placeholder='League Name (Required)'
                            maxLength='30' />
                    </div>
                </div>
                <div>
                    <button className='save-btn' type='submit'>Save Changes</button>
                    <button onClick={hideModal} className='cancel-btn'>Cancel Changes</button>
                </div>
            </form>
        </>
    )
}

export default LeagueEditForm;
