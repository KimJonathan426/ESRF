import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPlayerStats } from "../../store/league";

const EditPlayerStatForm = ({ currentPlayer }) => {
    const [recentNews, setRecentNews] = useState(currentPlayer.recent_news);
    const [fieldGoalMade, setFieldGoalMade] = useState(currentPlayer.field_goal_made);
    const [fieldGoalAttempted, setFieldGoalAttempted] = useState(currentPlayer.field_goal_attempted);
    const [freeThrowMade, setFreeThrowMade] = useState(currentPlayer.free_throw_made);
    const [freeThrowAttempted, setFreeThrowAttempted] = useState(currentPlayer.free_throw_attempted);
    const [threePointMade, setThreePointMade] = useState(currentPlayer.three_point_made);
    const [assists, setAssists] = useState(currentPlayer.assists);
    const [rebounds, setRebounds] = useState(currentPlayer.rebounds);
    const [steals, setSteals] = useState(currentPlayer.steals);
    const [blocks, setBlocks] = useState(currentPlayer.blocks);
    const [turnovers, setTurnovers] = useState(currentPlayer.turnovers);
    const [points, setPoints] = useState(currentPlayer.points);

    const dispatch = useDispatch();

    const updateRecentNews = (e) => {
        setRecentNews(e.target.value);
    }
    const updateFieldGoalMade = (e) => {
        setFieldGoalMade(e.target.value);
    }
    const updateFieldGoalAttempted = (e) => {
        setFieldGoalAttempted(e.target.value);
    }
    const updateFreeThrowMade = (e) => {
        setFreeThrowMade(e.target.value);
    }
    const updateFreeThrowAttempted = (e) => {
        setFreeThrowAttempted(e.target.value);
    }
    const updateThreePointMade = (e) => {
        setThreePointMade(e.target.value);
    }
    const updateAssists = (e) => {
        setAssists(e.target.value);
    }
    const updateRebounds = (e) => {
        setRebounds(e.target.value);
    }
    const updateSteals = (e) => {
        setSteals(e.target.value);
    }
    const updateBlocks = (e) => {
        setBlocks(e.target.value);
    }
    const updateTurnovers = (e) => {
        setTurnovers(e.target.value);
    }
    const updatePoints = (e) => {
        setPoints(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const playerId = currentPlayer.id;
        const recent_news = recentNews;
        const field_goal_made = fieldGoalMade;
        const field_goal_attempted = fieldGoalAttempted;
        const free_throw_made = freeThrowMade;
        const free_throw_attempted = freeThrowAttempted;
        const three_point_made = threePointMade;
        const assists = assists;
        const rebounds = rebounds;
        const steals = steals;
        const blocks = blocks;
        const turnovers = turnovers;
        const points = points;

        const payload = {
            playerId,
            recent_news,
            field_goal_made,
            field_goal_attempted,
            free_throw_made,
            free_throw_attempted,
            three_point_made,
            assists,
            rebounds,
            steals,
            blocks,
            turnovers,
            points
        }

        const editedPlayer = await dispatch(editPlayerStats(payload));

        if (editedPlayer) {
            console.log('success!');
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Recent News</label>
            <textarea
                value={recentNews}
                onChange={updateRecentNews}
                placeholder='How did the player perform?'
                maxLength='1000' />
            <label>Field Goal Made (FGM)</label>
            <input
                type='number'
                value={fieldGoalMade}
                onChange={updateFieldGoalMade}
                required
                min='-1000'
                max='1000' />
            <label>Field Goal Attempted (FGA)</label>
            <input
                type='number'
                value={fieldGoalAttempted}
                onChange={updateFieldGoalAttempted}
                required
                min='-1000'
                max='1000' />
            <label>Free Throw Made (FTM)</label>
            <input
                type='number'
                value={freeThrowMade}
                onChange={updateFreeThrowMade}
                required
                min='-1000'
                max='1000' />
            <label>Free Throw Attempted (FTA)</label>
            <input
                type='number'
                value={freeThrowAttempted}
                onChange={updateFreeThrowAttempted}
                required
                min='-1000'
                max='1000' />
            <label>Three Pointers Made (3PM)</label>
            <input
                type='number'
                value={threePointMade}
                onChange={updateThreePointMade}
                required
                min='-1000'
                max='1000' />
            <label>Assists (AST)</label>
            <input
                type='number'
                value={assists}
                onChange={updateAssists}
                required
                min='-1000'
                max='1000' />
            <label>Rebounds (REB)</label>
            <input
                type='number'
                value={rebounds}
                onChange={updateRebounds}
                required
                min='-1000'
                max='1000' />
            <label>Steals (STL)</label>
            <input
                type='number'
                value={steals}
                onChange={updateSteals}
                required
                min='-1000'
                max='1000' />
            <label>Blocks (BLK)</label>
            <input
                type='number'
                value={blocks}
                onChange={updateBlocks}
                required
                min='-1000'
                max='1000' />
            <label>Turnovers (TO)</label>
            <input
                type='number'
                value={turnovers}
                onChange={updateTurnovers}
                required
                min='-1000'
                max='1000' />
            <label>Points (PTS)</label>
            <input
                type='number'
                value={points}
                onChange={updatePoints}
                required
                min='-1000'
                max='1000' />

            <button type='submit'>Save Changes</button>
        </form>
    )
}

export default EditPlayerStatForm;
