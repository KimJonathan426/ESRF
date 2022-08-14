import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPublicLeagues } from '../../store/league';
import './LeagueList.css';

const LeagueList = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const leagues = useSelector(state => state.leagues);
    const leagueList = Object.values(leagues);

    useEffect(() => {
        dispatch(getPublicLeagues(sessionUser.id));
    }, [dispatch, sessionUser.id])

    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='page-container'>
                <div className='public-title-container'>
                    <div className='public-league-title'>Leagues can vary from recreational organizations, pick-up games, to any custom format you can think of!</div>
                    <div className='public-league-title'>Choose from one of 10 random leagues below and explore what the community has to offer!</div>
                </div>
                {leagueList ?
                    <div className='public-leagues-container'>
                        {leagueList.map(league => (
                            <div key={league.id} className='my-league'>
                                <Link to={`/leagues/${league.id}`}>
                                    <div className='home-league-info'>{league.league_name}</div>
                                    <img className='my-leagues-logo' src={`${league.league_image}`} alt='league-logo' />
                                </Link>
                            </div>
                        ))}
                    </div>
                    :
                    <h3>Loading...</h3>
                }
            </div>
        </div>
    )
}

export default LeagueList
