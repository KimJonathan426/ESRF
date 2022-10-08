import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { getSingleLeague } from "../../store/league";
import { getAllPlayers } from "../../store/player";
import AccessDenied from "../AccessDenied";
import EditPlayerStatForm from "../EditPlayerStatForm";
import InvalidLeagueId from "../InvalidLeagueId";
import Loading from "../Loading";
import './EditPlayerStatSheet.css'

const EditPlayerStatSheet = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { leagueId } = useParams();
    const leagueState = useSelector(state => state.leagues);
    const players = useSelector(state => state.players);

    const league = leagueState[leagueId];
    const playerList = Object.values(players);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const leagueResponse = await dispatch(getSingleLeague(leagueId))
            await dispatch(getAllPlayers(leagueId))

            if (leagueResponse?.players_count < 10) {
                history.push(`/leagues/${leagueResponse.id}`);
            }

            setLoading(true);
        }

        fetchData();
    }, [dispatch, leagueId])

    return (
        <>
            <div className='page-outer'>
                <div className='page-spacer'></div>
                <div className='page-container'>
                    {loading ? league ? sessionUser.id === league.owner_id ?
                        <>
                            <div className='stat-sheet-title'>Player Stat Sheets</div>
                            <div className='stat-column'>
                                <span id='player-column'>Player</span>
                                <span id='recent-news-column'>Recent News</span>
                                <span id='fgm-column'>FGM</span>
                                <span id='fga-column'>FGA</span>
                                <span id='ftm-column'>FTM</span>
                                <span id='fta-column'>FTA</span>
                                <span id='three-column'>3PM</span>
                                <span id='ast-column'>AST</span>
                                <span id='reb-column'>REB</span>
                                <span id='stl-column'>STL</span>
                                <span id='blk-column'>BLK</span>
                                <span id='to-column'>TO</span>
                                <span id='pts-column'>PTS</span>
                            </div>
                            <div className='stat-sheet'>
                                {playerList && (
                                    playerList.map(player => (
                                        <div id={player.id} key={player.id} className='white'>
                                            <EditPlayerStatForm currentPlayer={player} />
                                        </div>
                                    )))}
                            </div>
                        </>
                        :
                        <AccessDenied />
                        :
                        <InvalidLeagueId />
                        :
                        <Loading />
                    }
                </div>
            </div>
        </>
    )
}

export default EditPlayerStatSheet;
