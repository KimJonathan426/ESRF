import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyLeagues } from '../../store/league';
import { getMyTeams } from '../../store/team';
import Loading from '../Loading';
import './HomePage.css';


const HomePage = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const leagueState = useSelector(state => state.leagues);
    const teamState = useSelector(state => state.teams);
    const myLeagues = Object.values(leagueState);
    const myTeams = Object.values(teamState);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getMyLeagues(sessionUser.id));
            await dispatch(getMyTeams(sessionUser.id));

            setLoading(true);
        }

        fetchData();
    }, [dispatch, sessionUser.id])


    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='home-action-background'></div>
            <div className='page-container'>
                <div className='home-action-container'>
                    <div className='home-title-container'>
                        <div className='home-logo-wrapper'>
                            <img className='home-league-logo' src='https://esrf.s3.amazonaws.com/Default-League-Logo.jpg' alt='league logo' />
                        </div>
                        <div className='home-title'>
                            Play the #1 Recreational Fantasy Game
                        </div>
                    </div>
                    <div className='home-action-boxes'>
                        <div className='action-box'>
                            <Link to='/leagues/new'>
                                <button className='home-link-btns'>Create a League</button>
                            </Link>
                            You're the league manager here. Set up a private <br /> league to play with your family and friends!
                        </div>
                        <div className='action-box join-box'>
                            <Link to='/leagues'>
                                <button className='home-link-btns'>Join a Public League</button>
                            </Link>
                            Hop into one of our public leagues and we will find people for you to play with!
                        </div>
                    </div>
                </div>
                {loading ? (
                    <>
                        <div className='my-leagues-title'>My Leagues</div>
                        <div className='my-leagues-container'>
                            {myLeagues.length > 0 ? myLeagues.map(league => (
                                <div key={league.id} className='my-league'>
                                    <Link to={`/leagues/${league.id}`}>
                                        <div className='home-league-info'>{league.league_name}</div>
                                        <img className='my-leagues-logo' src={`${league.league_image}`} alt='league-logo' />
                                    </Link>
                                </div>
                            ))
                                :
                                <div className='no-teams-leagues'>
                                    <span>
                                        Looks like you don't own any leagues...&nbsp;
                                        Your leagues will show up here when you create them.
                                    </span>
                                </div>
                            }
                        </div>
                        <div className='my-leagues-title'>My Teams</div>
                        <div className='my-leagues-container'>
                            {myTeams.length > 0 ? myTeams.map(team => (
                                <div key={team.id} className='my-league'>
                                    <Link to={`/leagues/${team.league_id}/teams/${team.team_number}`}>
                                        <div className='home-team-info-1'>
                                            <span>{team.team_name}</span>
                                            <br />
                                            <span>Fantasy Points: {team.fantasy_total}</span>
                                        </div>
                                        <img className='my-teams-logo' src={`${team.team_image}`} alt='team-logo' />
                                    </Link>
                                </div>
                            ))
                                :
                                <div className='no-teams-leagues'>
                                    <span>
                                        Looks like you don't have any teams...&nbsp;
                                        Your teams will show up here when you join different leagues.
                                    </span>
                                </div>
                            }
                        </div>
                    </>
                )
                    :
                    <Loading />
                }
            </div>
        </div>
    )
}

export default HomePage;
