import { useState } from "react"
import { useDispatch } from "react-redux"
import { editLeagueScoring } from "../../store/league"
import ErrorModal from "../ErrorModal";
import './LeagueScoringForm.css';

const LeagueScoringForm = ({ setShowModal, currentLeague }) => {
    const [fieldGoalMadeWeight, setFieldGoalMadeWeight] = useState(currentLeague.field_goal_made_weight);
    const [fieldGoalAttemptedWeight, setFieldGoalAttemptedWeight] = useState(currentLeague.field_goal_attempted_weight);
    const [freeThrowMadeWeight, setFreeThrowMadeWeight] = useState(currentLeague.free_throw_made_weight);
    const [freeThrowAttemptedWeight, setFreeThrowAttemptedWeight] = useState(currentLeague.free_throw_attempted_weight);
    const [threePointMadeWeight, setThreePointMadeWeight] = useState(currentLeague.three_point_made_weight);
    const [assistsWeight, setAssistsWeight] = useState(currentLeague.assists_weight);
    const [reboundsWeight, setReboundsWeight] = useState(currentLeague.rebounds_weight);
    const [stealsWeight, setStealsWeight] = useState(currentLeague.steals_weight);
    const [blocksWeight, setBlocksWeight] = useState(currentLeague.blocks_weight);
    const [turnoversWeight, setTurnoversWeight] = useState(currentLeague.turnovers_weight);
    const [pointsWeight, setPointsWeight] = useState(currentLeague.points_weight);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const dispatch = useDispatch();

    const updateFieldGoalMadeWeight = (e) => {
        setFieldGoalMadeWeight(e.target.value);
    }
    const updateFieldGoalAttemptedWeight = (e) => {
        setFieldGoalAttemptedWeight(e.target.value);
    }
    const updateFreeThrowMadeWeight = (e) => {
        setFreeThrowMadeWeight(e.target.value);
    }
    const updateFreeThrowAttemptedWeight = (e) => {
        setFreeThrowAttemptedWeight(e.target.value);
    }
    const updateThreePointMadeWeight = (e) => {
        setThreePointMadeWeight(e.target.value);
    }
    const updateAssistsWeight = (e) => {
        setAssistsWeight(e.target.value);
    }
    const updateReboundsWeight = (e) => {
        setReboundsWeight(e.target.value);
    }
    const updateStealsWeight = (e) => {
        setStealsWeight(e.target.value);
    }
    const updateBlocksWeight = (e) => {
        setBlocksWeight(e.target.value);
    }
    const updateTurnoversWeight = (e) => {
        setTurnoversWeight(e.target.value);
    }
    const updatePointsWeight = (e) => {
        setPointsWeight(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const leagueId = currentLeague.id;
        const field_goal_made_weight = fieldGoalMadeWeight;
        const field_goal_attempted_weight = fieldGoalAttemptedWeight;
        const free_throw_made_weight = freeThrowMadeWeight;
        const free_throw_attempted_weight = freeThrowAttemptedWeight;
        const three_point_made_weight = threePointMadeWeight;
        const assists_weight = assistsWeight;
        const rebounds_weight = reboundsWeight;
        const steals_weight = stealsWeight;
        const blocks_weight = blocksWeight;
        const turnovers_weight = turnoversWeight;
        const points_weight = pointsWeight;

        const payload = {
            leagueId,
            field_goal_made_weight,
            field_goal_attempted_weight,
            free_throw_made_weight,
            free_throw_attempted_weight,
            three_point_made_weight,
            assists_weight,
            rebounds_weight,
            steals_weight,
            blocks_weight,
            turnovers_weight,
            points_weight
        }

        const errors = await dispatch(editLeagueScoring(payload));

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
        <form className='edit-scoring-container' onSubmit={handleSubmit}>
            <div className='edit-scoring-header'>Scoring</div>
            <ErrorModal hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
            <div className='edit-scoring-fields'>
                <div className='scoring-row gray'>
                    <div className='edit-label scoring-label'>
                        <label>Field Goal Made (FGM)</label>
                    </div>
                    <div className='edit-scoring-input'>
                        <input
                            type='number'
                            value={fieldGoalMadeWeight}
                            onChange={updateFieldGoalMadeWeight} />
                    </div>
                </div>
                <div className='scoring-row'>
                    <div className='edit-label scoring-label'>
                        <label>Field Goal Attempted (FGA)</label>
                    </div>
                    <div className='edit-scoring-input'>
                        <input
                            type='number'
                            value={fieldGoalAttemptedWeight}
                            onChange={updateFieldGoalAttemptedWeight} />
                    </div>
                </div>
                <div className='scoring-row gray'>
                    <div className='edit-label scoring-label'>
                        <label>Free Throw Made (FTM)</label>
                    </div>
                    <div className='edit-scoring-input'>
                        <input
                            type='number'
                            value={freeThrowMadeWeight}
                            onChange={updateFreeThrowMadeWeight} />
                    </div>
                </div>
                <div className='scoring-row'>
                    <div className='edit-label scoring-label'>
                        <label>Free Throw Attempted (FTA)</label>
                    </div>
                    <div className='edit-scoring-input'>
                        <input
                            type='number'
                            value={freeThrowAttemptedWeight}
                            onChange={updateFreeThrowAttemptedWeight} />
                    </div>
                </div>
                <div className='scoring-row gray'>
                    <div className='edit-label scoring-label'>
                        <label>Three Pointers Made (3PM)</label>
                    </div>
                    <div className='edit-scoring-input'>
                        <input
                            type='number'
                            value={threePointMadeWeight}
                            onChange={updateThreePointMadeWeight} />
                    </div>
                </div>
                <div className='scoring-row'>
                    <div className='edit-label scoring-label'>
                        <label>Assists (AST)</label>
                    </div>
                    <div className='edit-scoring-input'>
                        <input
                            type='number'
                            value={assistsWeight}
                            onChange={updateAssistsWeight} />
                    </div>
                </div>
                <div className='scoring-row gray'>
                    <div className='edit-label scoring-label'>
                        <label>Rebounds (REB)</label>
                    </div>
                    <div className='edit-scoring-input'>
                        <input
                            type='number'
                            value={reboundsWeight}
                            onChange={updateReboundsWeight} />
                    </div>
                </div>
                <div className='scoring-row'>
                    <div className='edit-label scoring-label'>
                        <label>Steals (STL)</label>
                    </div>
                    <div className='edit-scoring-input'>
                        <input
                            type='number'
                            value={stealsWeight}
                            onChange={updateStealsWeight} />
                    </div>
                </div>
                <div className='scoring-row gray'>
                    <div className='edit-label scoring-label'>
                        <label>Blocks (BLK)</label>
                    </div>
                    <div className='edit-scoring-input'>
                        <input
                            type='number'
                            value={blocksWeight}
                            onChange={updateBlocksWeight} />
                    </div>
                </div>
                <div className='scoring-row'>
                    <div className='edit-label scoring-label'>
                        <label>Turnovers (TO)</label>
                    </div>
                    <div className='edit-scoring-input'>
                        <input
                            type='number'
                            value={turnoversWeight}
                            onChange={updateTurnoversWeight} />
                    </div>
                </div>
                <div className='edit-scoring-pts scoring-row gray'>
                    <div className='edit-label scoring-label'>
                        <label>Points (PTS)</label>
                    </div>
                    <div className='edit-scoring-input'>
                        <input
                            type='number'
                            value={pointsWeight}
                            onChange={updatePointsWeight} />
                    </div>
                </div>
            </div>
            <div className='edit-scoring-btns'>
                <button className='save-btn' type='submit'>Save Changes</button>
                <button className='cancel-btn' onClick={hideModal}>Cancel Changes</button>
            </div>
        </form>
    )
}

export default LeagueScoringForm;
