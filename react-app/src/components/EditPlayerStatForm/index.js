import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editPlayerStats } from "../../store/player";
import { updateFantasyTotal } from "../../store/team";
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
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (recentNews !== currentPlayer.recent_news || Number(fieldGoalMade) !== currentPlayer.field_goal_made
            || Number(fieldGoalAttempted) !== currentPlayer.field_goal_attempted || Number(freeThrowMade) !== currentPlayer.free_throw_made
            || Number(freeThrowAttempted) !== currentPlayer.free_throw_attempted || Number(threePointMade) !== currentPlayer.three_point_made
            || Number(assists) !== currentPlayer.assists || Number(rebounds) !== currentPlayer.rebounds
            || Number(steals) !== currentPlayer.steals || Number(blocks) !== currentPlayer.blocks
            || Number(turnovers) !== currentPlayer.turnovers || Number(points) !== currentPlayer.points) {
            setDisabled(false);
        } else {
            setDisabled(true)
        }
    }, [recentNews, currentPlayer.recent_news, fieldGoalMade, currentPlayer.field_goal_made,
        fieldGoalAttempted, currentPlayer.field_goal_attempted, freeThrowMade, currentPlayer.free_throw_made,
        freeThrowAttempted, currentPlayer.free_throw_attempted, threePointMade, currentPlayer.three_point_made,
        assists, currentPlayer.assists, rebounds, currentPlayer.rebounds,
        steals, currentPlayer.steals, blocks, currentPlayer.blocks,
        turnovers, currentPlayer.turnovers, points, currentPlayer.points])

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
            dispatch(updateFantasyTotal(currentPlayer.league_id))
            $(`#${currentPlayer.id}`).fadeOut(100).fadeIn(600);
        }
    };

    useEffect(() => {
        $(function () {
            $(document).on('focus', 'input', function () {
                this.select();
            });
        });

        return () => {
            $(function () {
                $(document).off();
            });
        }
    }, [])


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
                        maxLength='1000'
                        placeholder='How did the player perform?' />
                </div>

                <input
                    className='select-all'
                    id='fgm'
                    type='number'
                    value={fieldGoalMade}
                    onChange={updateFieldGoalMade} />

                <input
                    className='select-all'
                    id='fga'
                    type='number'
                    value={fieldGoalAttempted}
                    onChange={updateFieldGoalAttempted} />

                <input
                    className='select-all'
                    id='ftm'
                    type='number'
                    value={freeThrowMade}
                    onChange={updateFreeThrowMade} />

                <input
                    className='select-all'
                    id='fta'
                    type='number'
                    value={freeThrowAttempted}
                    onChange={updateFreeThrowAttempted} />

                <input
                    className='select-all'
                    id='three-point'
                    type='number'
                    value={threePointMade}
                    onChange={updateThreePointMade} />

                <input
                    className='select-all'
                    id='ast'
                    type='number'
                    value={assists}
                    onChange={updateAssists} />

                <input
                    className='select-all'
                    id='reb'
                    type='number'
                    value={rebounds}
                    onChange={updateRebounds} />

                <input
                    className='select-all'
                    id='stl'
                    type='number'
                    value={steals}
                    onChange={updateSteals} />

                <input
                    className='select-all'
                    id='blk'
                    type='number'
                    value={blocks}
                    onChange={updateBlocks} />

                <input
                    className='select-all'
                    id='to'
                    type='number'
                    value={turnovers}
                    onChange={updateTurnovers} />

                <input
                    className='select-all'
                    id='pts'
                    type='number'
                    value={points}
                    onChange={updatePoints} />

                <button disabled={disabled} className={disabled ? 'disabled-btn save-stat' : 'save-btn save-stat'} type='submit'>Save</button>
            </form>
        </>
    )
}

export default EditPlayerStatForm;
