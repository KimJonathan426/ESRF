import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, NavLink } from 'react-router-dom';
import { getSingleLeague } from '../../store/league';
import ScheduleStartModal from '../LeagueStartFormModal/ScheduleStartModal';
import './LeagueHome.css';

const LeagueHome = () => {
    const dispatch = useDispatch();
    const { leagueId } = useParams();
    const leagueState = useSelector(state => state.leagues)
    const league = leagueState[leagueId]

    useEffect(() => {
        dispatch(getSingleLeague(leagueId));
    }, [dispatch, leagueId])

    return (
        league ?
            <div className='page-outer'>
                <div className='page-spacer'></div>
                <div className='page-container'>
                    <div className='league-home-main-container'>
                        <div className='league-links-box'>
                            <Link to={`/leagues/${leagueId}/players/new`}>Create a Player</Link>
                            <Link to={`/leagues/${leagueId}/players/edit/stats`}>Player Stat Sheet</Link>
                            <Link to={`/leagues/${leagueId}/players`}>Player List</Link>
                        </div>
                        <div className='league-home-image-box'>
                            <img className='league-home-image' src={`${league.league_image}`}></img>
                        </div>
                        <div className='league-home-main-box'>
                            <div className='league-home-inner-box-main'>
                                <div className='league-home-inner-box-1'>
                                    <span className='faded-league-image-container'>{league.league_name}</span>
                                    <Link to={`/leagues/${leagueId}/settings`}>Settings</Link>
                                </div>
                                <div className='league-home-inner-box-2'>
                                    <div>
                                        Creator: <span>{league.owner_username}</span>
                                    </div>
                                    <div>
                                        Format: <span>League Manager</span>
                                    </div>
                                    <div>
                                        Scoring: <span>Single Game Fantasy</span>
                                    </div>
                                    <div>
                                        Team Limit: <span>{league.team_limit}</span>
                                    </div>
                                </div>
                            </div>
                            {league.start_date === 'mm/dd/yyyy' ? (
                                <div className='league-home-inner-box-schedule'>
                                    <div>
                                        Your league game has not been scheduled.
                                    </div>
                                    <ScheduleStartModal leagueId={leagueId} leagueDate={league.start_date} leagueTime={league.start_time} />
                                </div>
                            )
                                :
                                <div className='league-home-inner-box-schedule'></div>
                            }
                        </div>
                        <div className='league-home-manager-box'>
                            <div className='manager-note-header'>League Manager's Note</div>
                            <div className='manager-note-content'>
                                <div className='manager-note-title'>{league.league_note_title}</div>
                                <div className='manager-note-text'>{league.league_note}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <h3> Loading... </h3>
    )
}

export default LeagueHome
