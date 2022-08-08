import { useState } from "react"
import { useDispatch } from "react-redux"
import { editLeagueScoring } from "../../store/league"

const LeagueScoringForm = ({ currentLeague }) => {
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

        const editedLeague = await dispatch(editLeagueScoring(payload));

        if (editedLeague) {
            console.log('success!');
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Scoring</label>
            <br />
            <label>Field Goal Made (FGM)</label>
            <input
                type='number'
                value={fieldGoalMadeWeight}
                onChange={updateFieldGoalMadeWeight}
                required
                min='-1000'
                max='1000' /><br />
            <label>Field Goal Attempted (FGA)</label>
            <input
                type='number'
                value={fieldGoalAttemptedWeight}
                onChange={updateFieldGoalAttemptedWeight}
                required
                min='-1000'
                max='1000' /><br />
            <label>Free Throw Made (FTM)</label>
            <input
                type='number'
                value={freeThrowMadeWeight}
                onChange={updateFreeThrowMadeWeight}
                required
                min='-1000'
                max='1000' /><br />
            <label>Free Throw Attempted (FTA)</label>
            <input
                type='number'
                value={freeThrowAttemptedWeight}
                onChange={updateFreeThrowAttemptedWeight}
                required
                min='-1000'
                max='1000' /><br />
            <label>Three Pointers Made (3PM)</label>
            <input
                type='number'
                value={threePointMadeWeight}
                onChange={updateThreePointMadeWeight}
                required
                min='-1000'
                max='1000' /><br />
            <label>Assists (AST)</label>
            <input
                type='number'
                value={assistsWeight}
                onChange={updateAssistsWeight}
                required
                min='-1000'
                max='1000' /><br />
            <label>Rebounds (REB)</label>
            <input
                type='number'
                value={reboundsWeight}
                onChange={updateReboundsWeight}
                required
                min='-1000'
                max='1000' /><br />
            <label>Steals (STL)</label>
            <input
                type='number'
                value={stealsWeight}
                onChange={updateStealsWeight}
                required
                min='-1000'
                max='1000' /><br />
            <label>Blocks (BLK)</label>
            <input
                type='number'
                value={blocksWeight}
                onChange={updateBlocksWeight}
                required
                min='-1000'
                max='1000' /><br />
            <label>Turnovers (TO)</label>
            <input
                type='number'
                value={turnoversWeight}
                onChange={updateTurnoversWeight}
                required
                min='-1000'
                max='1000' /><br />
            <label>Points (PTS)</label>
            <input
                type='number'
                value={pointsWeight}
                onChange={updatePointsWeight}
                required
                min='-1000'
                max='1000' /><br />

            <button type='submit'>Save Changes</button>
        </form>
    )
}

export default LeagueScoringForm;
