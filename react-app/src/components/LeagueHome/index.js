import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSingleLeague } from '../../store/league';
import ScheduleStartModal from '../LeagueStartFormModal/ScheduleStartModal';
import './LeagueHome.css';

const LeagueHome = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const { leagueId } = useParams();
    const leagueState = useSelector(state => state.leagues)
    const league = leagueState[leagueId]

    useEffect(() => {
        dispatch(getSingleLeague(leagueId));
    }, [dispatch, leagueId])


    return (
        league ? league.players_length >= 10 ?
            <div className='page-outer'>
                <div className='page-spacer'></div>
                <div className='page-container'>
                    <div className='league-home-main-container'>
                        <div className='league-links-box'>
                        </div>
                        <div className='league-home-image-box'>
                            <img className='league-home-image' src={`${league.league_image}`}></img>
                        </div>
                        <div className='league-home-main-box'>
                            <div className='league-home-inner-box-main'>
                                <div className='league-home-inner-box-1'>
                                    <div className='main-box-top-accent'></div>
                                    <span>{league.league_name}</span>
                                    <div className='league-navigation-links'>
                                        <div className='league-link-1'>
                                            <Link to={`/leagues/${leagueId}/settings`}>Settings</Link>
                                        </div>
                                        <div className='league-link-2'>
                                            <Link to={`/leagues/${leagueId}/players`}>Player List</Link>
                                        </div>
                                        {league.owner_id === sessionUser.id && (
                                            <div className='league-link-3'>
                                                <Link to={`/leagues/${leagueId}/players/edit/stats`}>Player Stat Sheet</Link>
                                            </div>
                                        )}
                                        {league.owner_id === sessionUser.id && (
                                            <div className='league-link-4'>
                                                <Link to={`/leagues/${leagueId}/players/new`}>Create a Player</Link>
                                            </div>
                                        )}
                                    </div>
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
                                        This league's game has not been scheduled.
                                    </div>
                                    {league.owner_id === sessionUser.id && (
                                        <ScheduleStartModal leagueId={leagueId} leagueDate={league.start_date} leagueTime={league.start_time} />
                                    )}
                                </div>
                            )
                                :
                                <div className='league-home-inner-box-schedule'></div>
                            }
                        </div>
                        <div className='league-home-manager-box'>
                            {/* <div className='manager-note-header'>League Manager's Note</div> */}
                            <div className='manager-note-header'>League Note</div>
                            <div className='manager-note-content'>
                                {/* <div className='manager-note-title'>{league.league_note_title}</div>
                                <div className='manager-note-text'>{league.league_note}</div> */}
                                <div className='manager-note-title'>{league.league_note_title}</div>
                                <div className='manager-note-text'>Welcome to your ESRF basketball league.
                                    Your League Manager will be in charge of all internal operations,
                                    so make sure to reach out to him/her if you have any questions!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            league.owner_id === sessionUser.id ?
                <div className='page-outer required-player-background'>
                    <div className='page-spacer'></div>
                    <div className='page-container'>
                        <h2>You didn't finish setting up your league...</h2>
                        <h4>Click <Link to={`/leagues/${leagueId}/required-players/new`}>here</Link> to go back to the league creation page</h4>
                    </div>
                </div>
                :
                <div className='page-outer required-player-background'>
                    <div className='page-spacer'></div>
                    <div className='page-container'>
                        <h2>The league owner is still setting up this league...</h2>
                        <h4>Come back later to see what this league has in store for you!</h4>
                        <h4>Click <Link to='/'>here</Link> to go to the home page.</h4>
                    </div>
                </div>
            :
            <h3> Loading... </h3>
    )
}

export default LeagueHome
