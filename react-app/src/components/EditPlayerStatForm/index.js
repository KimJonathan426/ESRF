import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPlayerStats } from "../../store/player";
import $ from 'jquery';
import ErrorModal from "../ErrorModal";
import './EditPlayerStatForm.css';

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
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

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
        console.log('e', e)
        console.log('e.target', e.target)
        console.log('e.target.id', e.target.id)

        const playerId = currentPlayer.id;
        const recent_news = recentNews;
        const field_goal_made = fieldGoalMade;
        const field_goal_attempted = fieldGoalAttempted;
        const free_throw_made = freeThrowMade;
        const free_throw_attempted = freeThrowAttempted;
        const three_point_made = threePointMade;

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

        const errors = await dispatch(editPlayerStats(payload));

        if (errors) {
            setValidationErrors(errors);
            setShowErrorModal(true);
        }
        else {
            $(`#${currentPlayer.id}`).fadeOut(100).fadeIn(600);
        }
    };

    $(function () {
        let focusedElement;
        $(document).on('focus', 'input', function () {
            focusedElement = this.select();
        });
    });


    return (
        <>
            <form className='stat-form-container' onSubmit={handleSubmit}>
                <ErrorModal hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
                <div className='player-stat-info'>
                    <div>
                        <img className='player-stat-image' src={currentPlayer.player_image} alt='player' />
                    </div>
                    <div className='player-stat-name'>
                        <div>
                            {currentPlayer.player_name}
                        </div>
                    </div>
                </div>
                <div className='recent-news-container'>
                    <textarea
                        id='recent-news'
                        value={recentNews}
                        onChange={updateRecentNews}

                        placeholder='How did the player perform?' />
                </div>

                <input
                    id='fgm'
                    type='number'
                    value={fieldGoalMade}
                    onChange={updateFieldGoalMade} />

                <input
                    id='fga'
                    type='number'
                    value={fieldGoalAttempted}
                    onChange={updateFieldGoalAttempted} />

                <input
                    id='ftm'
                    type='number'
                    value={freeThrowMade}
                    onChange={updateFreeThrowMade} />

                <input
                    id='fta'
                    type='number'
                    value={freeThrowAttempted}
                    onChange={updateFreeThrowAttempted} />

                <input
                    id='three-point'
                    type='number'
                    value={threePointMade}
                    onChange={updateThreePointMade} />

                <input
                    id='ast'
                    type='number'
                    value={assists}
                    onChange={updateAssists} />

                <input
                    id='reb'
                    type='number'
                    value={rebounds}
                    onChange={updateRebounds} />

                <input
                    id='stl'
                    type='number'
                    value={steals}
                    onChange={updateSteals} />

                <input
                    id='blk'
                    type='number'
                    value={blocks}
                    onChange={updateBlocks} />

                <input
                    id='to'
                    type='number'
                    value={turnovers}
                    onChange={updateTurnovers} />

                <input
                    id='pts'
                    type='number'
                    value={points}
                    onChange={updatePoints} />

                <button className='save-btn' type='submit'>Save</button>
            </form>
        </>
    )
}

export default EditPlayerStatForm;
