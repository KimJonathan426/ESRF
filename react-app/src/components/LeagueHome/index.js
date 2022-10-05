import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSingleLeague, editLeagueStatus } from '../../store/league';
import { getAllTeams } from '../../store/team';
import settingsIcon from '../../images/settings-icon.png';
import leagueLock from '../../images/locked.png';
import ScheduleStartModal from '../LeagueStartFormModal/ScheduleStartModal';
import LeagueNote from '../LeagueNote';
import JoinLeagueButton from '../JoinLeagueButton';
import './LeagueHome.css';

const LeagueHome = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const { leagueId } = useParams();
    const leagueState = useSelector(state => state.leagues);
    const teamState = useSelector(state => state.teams);
    const league = leagueState[leagueId];
    let userTeam;

    for (let team of Object.values(teamState)) {
        if (team.team_owner_id === sessionUser.id) {
            userTeam = team;
            break
        }
    }

    useEffect(() => {
        dispatch(getSingleLeague(leagueId));
        dispatch(getAllTeams(leagueId));
    }, [dispatch, leagueId])

    useEffect(() => {
        if (league?.start_standard && league?.is_active === false) {

            const startDate = new Date(`${league.start_standard}`).getTime();

            const countdown = setInterval(() => {
                const today = new Date().getTime();
                const difference = startDate - today;

                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                document.getElementById('league-countdown').innerHTML = 'League begins in... ' + days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';

                if (difference <= 0) {
                    dispatch(editLeagueStatus(leagueId));
                    document.getElementById('league-countdown').innerHTML = 'League has officially started!';
                    clearInterval(countdown);
                }
            }, 1000);

            return () => {
                if (countdown) {
                    clearInterval(countdown);
                }
            }
        }

    }, [dispatch, leagueId, league?.start_standard, league?.is_active])


    return (
        league ? league.players_count >= 10 ?
            <div className='page-outer'>
                <div className='page-spacer'></div>
                <div className='page-container'>
                    <div className='league-home-container'>
                        <div className='league-home-image-box'>
                            <img className='league-home-image' src={`${league.league_image}`} alt='league logo'/>
                        </div>
                        <div className='league-home-main-container'>
                            <div className='league-home-side'>
                                <section className='team-card'>
                                    {userTeam ?
                                        <>
                                            <header className='card-header'>
                                                <h3 className='card-header-title'>My Team</h3>
                                                <Link to={`/leagues/${leagueId}/teams/${userTeam.team_number}/settings`}>
                                                    <img src={settingsIcon} alt='settings icon' className='settings-icon' />
                                                </Link>
                                            </header>
                                            <div className='card-content'>
                                                <div className='card-team-info'>
                                                    <div className='card-team-logo'>
                                                        <div className='card-team-logo-image'>
                                                            <img src={userTeam.team_image} alt='team logo' />
                                                        </div>
                                                    </div>
                                                    <span className='card-team-name'>
                                                        {userTeam.team_location + ' ' + userTeam.team_name}
                                                    </span>
                                                    <div className='card-owner-name'>
                                                        {sessionUser.username}
                                                    </div>
                                                </div>
                                                <div className='view-roster'>
                                                    View Roster Link
                                                </div>
                                            </div>
                                        </>
                                        :
                                        league.teams.length < league.team_limit && !league.is_active ?
                                            <>
                                                <header className='card-header'>
                                                    <h3 className='card-header-title'>Create a Team</h3>
                                                </header>
                                                <div className='card-content'>
                                                    <div className='card-team-info'>
                                                        <span className='card-interest'>
                                                            Interested in joining this league?
                                                        </span>
                                                        <div className='join-league'>
                                                            <JoinLeagueButton sessionUser={sessionUser} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <header className='card-header'>
                                                    <h3 className='card-header-title'>League Alert</h3>
                                                </header>
                                                <div className='card-content'>
                                                    <div className='card-team-logo'>
                                                        <div className='card-league-lock'>
                                                            <img src={leagueLock} alt='league locked' />
                                                        </div>
                                                    </div>
                                                    <div className='card-team-info'>
                                                        <span className='card-team-name'>
                                                            League locked
                                                        </span>
                                                        <div className='card-league-alert'>
                                                            *No additional league managers may join this league as it is
                                                            at full capacity or has already started.*
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                    }
                                </section>
                            </div>
                            <div className='league-home-main'>
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
                                                {league?.owner_id === sessionUser.id && (
                                                    <div className='league-link-3'>
                                                        <Link to={`/leagues/${leagueId}/players/edit/stats`}>Player Stat Sheet</Link>
                                                    </div>
                                                )}
                                                {league?.owner_id === sessionUser.id && (
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
                                            {league?.owner_id === sessionUser.id && (
                                                <ScheduleStartModal leagueId={leagueId} leagueDate={league.start_date} leagueTime={league.start_time} />
                                            )}
                                        </div>
                                    )
                                        :
                                        !league.is_active ? (
                                            <>
                                                <div className='league-home-inner-box-schedule'>
                                                    <div id='league-countdown'>League initializing...</div>
                                                    <div className='league-start-info-title'>Note that once the league starts:</div>
                                                    <div className='league-start-info'>League owner will be unable to reschedule the league</div>
                                                    <div className='league-start-info'>League will be locked and no additional league managers may join/create a team.</div>
                                                    <div className='league-start-info'>League managers will be unable to change their roster.</div>
                                                </div>
                                            </>
                                        )
                                            :
                                            <>
                                                <div className='league-home-inner-box-schedule'>
                                                    <div>League is active</div>
                                                </div>
                                            </>


                                    }
                                </div>
                                <LeagueNote league={league} sessionUser={sessionUser} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            league?.owner_id === sessionUser.id ?
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
